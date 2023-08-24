<template>
    <div class="card-pre-order">
        <div class="row">
            <div
            id="carousal__pre_order"
            class="col-12 carousal__pre_order"
            >
                <div
                    class="carousel-cell slide"
                    v-for="(value, index) in service"
                    :key="index"
                    img-blank>
                    <b-card class="card__pre_order mb-2">

                    <b-card-body style="padding: 0 !important;">
                        <b-card-title class="card-default-presale__title mb-2">PRESALE {{index+1}}</b-card-title>
                        <b-card-sub-title>
                            <p class="card-default-presale__sub-title mb-2">{{ getTimeOpenAndEnd(value.effective_from, value.effective_to) }}</p>
                        </b-card-sub-title>
                        <div class="bg-img" style="position: relative" :style="'background-image: url('+getImgUrl(value.product)+')'">
                            <!-- <b-card-img class="img-fluid bg-image-new" :src="getImgUrl(value.product)" bottom></b-card-img> -->
                            <div class="detail-img">
                                <h5 v-if="value.discount_percent !== ''" style="position: absolute; bottom: 48px; right: 0px">
                                    <b-badge class="tag_inside_img_right">-{{ value.discount_percent }}%</b-badge>
                                </h5>
                                <!-- <h5 v-if="value.preorder" style="position: absolute; bottom: 12px; right: 0px">
                                    <b-badge class="tag_inside_img_right" style="min-width: 93px">{{
                                        $t("card-profile.pre-order")
                                    }}</b-badge>
                                </h5> -->
                            </div>
                        </div>

                        <b-card-text>
                            <div class="row">
                                <div class="col-12 card-default-presale-content__hilight-txt">
                                    {{ value.name }}
                                </div>
                            </div>

                            <div class="row">
                                <div v-if="isOpenPreOrder(value.effective_from)" class="col-6 text-left card-default-presale-title__sub-title">
                                    {{ $t('card-default-presale.ending-lbl') }}
                                </div>
                                <div v-else class="col-6 text-left card-default-presale-title__sub-title">
                                    {{ $t('card-default-presale.starting-lbl') }}
                                </div>
                                <div v-if="!isOpenPreOrder(value.effective_to) && value.effective_to > 0" 
                                    class="col-6 text-right card-default-presale-title__sub-title-dark">
                                    <countdown :time="getTimeEnd(value.effective_to)">
                                        <template slot-scope="props">{{ props.days }}D {{ props.hours }}H : {{ props.minutes }}M : {{
                                            props.seconds
                                        }}S
                                        </template>
                                    </countdown>
                                </div>
                                <div v-else class="col-6 text-right card-default-presale-title__sub-title-dark">TBA</div>
                            </div>
                            <div class="row">
                                <div class="col-6 text-left card-default-presale-title__sub-title">
                                    {{ $t('card-default-presale.total-lbl') }}
                                </div>
                                <div class="col-6 text-right card-default-presale-title__sub-title">
                                    {{ $t('card-default-presale.current-total-unit-lbl', {current: value.inventory.available, total: value.inventory.quantity}) }}
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-12">
                                <div class="progress" style="border-radius: 9.5px;">
                                    <div
                                        class="progress-bar card-default-presale-content__progress-bar"
                                        role="progressbar"
                                        :style="getStyleProgress(value.inventory.available, value.inventory.quantity)"
                                        :aria-valuenow="getProgress(value.inventory.available, value.inventory.quantity)"
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    ></div>
                                </div>
                                </div>
                            </div>

                            <hr class="card-default__line"/>

                            <div class="row">
                                <div class="col-6 d-flex align-items-center">
                                    <span class="card-default-presale-content__font-yellow">{{ $t('card-default-presale.price-lbl') }}</span>
                                </div>
                                <div class="col-6 d-flex align-items-center justify-content-end">
                                    <span class="card-default-presale-content__font-yellow"> {{ value.unit_price }} {{value.currency.name }}&nbsp;</span>
                                    <img :src="getImgCurrencyUrl(value.currency.image_url)" style="width:28.45px !important; hieght:28px !important;"/>
                                </div>
                            </div>

                            <div class="row mt-2">
                                <div class="col-12">
                                    <button v-if="isOpenPreOrder(value.effective_from)" type="button" class="col-12 btn btn-preorder text-color btn-card-presale__full-width" @click="submit(value.id)">
                                        {{ $t('card-presale.btn-pre-lbl') }}
                                    </button>
                                    <button v-else type="button" class="col-12 btn btn-comingsoon text-color" style="width: 100% !important; height: 52px;" >
                                        {{ $t('card-default-presale.btn-coming-soon-lbl') }}
                                    </button>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-12">
                                    <button type="button" class="btn btn-outline-secondary btn-border text-color"
                                            data-mdb-ripple-color="dark" style="min-width: 100% !important; height: 52px;" @click="addWishList(value.product.id, value.id)">
                                            <i class="fas fa-heart" v-if="isWishList(value.product.id)" style="color: #F7CA38"></i>
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
import ServiceHomeGameInfo from '@/data/ServiceHomeGameInfo.json'
import ServiceFormatFrom from '@/data/ServiceFormatFrom.json'
import moment from "moment";
import {mapActions, mapGetters} from "vuex";
import {vuexTypes} from "@/store/modules/types";

