<template>
    <div class="game-detail">
        <div class="section-about-game">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <b-tabs class="tab-custom" content-class="mt-3" align="left">
                            <!-- overview tab -->
                            <b-tab
                                :title="$t('game-detail.tab.overview')"
                                active
                                @click="selectTabAboutGame"
                            >
                                <div class="row" v-if="services_overview && services_overview.length > 0">
                                    <div class="col-lg-5 col-md-12 col-sm-12 overview-tab">
                                        <p class="section-about-game__limited-edition" :hidden="!is_hilight">LIMITED EDITION</p>
                                        <p class="section-about-game__title">{{ getOverviewTitle() }}</p>
                                        <!-- <p class="section-about-game__info">{{ services_overview.info }}</p> -->
                                        <div class="clearfix"/>
                                        <Vcode
                                            :sliderSize="54"
                                            :canvasWidth="298"
                                            :canvasHeight="184"
                                            :show="isShow"
                                            :successText="success"
                                            :failText="fail"
                                            :sliderText="text"
                                            :titleText="'Security Verification'"
                                            @success="onSuccess"
                                            @close="onClose"
                                        />
                                        <button
                                            type="button"
                                            class="btn btn-preorder btn-border text-color btn-margin-r"
                                            style="width: 245px; height: 52px"
                                            @click="submit"
                                        >
                                            {{ status_btn === 1 ? $t("common.buy-btn") : $t("common.preorder-btn") }}
                                        </button>

                                        <button
                                            type="button"
                                            class="btn btn-outline-secondary btn-border text-color"
                                            style="width: 245px; height: 52px"
                                            @click="addWishList(productId,productPriceId)"
                                            data-mdb-ripple-color="dark"
                                        >
                                            <i class="fas fa-heart" v-if="isWishList(productId)" style="color: #F7CA38"></i>
                                            <i class="far fa-heart" v-else ></i>
                                            &nbsp;&nbsp;{{
                                                $t("common.wishlist-btn")
                                            }}
                                        </button>
                                    </div>
                                    <div class="col-lg-7 col-md-12 col-sm-12" style="text-align: center;">
                                        <img :src="getOverviewImage()" class="img-fluid overview-tab__image" />
                                    </div>
                                </div>
                            </b-tab>

                            <!-- specifications tab -->
                            <b-tab
                                :title="$t('game-detail.tab.specifications')"
                                @click="selectTabSaleDetail"
                            >
                                <div class="row" v-if="services_spec && services_spec.length > 0">
                                    <div class="col-lg-6 col-md-12 col-sm-12">
                                        <div class="card section-about-game__sale-details">
                                            <div class="card-body">
                                                <div class="row requirement__body-3" v-for="(value, index) in services_spec" :key="index">
                                                    <div class="col-md-6 requirement__body-4">
                                                        {{ value.key_name }}
                                                    </div>
                                                    <div class="col-md-6 text-align-right requirement__body-dark1">
                                                        {{ value.key_value }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card section-about-game__note desktop" v-for="(value, index) in services_spec.note" :key="index">
                                            <div class="card-body">
                                                <div class="row justify-content-center">
                                                    <div class="col-md-6">
                                                        <p class="note__text">
                                                            <b-icon
                                                                icon="exclamation-circle"
                                                                style="
                                                                width: 18px;
                                                                height: 18px;
                                                            "
                                                            ></b-icon>
                                                            {{ $t("game-detail.tab-sale-detail.note") }}
                                                        </p>
                                                    </div>
                                                    <div class="col-md-6 note__text text-align-right">
                                                        <p class="text-note">{{ value }}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-lg-6 col-md-12 col-sm-12">
                                        <div class="card section-about-game__sale-details">
                                            <div class="card-body">
                                                <div class="row requirement__body-3" v-for="(value, index) in services_spec.contract" :key="index">
                                                    <div class="col-md-6 requirement__body-4">
                                                        {{ changeKeyName(index) }}
                                                    </div>

                                                    <div class="col-md-6 text-align-right requirement__body-dark1" v-if="index === 'contract_address'">
                                                        <a class="text-primary__contract-address" :href="contractAddresURL + value" target="_blank">
                                                            {{ contractAddress }}
                                                        </a>
                                                    </div>
                                                    <div class="col-md-6 text-align-right requirement__body-dark1" v-else>
                                                        {{ value }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card section-about-game__note mobile" v-for="(value, index) in services_spec.note" :key="index">
                                            <div class="card-body">
                                                <div class="row justify-content-center">
                                                    <div class="col-md-6">
                                                        <p class="note__text">
                                                            <b-icon
                                                                icon="exclamation-circle"
                                                                style="
                                                                width: 18px;
                                                                height: 18px;
                                                            "
                                                            ></b-icon>
                                                            {{ $t("game-detail.tab-sale-detail.note") }}
                                                        </p>
                                                    </div>
                                                    <div class="col-md-6 note__text text-align-right">
                                                        <p class="text-note">{{ value }}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </b-tab>

                            <!-- download tab -->
                            <b-tab :title="$t('game-detail.tab.download')" @click="selectTabDownload" :disabled="services_download.doc_name === null">
                                <div class="row card__contents" v-if="services_download && services_download.length > 0">
                                    <div class="col-12 card__download">
                                        <div class="row card__section_download">
                                            <div class="col-6 download__title" style="word-break: break-word;">
                                                {{ $t( "game-detail.tab-download.user-manual") }}
                                            </div>
                                            <div class="col-6 text-right">
                                                <span class="download__detail">
                                                    <a style="color: #F7CA38 !important;" :href="getDownloadPath()" target="_blank">
                                                        {{ getDownloadDocName() }}
                                                    </a>
                                                </span>
                                                &nbsp;<i class="fas fa-download" style="color: #F7CA38"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </b-tab>

                        </b-tabs>
                    </div>
                </div>
            </div>

        </div>
        <section-key-feature v-if="services_features && services_features.length > 0" :services="services_features"/>
        <section-related-product v-if="product_related" :services="product_related"/>
    </div>
</template>

<script>
import Vcode from "@/utils/PuzzleVcode/main.js";
import SectionKeyFeature from "@/components/section/SectionKeyFeature.vue";
import SectionRelatedProduct from "@/components/section/SectionRelatedProduct.vue";

import ServiceGameDetail from "@/data/ServiceGameDetail.json";
import {mapActions, mapGetters} from "vuex";
import {vuexTypes} from "@/store/modules/types";
import moment from "moment";

export default {
    name: "section-about-game",
    props: {
        services_overview: {type: Array, required: false}, // type 1
        services_spec: {type: Array, required: false}, // type 2
        services_download: {type: Array, required: false}, // type 3
        services_features: {type: Array, required: false}, // type 4
        is_hilight: {type: Boolean, required: true},
        status_btn: {type: Number, required: true},
        product_related: {type: Array, required: true}
    },
    data: () => ({
        // ServiceKeyFeature: ServiceGameDetail.feature_list,
        isShow: false,
        success: "Verified",
        fail: "Verified fail",
        text: "Slide to complete the puzzle",
        isFav: false,
        isShowtest: true,
        productId: ServiceGameDetail.card_presale.productId,
        productPriceId: ServiceGameDetail.card_presale.productPriceId,
        contractAddress: '',
        // contractAddresLink: process.env.VUE_APP_CONTRACT_ADDRESS_ERC721,
        contractAddresURL: process.env.VUE_APP_CONTRACT_ADDRESS_URL
    }),
    components: {
        Vcode,
        SectionKeyFeature,
        SectionRelatedProduct,
    },
    created() {
        // this.contractAddress = this.services_spec.contract.contract_address.substring(0, 9) + '...' + this.services_spec.contract.contract_address.slice(-10);
        
        // SORT ORDER
        this.services_spec.sort((a,b) => (a.detail_order > b.detail_order) ? 1 : ((b.detail_order > a.detail_order) ? -1 : 0))
    },
    computed: {
        ...mapGetters({
            myWishList: vuexTypes.myWishList,
            metamaskAccount: vuexTypes.metamaskAccount
        }),
    },
    methods: {
        ...mapActions({
            ncmMyWishList: vuexTypes.NCM_API_PRODUCT_WISHLIST,
            disconnect: vuexTypes.DISCONNECT_METAMASK
        }),
        async addWishList(productId, productPriceId) {
            if (this.metamaskAccount === "" || this.metamaskAccount === null || Number(localStorage.getItem('authorization_expire')) < moment().unix()) {
                this.disconnect();
                this.$root.$emit("alert-login-metamask-gamedetail");
            } else {
                await this.ncmMyWishList({
                    'productId': productId,
                    'productPriceId': productPriceId,
                    'remove': false
                })
            }
        },
        isWishList(productId) {
            if(this.myWishList && this.myWishList.find(element => element == productId)) {
                return true;
            }
            return false;
        },
        submit() {
            window.scrollTo(0, 0);
            this.isShow = false;
        },
        onSuccess() {
            this.$bvModal.show("modal-checkout-presale");
            this.isShow = false;
        },
        onClose() {
            this.isShow = false;
        },
        getImgHomeUrl(name) {
            var images = require.context("@/assets/home/", false, /\.png$/);
            return images("./" + name);
        },
        async isFavourite() {
            this.isFav = !this.isFav;

            // make some call to your databse to update the value
        },
        selectTabAboutGame() {
            this.isShowtest = true;
        },
        selectTabSaleDetail() {
            this.isShowtest = false;
        },
        selectTabDownload() {
            this.isShowtest = false;
        },
        clipboard (str) {
            const el = document.createElement('textarea');
            el.addEventListener('focusin', e => e.stopPropagation());
            el.value = str;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
        },
        changeKeyName(name) {
            let str = name.replaceAll('_', ' ')
            return str.charAt(0).toUpperCase() + str.slice(1);
        },
        getOverviewTitle() {
            let title = null
            for (let i = 0; i < this.services_overview.length; i++) {
                if (this.services_overview[i].key_name == 'title' && title == null) {
                    title = this.services_overview[i].key_value
                }
            }
            return title
        },
        getOverviewImage() {
            let image_url = null
            for (let i = 0; i < this.services_overview.length; i++) {
                if (this.services_overview[i].key_name == 'image' && image_url == null) {
                    image_url = process.env.VUE_APP_URL_MEDIA + this.services_overview[i].key_value
                }
            }
            return image_url
        },
        getDownloadDocName() {
            let doc_name = null
            for (let i = 0; i < this.services_download.length; i++) {
                if (this.services_download[i].key_name == 'doc_name' && doc_name == null) {
                    doc_name = this.services_download[i].key_value
                }
            }
            return doc_name
        },
        getDownloadPath() {
            let path = null
            for (let i = 0; i < this.services_download.length; i++) {
                if (this.services_download[i].key_name == 'path' && path == null) {
                    path = this.services_download[i].key_value
                }
            }
            return path
        }
    },
};
</script>

<style lang="scss" scoped>
@import "~@/scss/_variables.scss";

.section-about-game .tabs .tab-content {
    padding: 36px 0 36px 0 !important;
}

.section-about-game .tabs .tab-content .card,
.section-about-game .tabs .tab-content .section-about-game__note:last-child {
    margin-top: 20px;
    margin-bottom: 20px;
}

.section-about-game .tabs .tab-content .section-about-game__note {
    margin-bottom: 0;
    &.desktop {
        display: block;
    }
    &.mobile {
        display: none;
    }

     @media (max-width: 480px) {
        &.desktop {
            display: none;
        }
        &.mobile {
            display: block;
        }
    }
}

@media (max-width: 576px) {
    .section-about-game .tabs .tab-content .section-about-game__sale-details .text-align-right,
    .section-about-game .tabs .section-about-game__note .text-align-right {
        text-align: left;
    }

    .section-about-game .tabs .section-about-game__note .text-align-right {
        text-align: left;
        word-break: break-word;
    }
}

.section-about-game {
    background: $app-background-color;
    padding: 6vh 6.5vh;

    @media (max-width: 576px) {
        padding: 0 !important;
        margin-bottom: 3rem;
    }
}

.section-about-game__limited-edition {
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    /* or 133% */
    display: flex;
    align-items: center;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    /* Yellowe */
    color: $app-theme-color;

    @media (max-width: 576px) {
        font-size: 18px;
    }
}

.section-about-game__title {
    // font-size: 2vw;
    font-weight: 700;
    font-size: 54px;
    line-height: 70px;
    /* or 130% */
    /* Dark1 */
    color: $app-font-color;
    word-break: break-word;
}

.section-about-game__info {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    /* or 150% */
    color: $app-font-color;
    word-break: break-word;
    margin-bottom: 3rem;
}

.section-about-game__image {
    width: 120px;
    height: 34px;
    padding: 5px 5px;
    margin-right: 15px;
}

.card.section-about-game__sale-details {
    border-radius: 16px !important;
    background-color: #F2F4F4;
    box-shadow: unset;
    border: unset;
}

.card.section-about-game__note {
    border-radius: 12px !important;
    background: $blue !important;
    border-radius: 12px;

    .card-body {
        padding: 5px 20px 5px 20px !important;
    }
}

.text-primary__contract-address {
    color: #1E87FF;
}

div.tabs.tab-custom div ul li.nav-item .nav-link {
    font-weight: 600 !important;
    font-size: 24px !important;
    letter-spacing: 3.5px;
}

.text-align-right {
    text-align: right;
}

.section-about-game__flag {
    margin-right: 5px;
}

p.puzzle-title {
    margin-top: 6px;
    margin-bottom: 14px;
}

.vue-auth-box_ {
    position: absolute !important;
    width: 346px !important;
    max-width: 346px !important;
    min-height: 422px !important;
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
    color: $app-font-color !important;
    background: $app-background-color;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px !important;
}

.vue-auth-box_ .auth-body_ {
    max-width: 298px !important;
    min-height: 184px !important;
    border-radius: 6px !important;
    margin-left: auto !important;
    margin-right: auto !important;
}

.vue-auth-box_ .auth-body_ .auth-canvas3_ {
    position: absolute !important;
    border-radius: 6px !important;
    margin-left: auto !important;
    margin-right: auto !important;
}

.vue-auth-box_ .auth-control_ {
    max-width: 300px !important;
    margin: auto !important;
}

.vue-auth-box_ .auth-control_ .range-box .range-slider .range-btn {
    position: absolute !important;
    border-radius: 40px !important;
    background: $app-theme-color !important;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15), inset 0px 2px 0px #FDD65B !important;
    width: 54px !important;
    height: 54px !important;
    top: -5px !important;
}

.vue-auth-box_ .auth-control_ .range-box .range-slider .range-btn > div {
    border: solid 1px #ffffff !important;
    border-radius: 1.5px !important;
}

.vue-auth-box_
.auth-control_
.range-box
.range-slider
.range-btn:hover
> div:first-child,
.vue-auth-box_
.auth-control_
.range-box
.range-slider
.range-btn.isDown
> div:first-child,
.vue-auth-box_
.auth-control_
.range-box
.range-slider
.range-btn:hover
> div:nth-child(2),
.vue-auth-box_
.auth-control_
.range-box
.range-slider
.range-btn.isDown
> div:nth-child(2) {
    border-right-color: $dark-1 !important;
}

.vue-auth-box_
.auth-control_
.range-box
.range-slider
.range-btn:hover
> div:nth-child(3),
.vue-auth-box_
.auth-control_
.range-box
.range-slider
.range-btn.isDown
> div:nth-child(3) {
    border-left-color: #ffffff !important;
}

.vue-auth-box_ .auth-control_ .range-box .range-slider {
    border-radius: 30px !important;
}

.vue-auth-box_ .auth-control_ .range-box {
    height: 43.41px !important;
    width: 296.98px !important;
    margin-left: auto !important;
    margin-right: auto !important;
    margin-bottom: 5px !important;
    top: 18px !important;

    background: $app-font-color !important;
    box-shadow: inset 0px 0px 3px rgba(0, 0, 0, 0.15) !important;
    border-radius: 19px;
}

.vue-auth-box_ .auth-control_ .range-box .range-text {
    font-family: Inter !important;
    font-size: 16px !important;
    font-weight: 500 !important;
    line-height: 24px;
    left: 57% !important;
    letter-spacing: -0.015em !important;
    color: #C8D3D7 !important;
}

.vue-auth-box_ .auth-body_ {
    top: 15px !important;
}

.modal-total-pay {
    background: #2b2b3e;
    border-radius: 6px;
    padding: 16px;
    width: 100%;
}

.requirement__body-3 {
    font-weight: 600;
    font-size: 16px;
    line-height: 30px;
    letter-spacing: -0.015em;
    color: #e3e3e3;
    opacity: 0.9;
}

.requirement__body-4 {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #888E97;
    opacity: 0.9;

    letter-spacing: -0.015em;
}

.note__text {
    color: #ffffff;
    font-weight: 500;
    font-size: 16px;
    line-height: 30px;
    opacity: 0.9;
    margin-bottom: 0rem;
}

.icon__information {
    color: #54AE90;
    font-weight: 700 !important;
    -webkit-text-stroke: 2px;
}

@media (max-width: 991px) {
    p.section-about-game__title {
        font-size: 4vw !important;
    }
}

@media (max-width: 576px) {
    p.section-about-game__title {
        font-size: 24px !important;
        line-height: 35px;
    }
}

p.text-note {
    font-weight: 600;
    font-size: 16px;
    line-height: 30px;
    text-align: right;
    letter-spacing: -0.015em;
    color: #FFFFFF;
    opacity: 0.9;
    margin-bottom: 0px;

    @media (max-width: 576px) {
        text-align: left;
    }
}

.download__title {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: $dark-1;
    opacity: 0.9;
    font-style: normal;
}

.download__detail {
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    text-align: right;
    text-decoration-line: underline;
    color: $yellow;
    opacity: 0.9;
    font-style: normal;
}

.overview-tab {
    margin-top: 6vh;
}

.overview-tab__image {
    min-width: 510px;
    height: auto;

    @media (max-width: 576px) {
        min-width: 0;
    }
}

.requirement__body-dark1 {
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    text-align: right;
    color: $dark-1;
    opacity: 0.9;
    margin-bottom: 1rem;
}

.card__download {
    // background: #C8D3D7;
    background: #F2F3F4;
    border-radius: 16px;
    min-width: 100%;
    min-height: 103px;
    padding: 40px 35px;
    margin-top: 2.5rem;

    @media (max-width: 576px) {
        padding: 40px 25px;
    }
}

.card__contents {
    margin-left: 45px;
    margin-right: 45px;

    @media (max-width: 576px) {
        margin-left: 25px;
        margin-right: 25px;
    }
}
</style>
