<template>
    <div class="game-detail">
        <section-card-game-detail v-if="productDetail"
            :product_detail="productDetail"
        />
        <sticky-bar v-if="productDetail"
            :price="productDetail.unit_price"
            :discountPercent="productDetail.discount_percent"
            :currency="productDetail.currency"
            :statusBtn="productDetail.type"
        />
        <section-about-game v-if="productDetail && productRelated"
            :services_overview="serviceOverview"
            :services_spec="serviceSpec"
            :services_download="serviceDownload"
            :services_features="serviceFeature"
            :status_btn="productDetail.type"
            :is_hilight="productDetail.product.is_hilight"
            :product_related="productRelated"
        />
        <ModalAlertConnectWallet />
    </div>
</template>

<script>
import SectionCardGameDetail from "@/components/section/SectionCardGameDetail.vue";
import SectionAboutGame from "@/components/section/SectionAboutGame.vue";
import StickyBar from "@/components/common/StickyBar.vue";
import ModalAlertConnectWallet from "./modals/ModalAlertConnectWallet.vue";
import {mapActions, mapGetters} from "vuex";
import {vuexTypes} from "@/store/modules/types";
import { api } from "@/js/api/api.js";

export default {
    name: "game-detail",
    components: {
        SectionCardGameDetail,
        SectionAboutGame,
        StickyBar,
        ModalAlertConnectWallet
    },
    computed: {
        ...mapGetters({
            responseProductDetail: vuexTypes.responseProductDetail
        }),
    },
    data: () => {
        return {
            serviceOverview: {},
            serviceSpec: {},
            serviceDownload: {},
            serviceFeature: [],
            productDetail: null,
            productRelated: []
        };
    },
    async created() {
        await this.getProductRelatedById(this.$route.query.priceId)
        await this.getProductDetailById(this.$route.query.priceId)
    },
    mounted() {
        this.$root.$emit("on-click-to");

        this.$root.$on("alert-login-metamask-gamedetail", () => {
           this.openAlertMetamaskModal()
        });
    },
    methods: {
        ...mapActions({
            getProductDetailById: vuexTypes.GET_PRODUCT_DETAIL,
        }),
        openAlertMetamaskModal(){
            this.$bvModal.show("modal-login-metamask");
        },
        async getProductDetailById(product_price_id) {
            /* eslint-disable no-console */
            const result = await api.get(process.env.VUE_APP_API_URL + '/product_price/' + product_price_id)
            this.productDetail = result.data.data

            // define type sale normal
            if (typeof this.productDetail.type == 'undefined') { 
                this.productDetail.type = 1
            }

            this.serviceOverview = this.getDetailByType(1)
            this.serviceFeature = this.getDetailByType(2)
            this.serviceSpec = this.getDetailByType(3)
            this.serviceDownload = this.getDetailByType(4)
        },
        async getProductRelatedById(product_price_id) {
            /* eslint-disable no-console */
            const result = await api.get(process.env.VUE_APP_API_URL + '/product_price/' + product_price_id + '/related')
            this.productRelated = result.data.data
        },
        getDetailByType(type) {
            const list = []
            if (this.productDetail.product) {
                for (let i = 0; i < this.productDetail.product.detail.length; i++) {
                    if (this.productDetail.product.detail[i].detail_type == type) {
                        list.push(this.productDetail.product.detail[i])
                    }
                }
            }
            return list
        }
    }
  };
</script>

<style lang="scss" scoped>
@import "~@/scss/_variables.scss";

button.col-md-12.btn.btn-preorder.text-color {
    width: 517px;
    height: 52px;
    font-weight: bold;
    font-size: 18px;
    line-height: 36px;
    align-items: center;
    text-align: center;
    letter-spacing: -0.015em;

    @media (max-width: $tablet) {
        width: 100% !important;
    }
}

button.col-md-12.btn.btn-outline-secondary.text-color.game-details {
    width: 517px;
    height: 52px;

    @media (max-width: $tablet) {
        width: 100% !important;
    }
}
</style>