const EVENTS = {
  click: 'click',
}
export default {
    name: "card-pre-order",
    props: {
      service: { type: Array, required: true }
    },
    data: () => ({
        EVENTS,
        selected: null,
        options: ServiceFormatFrom.from_selected_sort_by,
        isShow: false,
        success: "Verified",
        fail: "Verified fail",
        text: "Slide to complete the puzzle",
        services: ServiceHomeGameInfo.card_default_presale
    }),
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
        getImgUrl(value) {
            let image_url = '';
            value.media.forEach(media => {
                if (image_url == '' && media.media_type.name == 'image') {
                    image_url = media.media_url;
                }
            });
            
            return process.env.VUE_APP_URL_MEDIA + image_url;
        },
        getImgCurrencyUrl(image_url) {
            return process.env.VUE_APP_URL_MEDIA + image_url;
        },
        getProgress(currentUnit, totalUnit) {
            return (currentUnit/totalUnit) * 100
        },
        getStyleProgress(currentUnit, totalUnit){
            return 'width: ' + this.getProgress(currentUnit, totalUnit) + "%"
        },
        submit(productPriceId) {
          window.scrollTo({
                top: 0,
                behavior: "smooth"
          });

          if (this.$route.path !== '/product') this.$router.push({ path: '/product', query: { priceId: productPriceId } })
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
        getTimeOpenAndEnd(start,end) {
          let dateStart =  moment.unix(start).format("Do MMM HHA");
          let dateEnd =  moment.unix(end).format("Do MMM HHA");
          return dateStart.toUpperCase()+' UTC - '+dateEnd.toUpperCase()+' UTC';
        },
    }
}
</script>

<style lang="scss" scoped>
@import "~@/scss/_variables.scss";

.carousel-cell {
    display: flex;
    justify-content: space-evenly;
}

.card.card__pre_order.mb-2 {
    max-width: 431px;
    margin: 0 2%;
    width: 100%;
    height: auto;
    box-shadow: 0px 2px 12px 2px rgb(0 0 0 / 5%);
    border-radius: 18px;
    background: #FAFAFA;
    // padding: 0;

    // @media (max-width: 820px) {
    //     width: auto;
    // }
}

h4.card-title.card-default-presale__title.mb-2 {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    text-align: center;
    line-height: 32px;
}

div.card-default-presale .card .card-body .card-body{
  padding: 0.5rem !important;
}

div.card-default-presale>div.card {
  background-color: $white-bg !important;
  border-radius: 18px;
  border: none;
  height: auto;
  width: auto;
}

div.card-default-presale>div.card>div.card-body {
  padding: 1.2vh !important;
  .card-title.card-default-presale__title {
    font-weight: 700;
    font-size: 24px;
    line-height: 36px;
    text-align: center;
    letter-spacing: -0.015em;
    color: $dark-1 !important;
  }

  .card-subtitle.card-default-presale__sub-title {
    font-weight: 500;
    font-size: 16px;
    line-height: 30px;
    letter-spacing: -0.015em;
    color: $dark-2 !important;
  }
}

