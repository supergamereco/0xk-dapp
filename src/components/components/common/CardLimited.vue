<template>
    <div class="card-limited">
        <div class="row">
            <div class="col-sm-6 col-md-6 col-lg-4" v-for="(value, index) in limitedList" :key="index">
                <div class="card-content">
                    <b-card class="mb-4 card-collection" style="padding-top: 0 !important">
                        <b-card-body style="padding: 0 !important;">
                            <b-card-title class="card-default-presale__title mb-3">{{ value.header }}</b-card-title>
                            <b-card-sub-title><p class="card-default-presale__sub-title mb-3">{{ getTimeOpenAndEnd(value.startData, value.closeData) }}</p></b-card-sub-title>
                            <div class="bg-img" style="position: relative" :style="'background-image: url('+getImgUrl(value.product)+')'">
                                <!-- <b-card-img class="img-fluid bg-image-new" :src="getImgUrl(value.image)" alt="Image" bottom> </b-card-img> -->
                                <div class="detail-img">
                                    <h5 v-if="value.discount !== ''" style="position: absolute; bottom: 38px; right: 0px;">
                                        <b-badge class="tag_inside_img_right">{{ value.discount }}</b-badge>
                                    </h5>
                                    <h5 v-if="value.preorder" style="position: absolute; bottom: 1px; right: 0px;">
                                        <b-badge class="tag_inside_img_right" style="min-width: 93px">{{ $t("card-profile.pre-order") }}</b-badge>
                                    </h5>
                                </div>
                            </div>

                            <b-card-text class="mt-2">
                                <div class="row mb-2">
                                    <div class="col-12 card-default-presale-content__hilight-txt">
                                        {{ value.title }}
                                    </div>
                                </div>

                                <div class="row mb-2">
                                    <div v-if="isOpenPreOrder(value.startData)" class="col-6 text-left card-default-presale-title__sub-title">
                                        {{ $t('card-default-presale.ending-lbl') }}
                                    </div>
                                    <div v-else class="col-6 text-left card-default-presale-title__sub-title">
                                        {{ $t('card-default-presale.starting-lbl') }}
                                    </div>

                                    <div v-if="!isOpenPreOrder(value.closeData) && value.closeData > 0" class="col-6 text-right card-default-presale-title__sub-title-dark">
                                        <countdown :time="getTimeEnd(value.closeData)">
                                            <template slot-scope="props">
                                                {{ props.days }}D {{ props.hours }}H : {{ props.minutes }}M : {{ props.seconds }}S
                                            </template>
                                        </countdown>
                                    </div>
                                    <div v-else class="col-6 text-right card-default-presale-title__sub-title-dark">
                                        {{value.subHeader}}
                                    </div>
                                </div>

                                <div class="row mb-2">
                                    <div class="col-6 text-left card-default-presale-title__sub-title">
                                        {{ $t('card-default-presale.total-lbl') }}
                                    </div>
                                    <div class="col-6 text-right card-default-presale-title__sub-title">
                                        {{ $t('card-default-presale.current-total-unit-lbl', {current: value.currentUnit, total: value.totalUnit}) }}
                                    </div>
                                </div>

                                <div class="row mb-2">
                                    <div class="col-12">
                                        <div class="progress" style="border-radius: 9.5px;">
                                            <div
                                                class="progress-bar card-default-presale-content__progress-bar"
                                                role="progressbar"
                                                :style="getStyleProgress(value.currentUnit, value.totalUnit)"
                                                :aria-valuenow="getProgress(value.currentUnit, value.totalUnit)"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            ></div>
                                        </div>
                                    </div>
                                </div>

                                <hr class="card-default__line"/>

                                <div class="row">
                                    <div class="col-4 d-flex align-items-center">
                                        <span class="card-default-presale-content__font-yellow">{{ $t('card-default-presale.price-lbl') }}</span>
                                    </div>
                                    <div class="col-8 d-flex align-items-center justify-content-end">
                                        <span class="card-default-presale-content__font-yellow"> {{ value.price }}&nbsp;</span>
                                        <img class="currency-price" :src="getImgUrl(value.currency)" />
                                    </div>
                                </div>

                                <div class="row mt-2">
                                    <div class="col-12">
                                        <button v-if="isOpenPreOrder(value.startData)" type="button" class="col-12 btn btn-preorder text-color btn-card-presale__full-width" @click="goToProductDetail(value.productPriceId)">
                                            {{ $t('card-presale.btn-pre-lbl') }}
                                        </button>
                                        <button v-else type="button" class="col-12 btn btn-comingsoon text-color" style="width: 100% !important; height: 52px;" >
                                            {{ $t('card-default-presale.btn-coming-soon-lbl') }}
                                        </button>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-12">
                                        <button type="button" class="col-12 btn btn-outline-secondary btn-border text-color"
                                                data-mdb-ripple-color="dark" style="min-width: 100% !important; height: 52px;" @click="addWishList(value.productId, value.productPriceId)">
                                            <i class="fas fa-heart" v-if="isWishList(value.productId)" style="color: #F7CA38"></i>
                                            <i class="far fa-heart" v-else ></i>
                                            {{ $t('card-default-presale.btn-wishlist-lbl') }}
                                        </button>
                                    </div>
                                </div>
                            </b-card-text>
                        </b-card-body>
                    </b-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";
