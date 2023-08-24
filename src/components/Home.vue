<template>
    <div class="home">
        <div class="home__banner">
            <div class="container">
                <div id="count-down" class="row top-home">
                    <div class="col-lg-6 col-md-6 col-sm-12 pre-order-title" style="margin-top:5%">
                        <div class="row ending">
                            <!-- <p class="home__title">Ducky Keyboards</p>
                            <p class="home__detail">
                                DuckyChannel is a leading manufacturer and developer of high-end professional keyboards
                                and mice of spectacular quality and performance. With partners in over 50 countries,
                                DuckyChannel strives to create products that are not just your average PC peripherals,
                                but also pieces of art by fusing cultural traditions with state-of-the-art technology.
                                    It is our mission to meet users and collectors’ needs.
                            </p> 
                            <div class="col-12 ending-title">
                                <p>Ending in</p>
                            </div>
                            <div class="col-12 countdown">
                                <countdown :time="getTimeEnd(closeData)" :transform="transformSlotProps">
                                    <template slot-scope="props">
                                        <div
                                            class="how-countdown how-countdown-days"
                                        >
                                            <p class="days">{{ props.days }}</p>
                                            <p class="lebel-days">Days</p>
                                        </div>
                                        <div class="how-countdown">
                                            <p class="hours">{{ props.hours }}</p>
                                            <p class="lebel-hours">Hours</p>
                                        </div>
                                        <div class="how-countdown">
                                            <p class="minutes">
                                                {{ props.minutes }}
                                            </p>
                                            <p class="lebel-minutes">Minutes</p>
                                        </div>
                                        <div
                                            class="how-countdown how-countdown-second"
                                        >
                                            <p class="seconds">
                                                {{ props.seconds }}
                                            </p>
                                            <p class="lebel-seconds">Seconds</p>
                                        </div>
                                    </template>
                                </countdown>
                            </div> -->
                        </div>

                        <!-- <div class="row">
                            <div class="col-12">
                                <button
                                    type="button"
                                    class="btn btn-preorder btn-border text-color btn-margin-r"
                                    @click="goToProductDetail(productPriceId)"
                                >
                                    {{ $t("home.btn-pre-lbl") }}
                                </button>
                                <button
                                    type="button"
                                    class="btn btn-outline-secondary btn-border text-color"

                                    @click="addWishList(productId,productPriceId)"
                                >
                                    <i class="fas fa-heart" v-if="isWishList(productId)" style="color: #F7CA38"></i>
                                    <i class="far fa-heart" v-else ></i>
                                    {{ $t("home.btn-wishlist-lbl") }}
                                </button>
                            </div>
                        </div> -->
                    </div>
                    <!-- <div class="col-lg-6 col-md-6 col-sm-12 pre-order-d-img">
                        <img  src="~@/assets/home/d_keyboard.png" alt="" class="img-fluid d-key-image">
                    </div> -->
                </div>
            </div>
        </div>

        <!-- <section-popular-category :categoriesList="categoriesPoppularList" />

        <section-preorder :services="limitedList" :totalLimited="totalLimited"/>

        <section-marketplace :list="nftMarketplaceList" :totalList="nftMarketplaceList.length" :categoriesList="categoriesList" :filter="filter" :is_loaded="is_loaded" />

        <section-process-info />

        <ModalAlertConnectWallet /> -->
    </div>
</template>

<script>
// import SectionPreorder from "@/components/section/SectionPreorder.vue";
import ServiceGameDetail from "@/data/ServiceGameDetail.json"
import moment from "moment";
import {mapActions, mapGetters} from "vuex";
import {vuexTypes} from "@/store/modules/types";
// import ModalAlertConnectWallet from "./modals/ModalAlertConnectWallet.vue";
// import SectionProcessInfo from "@/components/section/SectionProcessInfo";
// import SectionPopularCategory from "@/components/section/SectionPopularCategory";
// import SectionMarketplace from "@/components/section/SectionMarketplace";
import { api } from "@/js/api/api.js";