.card-img-top .card__img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

.card-default-presale-title__sub-title {
  font-weight: 500;
  font-size: 16px;
  letter-spacing: -0.015em;
  color: $dark-1;
}

// .text-right.card-default-presale-title__sub-title {
//     @media (max-width: 390px) {
//         padding: 0;
//     }
// }

.text-right.card-default-presale-title__sub-title-dark {
  font-weight: 700;
  font-size: 14px;
  text-align: right;
  color: $dark-1;

    // @media (max-width: 390px) {
    //     padding: 0;
    // }
}

.card-default-presale-content {
  width: 100%;
  height: 100%;
  padding: 0 40px;
}

.card-default-presale-content__background-txt {
  background-color: $font-color-hilight;
  font-size: 1.8vh;
  font-weight: 700;
}

.card-default-presale-content__hilight-txt {
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  text-align: left;
  color : $dark-1;
}

.card-default-presale-content__font-yellow {
  color: $yellow;
  font-weight: 700;
  font-size: 20px;
  line-height: 32px;
  letter-spacing: -0.015em;

    @media (max-width:360px) {
        font-size: 22px;
    }
}

.card-default-presale-content__progress-bar {
  background-color: $yellow;
}

.card-presale-content__background-txt {
  background-color: $font-color-hilight;
  font-size: 1.8vh;
  font-weight: 700;
}

div.card-default-presale>div.card>div.card-body>div.card-body>p.card-text>div.row>div>div.progress {
  margin-top: 0.3rem;
  min-height: 12px !important;
  border-radius: 9.5px;
  background-color: $light-2;

  .card-presale-content__progress-bar {
    border-radius: 2rem;
    background-color: $yellow;
  }
}

.card-default__line {
  color: $light-2;
  margin-bottom: 0.5rem !important;
  margin: 0.5rem 0rem;
}

.card {
  flex-wrap: nowrap;
}

p.card-text{
  margin-top: 0.5rem;
}

@media screen and (max-width: 320px) {
   button.btn.btn-outline-secondary.btn-border.text-color {
        margin: auto;
   }

   span.card-default-presale-content__font-yellow {
        font-size: 17px;
   }
}

.progress-bar.card-default-presale-content__progress-bar {
    border-radius: 9.5px;
}

p.card-default-presale__sub-title.mb-2 {
    color: $dark-2;
    font-size: 0.9vw;
    font-weight: 500;
    line-height: 22px;
    font-style: normal;
    text-align: center;
}

@media (max-width: 1200px) {
    .text-right.card-default-presale-title__sub-title-dark {
       font-size: 13px !important;
    }

    .card-default-presale-title__sub-title {
        font-size: 13px !important;
    }
}

@media (max-width: 1024px) {
    .carousel-cell {
        width: 33.33%;
    }
}

@media (max-width: 991px) {
    .carousel-cell {
        width: 50%;
    }

    p.card-default-presale__sub-title.mb-2 {
        font-size: 1.3vw;
    }

    .text-right.card-default-presale-title__sub-title-dark {
       font-size: 14px !important;
    }
}

@media (max-width: 768px) {
    .carousel-cell {
        width: auto ;
    }

    p.card-default-presale__sub-title.mb-2 {
        font-size: 16px;
    }

     .text-right.card-default-presale-title__sub-title-dark {
       font-size: 14px !important;
    }
}

@media (max-width: 480px) {
    p.card-default-presale__sub-title.mb-2 {
        font-size: 3.4vw;
    }
}

@media (max-width: 320px) {
     .text-right.card-default-presale-title__sub-title-dark {
       font-size: 12px !important;
    }
}

.bg-img {
    background: #FFFFFF;
    border-radius: 16px;
}

.bg-image-new {
    padding-left: 6%;
    padding-right: 6%;
}

.flickity-button:disabled {
    display: none !important;
}

// .carousel-cell {

//     @media (max-width: 1024px) {
//         width: 33.33%;
//     }
//     @media (max-width: 991px) {
//         width: 50%;
//     }
//     @media (max-width: 768px) {
//         width: auto ;
//     }
// }
</style>