import {mapActions, mapGetters} from "vuex";
import {vuexTypes} from "@/store/modules/types";

export default {
    name: 'card-limited',
    props: {
        limitedList: { type: Array, required: true },
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
            disconnect: vuexTypes.DISCONNECT_METAMASK,
            getProductDetailById: vuexTypes.GET_PRODUCT_DETAIL
        }),
        async addWishList(productId, productPriceId) {
            if (this.metamaskAccount === "" || this.metamaskAccount === null || Number(localStorage.getItem('authorization_expire')) < moment().unix()) {
                await this.disconnect();
                this.$root.$emit("alert-login-metamask-home");
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
            return !!(this.myWishList && this.myWishList.find(element => element === productId));
        },
        getImgUrl(name) {
            let images = require.context('@/assets/game_detail/', false, /\.png$/)
            return images('./' + name + ".png")
        },
        getTimeOpenAndEnd(start,end) {
            let dateStart =  moment.unix(start).format("Do MMM HHA");
            let dateEnd =  moment.unix(end).format("Do MMM HHA");
            return dateStart.toUpperCase()+' UTC - '+dateEnd.toUpperCase()+' UTC';
        },
        isOpenPreOrder(time) {
            return moment() >= moment.unix(time);
        },
        getTimeEnd(time) {
            const fromTime = moment();
            const toTime = moment.unix(time);
            if(fromTime < toTime){
                const ms = toTime.diff(fromTime);
                const d = moment.duration(ms);
                return d.asMilliseconds();
            }
            return 0;
        },
        getProgress(currentUnit, totalUnit) {
            return (currentUnit/totalUnit) * 100
        },
        getStyleProgress(currentUnit, totalUnit){
            return 'width: ' + this.getProgress(currentUnit, totalUnit) + "%"
        },
        goToProductDetail(productPriceId) {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            if (this.$route.path !== '/product') this.$router.push({ path: '/product', query: { priceId: productPriceId } })
        },
    }
}
</script>

<style lang="scss" scoped>
.card-collection {
    /* White */
    background: #FAFAFA;
    /* Light1 */
    border: 1px solid #F0F1F3;
    /* Drop Shadow1 */
    box-shadow: 0px 2px 12px 2px rgba(0, 0, 0, 0.05);
    border-radius: 18px;
}

.card-default-presale__title {
    font-weight: 700;
    font-size: 20px;
    line-height: 28px;
    /* identical to box height, or 140% */
    text-align: center;
    /* Dark1 */
    color: #4A525F;
}

.card-default-presale__sub-title {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    /* identical to box height, or 133% */
    text-align: center;
    color: #888E97;
}

.card-default-presale-content__hilight-txt {
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    /* or 133% */
    /* Dark1 */
    color: #4A525F;
}

.card-default-presale-title__sub-title {
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    /* or 138% */
    /* Dark1 */
    color: #4A525F;
}

.card-default-presale-title__sub-title-dark {
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    /* or 138% */
    //text-align: right;
    /* Dark1 */
    color: #4A525F;

    @media (max-width: 576px) {
        text-align: left !important;
    }
}

.card-default-presale-content__progress-bar {
    background-color: #F7CA38;
}

.currency-price {
    width: 1.5vw;
    height: auto;
    vertical-align: bottom;
    top: -2px;
    position: relative;

    @media (max-width: 991px) {
        width: 24px !important;
    }
}



.card-default-presale-content__font-yellow {
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    /* or 133% */
    /* Yellowe */
    color: #F7CA38;
}

.bg-image-new {
    padding: 6% 6%;
}

.bg-img {
    /* Light1 */
    background: #F0F1F3;
    border-radius: 16px;
}
</style>