export default {
    name: "home",
    components: {
        // SectionMarketplace,
        // SectionPopularCategory,
        // SectionProcessInfo,
        // SectionPreorder,
        // ModalAlertConnectWallet
    },
    data: () => {
        return {
            totalLimited: 0,
            closeData: ServiceGameDetail.card_presale.closeData,
            productId: ServiceGameDetail.card_presale.productId,
            productPriceId: ServiceGameDetail.card_presale.productPriceId,
            categoriesList: [],
            categoriesPoppularList: [],
            productLimit: 12,
            productPage: 1,
            limitedList: [],
            nftMarketplaceList: [],
            filter: {
                categories: [],
                order: 0
            },
            is_loaded: false
        };
    },
    // async created() {
    //     this.$root.$on('doFilter', (filter) => {
    //         this.filter = filter
    //         this.getNftMarketplaceList()
    //     })

    //     await this.initLoad()
    // },
    // mounted() {
    //     this.$root.$emit("on-click-to");

    //     this.$root.$on("alert-login-metamask-home", () => {
    //        this.openAlertMetamaskModal()
    //     });
    // },
    // computed: {
    //     ...mapGetters({
    //         myWishList: vuexTypes.myWishList,
    //         metamaskAccount: vuexTypes.metamaskAccount,
    //         limitedEdition: vuexTypes.responseLimitedEdition,
    //     }),
    // },
    methods: {
        ...mapActions({
            ncmMyWishList: vuexTypes.NCM_API_PRODUCT_WISHLIST,
            disconnect: vuexTypes.DISCONNECT_METAMASK,
            getLimitedEditionList: vuexTypes.GET_LIMITED_EDITION,
        }),
        async addWishList(productId, productPriceId) {

            if (this.metamaskAccount === "" || this.metamaskAccount === null || Number(localStorage.getItem('authorization_expire')) < moment().unix()) {
                await this.disconnect();
                this.$root.$emit("alert-login-metamask-home");
            } else {
                await this.ncmMyWishList({
                    'productId': productId,
                    'productPriceId': productPriceId,
                    'remove': false
                })
            }
        },
        openAlertMetamaskModal(){
            this.$bvModal.show("modal-login-metamask");
        },
        isWishList(productId) {
            if(this.myWishList && this.myWishList.find(element => element == productId)) {
                return true;
            }
            return false;
        },
        goToProductDetail(productPriceId) {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            this.$router.push({ path: '/product', query: { priceId: productPriceId } })
        },
        getTimeEnd(time) {
            const fromTime = moment();
            const toTime = moment.unix(time);
            if (fromTime < toTime) {
                const ms = toTime.diff(fromTime);
                const d = moment.duration(ms);
                return d.asMilliseconds();
            }
            return 0;
        },

        transformSlotProps(props) {
            const formattedProps = {};

            Object.entries(props).forEach(([key, value]) => {
                formattedProps[key] = value < 10 ? `0${value}` : String(value);
            });

            return formattedProps;
        },
        // async getPopularCategoriesList() {
        //     const result = await api.get(process.env.VUE_APP_API_URL + '/category')
        //     this.categoriesList = result.data.data
        //     this.filter.categories = result.data.data
        //     this.categoriesList.forEach((category) => {
        //         if (category.is_popular) {
        //             this.categoriesPoppularList.push(category)
        //         }
        //     })
        // },
        // async getNftMarketplaceList() {
        //     /* eslint-disable no-console */
        //     let url = process.env.VUE_APP_API_URL + '/product_price?page=' + this.productPage + '&limit=' + this.productLimit

        //     if (typeof this.filter.order != 'undefined') {
        //         url += '&order=' + this.filter.order
        //     }
        //     if (typeof this.filter.categories != 'undefined' && this.filter.categories.length > 0) {
        //         url += '&category='

        //         for (var i = 0; i < this.filter.categories.length; i++) {
        //             url += this.filter.categories[i].id

        //             if (i < (this.filter.categories.length-1)) {
        //                 url += ','
        //             }
        //         }
        //     }

        //     try {
        //         this.is_loaded = false
        //         const result = await api.get(url)
        //         this.is_loaded = true
        //         this.nftMarketplaceList = result.data.data.list
        //     } catch (e) {
        //         this.is_loaded = true
        //     }
        // },
        // async getLimitedEditionList() {
        //     const result = await api.get(process.env.VUE_APP_API_URL + '/product_price/hilight')
        //     this.limitedList = result.data.data
        //     this.totalLimited = this.limitedList.length
        // },
        // async initLoad() {
        //     await this.getPopularCategoriesList()
        //     this.getNftMarketplaceList()
        //     this.getLimitedEditionList()
        // }
    },
};
</script>

<style lang="scss" scoped>
@import "~mdb-ui-kit/css/mdb.min.css";
@import "~@/scss/roadmap";

