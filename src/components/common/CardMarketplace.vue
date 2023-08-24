<template>
    <div class="card-marketplace">
        <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-4" v-for="(value, index) in marketplaceList" :key="index">
                <div class="card-content">
                    <b-card class="mb-4 card-collection" style="padding-top: 0 !important">
                        <div class="bg-img" :style="'background-image: url('+getImgUrl(value.product)+')'">
                            <!-- <b-card-img class="img-fluid bg-image-new" :src="getImgUrl(value.product)" alt="Image"> </b-card-img> -->

                            <div class="action-wishlist" @click="addWishList(value.product.id, value.id)">
                                <img src="~@/assets/img/ic-heart-full.svg" v-if="isWishList(value.product.id)" />
                                <img src="~@/assets/img/ic-heart.svg" v-else />
                            </div>
                        </div>
                        <b-card-text style="margin-top: 1rem;">
                            <p class="marketplace__title">{{ value.product.name }}</p>
                            <p class="marketplace__sub-title">{{ value.product.category.name }}</p>

                            <b-button v-if="value.product.status === 1"
                              id="buy-btn"
                              variant="primary"
                              class="button-hilight btn-preorder profile"
                              block
                              @click="goToProductDetail(value.product.id)"
                            >
                                {{ $t('common.buy-btn') }}
                            </b-button>
                            <b-button v-else
                              id="preorder-btn"
                              variant="primary"
                              class="button-hilight btn-preorder profile"
                              block
                              @click="goToProductDetail(value.id)"
                            >
                                {{ $t('common.preorder-btn') }}
                            </b-button>

                            <div class="row" style="margin-top: 1rem;">
                                <div class="col-4 text-price card-price">
                                    {{ $t("card-profile.price") }}
                                </div>
                                <div class="col-8 text-price text-right price-bot">
                                    <p class="text-card-profile" style="display: inline-flex; margin-bottom:0;">
                                        {{ value.unit_price }}&nbsp;
                                        <img :src="getGameDetailImgUrl(value.currency.image_url)" class="currency-price" style="width: 1.58vw;height: auto;vertical-align: bottom;"/>
                                    </p>
                                </div>
                            </div>
                        </b-card-text>
                    </b-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {vuexTypes} from "@/store/modules/types";
import moment from "moment";

export default {
    name: 'card-marketplace',
    props: {
        marketplaceList: { type: Array, required: true },
    },
    computed: {
        ...mapGetters({
            myWishList: vuexTypes.myWishList,
            metamaskAccount: vuexTypes.metamaskAccount
        }),
    },
    methods: {
        ...mapActions({
            getProductDetailById: vuexTypes.GET_PRODUCT_DETAIL,
            ncmMyWishList: vuexTypes.NCM_API_PRODUCT_WISHLIST,
            disconnect: vuexTypes.DISCONNECT_METAMASK,
        }),
        getImgUrl(value) {
            let image_url = '';
            value.media.forEach(media => {
                if (image_url == '' && media.media_type.name == 'image') {
                    image_url = media.media_url;
                }
            });
            
            return process.env.VUE_APP_URL_MEDIA + image_url;
        },
        getGameDetailImgUrl(image_url) {
            return process.env.VUE_APP_URL_MEDIA + image_url;
        },
        goToProductDetail(productPriceId) {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            if (this.$route.path !== '/product') this.$router.push({ path: '/product', query: { priceId: productPriceId } })
        },
        async addWishList(productId, productPriceId) {
            if (this.metamaskAccount === "" || this.metamaskAccount === null || Number(localStorage.getItem('authorization_expire')) < moment().unix()) {
                await this.disconnect();
                this.$root.$emit("alert-login-metamask-home");
                this.$root.$emit("alert-login-metamask-gamedetail");
            } else {
                await this.ncmMyWishList({
                    'productId': productId,
                    'productPriceId': productPriceId,
                    'remove': this.isWishList(productId)
                })
            }
        },
        isWishList(productId) {
            if(this.myWishList && this.myWishList.find(element => element == productId)) {
                return true;
            }
            return false;
        },
    }
}
</script>

<style lang="scss" scoped>
@import "~@/scss/card-profile";
@import '~@/scss/_variables.scss';

.bg-image-new {
    padding: 6% 6%;
}

.marketplace__title {
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    /* identical to box height, or 133% */
    /* Dark1 */
    color: $app-font-color;
    margin-bottom: 6px;
}

.marketplace__sub-title {
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    /* or 133% */
    /* Dark2 */
    color: $dark-2;
}

.action-wishlist {
    cursor: pointer;
    position: absolute;
    top: 30px;
    right: 30px;
    z-index: 0;
}

button {
    opacity: 0;
}

.card-content:hover button {
    opacity: 1;
    transition: 0.5s;
}

</style>