.pre-order-title {
    padding-top: 5%;
    padding-left: 6%;
    padding-bottom: 5%;
    padding-right: 6%;
}

.pre-order-d-img {
    margin: auto;
}

.home__detail {
    word-break: break-word;
    color: #4A525F;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
}

.home__title-get-start {
    font-size: 32px;
    line-height: 44px;
}

.d-key-image {
    right: 10%;
    position: relative;
}

/** COUNT DOWN TIME */
.ending .ending-title {
    margin-top: 7%;
    font-size: 20px;
    font-weight: 700;
    line-height: 28px;
}

.ending .countdown span {
    display: flex;
}

.ending .how-countdown {
    margin-left: 10px;
    margin-right: 10px;
}

.ending .how-countdown-days {
    margin-left: 0;
}

.ending .how-countdown-seconds {
    margin-right: 0;
}

.ending .how-countdown .days,
.ending .how-countdown .hours,
.ending .how-countdown .minutes,
.ending .how-countdown .seconds {
    width: 60px;
    background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.25) 0%,
        rgba(255, 255, 255, 0.05) 100%
    );
    border-radius: 6px;
    font-weight: 700;
    font-size: 28px;
    line-height: 38px;
    text-align: center;
    padding-top: 10px;
}

.ending .how-countdown .lebel-days,
.ending .how-countdown .lebel-hours,
.ending .how-countdown .lebel-minutes,
.ending .how-countdown .lebel-seconds {
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
}

/** */

.top-home {
    min-height: 780px;
    background-color: #FEFAEB;
}


p.home__info {
    color: #9f9f9f;
}

p.home__info-p2 {
    font-weight: normal;
    font-size: 18px;
    line-height: 30px;
    letter-spacing: -0.015em;
    color: #9f9f9f;
}

p.home__info-p3 {
    /* Body 2 (Regular) */
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 30px;

    /* or 167% */
    letter-spacing: -0.015em;

    /* Light Grey 2 */
    color: #9f9f9f;
}

.home__margin {
    margin: 50px 60px;
    /* margin-right: 15px; */
}

.circle {
    width: 60px;
    height: 60px;
    display: flex;
    background: #1b1b21;
    border-radius: 50%;
    border: 2px solid #962eff;
    margin-bottom: 15px;
}

.center {
    margin: auto;
    /* width: 60%; */
    padding: 10px;
}

p.home__heading-info-title {
    font-weight: 600;
    font-size: 36px;
    line-height: 50px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #e3e3e3;
}

p.home__heading-info {
    font-weight: 600;
    font-size: 36px;
    line-height: 50px;
    letter-spacing: -0.015em;
    color: #962eff;
}

// div.center.privileges {
//     padding-left: 15px !important;
// }

p.home__heading-p2,
p.home__info-p2 {
    padding-left: 0px;
}

@media only screen and (max-width: 992px) {
    .home__margin.feature {
        margin-top: 0;
    }

    .pre-order-title,
    .pre-order-d-img {
        flex: 0 0 100%;
        max-width: 100%;
    }
    .pre-order-d-img {
        margin-top: auto;
        text-align: center;
    }

    .d-key-image {
        right: 0;
        max-width: 400px;
        width: 100%;
        height: auto;
        padding-bottom: 6%;
    }

    .get-start-center{
        margin: 0;
    }
}

@media only screen and (max-width: 768px) {

    .d-key-image {
        right: 0;
        position: relative;
    }

    p.lebel-days,
    p.lebel-hours,
    p.lebel-minutes,
    p.lebel-seconds {
        font-size: 14px !important;
    }
}

@media only screen and (max-width: 576px) {
    // div#count-down {
    //     margin-left: -15px !important;
    //     font-size: 14px !important;
    // }

    .section-game-detail,
    .home__margin {
        margin: 50px 10px;
    }

    .home__margin.feature {
        margin: 50px 0;
    }

    .section-partners {
        margin: 50px 10px;
    }

    .ending .how-countdown {
        margin-right: 0px;
    }

    .ending .how-countdown .days,
    .ending .how-countdown .hours,
    .ending .how-countdown .minutes,
    .ending .how-countdown .seconds {
        font-size: 24px;
    }

    .ending .how-countdown .lebel-days,
    .ending .how-countdown .lebel-hours,
    .ending .how-countdown .lebel-minutes,
    .ending .how-countdown .lebel-seconds {
        font-size: 14px;

    }
}
</style>
