<template>
  <div class="card-default-presale">
        <b-card>
            <b-card-body>
                <b-card-title class="card-default-presale__title mb-2">{{ header }}</b-card-title>
                <b-card-sub-title class="card-default-presale__sub-title mb-2">{{ getTimeOpenAndEnd(startData,closeData) }}</b-card-sub-title>
                <div style="position: relative">
                  <b-card-img :src="getImgUrl(image)" bottom></b-card-img>
                  <div class="detail-img">
                    <h5
                      v-if="discount !== ''"
                      style="position: absolute; bottom: 48px; right: 0px"
                    >
                      <b-badge class="tag_inside_img_right">{{ discount }}</b-badge>
                    </h5>
                    <h5 v-if="preorder" style="position: absolute; bottom: 12px; right: 0px">
                      <b-badge class="tag_inside_img_right" style="min-width: 93px">{{
                        $t("card-profile.pre-order")
                      }}</b-badge>
                    </h5>
                  </div>
                </div>

                <b-card-text>
                    <div class="row">
                        <div class="col-md-12 card-default-presale-content__hilight-txt">
                            {{ title }}
                        </div>
                    </div>

                    <div class="row">
                        <div v-if="isOpenPreOrder(startData)" class="col-6 text-left card-default-presale-title__sub-title">
                            {{ $t('card-default-presale.ending-lbl') }}
                        </div>
                      <div v-else class="col-6 text-left card-default-presale-title__sub-title">
                        {{ $t('card-default-presale.starting-lbl') }}
                      </div>
                        <div v-if="!isOpenPreOrder(closeData) && closeData > 0" class="col-6 text-right card-default-presale-title__sub-title-dark">
                          <countdown :time="getTimeEnd(closeData)">
                            <template slot-scope="props">{{ props.days }}D {{ props.hours }}H : {{ props.minutes }}M : {{
                                props.seconds
                              }}S
                            </template>
                          </countdown>
                        </div>
                      <div v-else class="col-6 text-right card-default-presale-title__sub-title-dark">
                        {{subHeader}}
                      </div>
                    </div>
                  <div class="row">
                    <div class="col-6 text-left card-default-presale-title__sub-title">
                      {{ $t('card-default-presale.total-lbl') }}
                    </div>
                    <div class="col-6 text-right card-default-presale-title__sub-title">
                      {{ $t('card-default-presale.current-total-unit-lbl', {current: currentUnit, total: totalUnit}) }}
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-12">
                      <div class="progress">
                        <div
                            class="progress-bar card-default-presale-content__progress-bar"
                            role="progressbar"
                            :style="getStyleProgress()"
                            :aria-valuenow="getProgress()"
                            aria-valuemin="0"
                            aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </div>

                    <hr class="card-default__line"/>

                  <div class="row">
                    <div class="col-md-6 d-flex align-items-center">
                      <span class="card-default-presale-content__font-yellow">{{ $t('card-default-presale.price-lbl') }}</span>
                    </div>
                    <div class="col-md-6 d-flex align-items-center justify-content-end">
                      <span class="card-default-presale-content__font-yellow"> {{ price }}&nbsp;</span>
                      <img :src="getImgUrl(currency)" style="width:28.45px !important; hieght:28px !important;"/>
                    </div>
                  </div>

                  <div class="row mt-2">
                    <div class="col-md-12">
                      <button v-if="isOpenPreOrder(startData)" type="button" class="col-md-12 btn btn-preorder text-color btn-card-presale__full-width" @click="submit(productPriceId)">
                        {{ $t('card-presale.btn-pre-lbl') }}
                      </button>
                      <button v-else type="button" class="col-md-12 btn btn-comingsoon text-color" style="width: 100% !important; height: 52px;" >
                        {{ $t('card-default-presale.btn-coming-soon-lbl') }}
                      </button>
                    </div>
                  </div>
                  <div class="row mt-2">
                    <div class="col-md-12">
                      <button type="button" class="btn btn-outline-secondary btn-border text-color"
                              data-mdb-ripple-color="dark" style="min-width: 100% !important; height: 52px;" @click="addWishList(productId,productPriceId)">
                          <i class="fas fa-heart" v-if="isWishList(productId)" style="color: #F7CA38"></i>
                          <i class="far fa-heart" v-else ></i>
                          {{ $t('card-default-presale.btn-wishlist-lbl') }}
                      </button>
                    </div>
                  </div>
                </b-card-text>
            </b-card-body>
        </b-card>
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
    name: "card-default-presale",
    props: {
        image: { type: String, required: true },
        header: { type: String, required: true },
        subHeader: { type: String, required: true },
        title: { type: String, required: true },
        startData: { type: Number, required: true },
        closeData: { type: Number, required: true },
        price: { type: Number, required: true },
        currency: { type: String, required: true },
        discount: { type: String, required: false },
        preorder: { type: Boolean, required: true },
        productId: { type: String, required: true },
        productPriceId: { type: String, required: true },
        currentUnit: { type: Number, required: true },
        totalUnit: { type: Number, required: true },
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
        }),
    },
    methods: {
        ...mapActions({
            ncmMyWishList: vuexTypes.NCM_API_PRODUCT_WISHLIST,
        }),
        async addWishList(productId, productPriceId) {
              await this.ncmMyWishList({
                  'productId': productId,
                  'productPriceId': productPriceId,
                  'remove': false
              })

      },
        isWishList(productId) {
            if(this.myWishList && this.myWishList.find(element => element == productId)) {
                return true;
            }
            return false;
        },
        getImgUrl(name) {
            let images = require.context('@/assets/game_detail/', false, /\.png$/)
            return images('./' + name + ".png")
        },
        getProgress() {
            return (this.currentUnit/this.totalUnit) * 100
        },
        getStyleProgress(){
            return 'width: ' + this.getProgress() + "%"
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
          return dateStart.toUpperCase()+'UTC - '+dateEnd.toUpperCase()+' UTC';
        },
    },
};
</script>

<style lang="scss" scoped>
@import '~@/scss/_variables.scss';

  div.carousel-card.card__size .carousel-control-prev{
    left: 2% !important;
  }

  div.carousel-card.card__size .carousel-control-next{
    right: 2% !important;
  }

  div.carousel-card.card__size .carousel-indicators{
    bottom: -26px !important;
  }
  @media screen and (max-width: 360px) {
     div.carousel-card.card__size .carousel-indicators{
      bottom: 20px !important;
    }
  }
  @media screen and (max-width: 576px) {
     div.carousel-card.card__size .carousel-indicators{
      bottom: -20px;
    }
  }

div.card-default-presale .card .card-body .card-body{
  padding: 0.5rem !important;
}

div.card-default-presale>div.card {
  background-color: #FAFAFA !important;
  border-radius: 18px;
  border: none;
  height: auto;
  width: auto;
}

div.card-default-presale>div.card>div.card-body {
  padding: 1.2vh !important;
  .card-title.card-default-presale__title {
    // font-size: 2.4vh
    font-weight: 700;
    font-size: 24px;
    line-height: 36px;
    /* identical to box height, or 150% */
    text-align: center;
    letter-spacing: -0.015em;
    color: $dark-1 !important;
  }

  .card-subtitle.card-default-presale__sub-title {
    // font-size: 1.5vh
    font-weight: 500;
    font-size: 16px;
    line-height: 30px;
    /* identical to box height, or 187% */
    text-align: center;
    letter-spacing: -0.015em;
    color: #888E97 !important;
  }
}

.card-img-top .card__img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

.card-default-presale-title__title {
  font-size: 1.8vh;
  letter-spacing: -0.015em;
  color: $light-grey-1;
  margin-bottom: 0;
}

.card-default-presale-title__sub-title {
  font-family: Inter;
  font-weight: 500;
  font-size: 16px;
  letter-spacing: -0.015em;
  color: $dark-1;
}
.text-right.card-default-presale-title__sub-title {
    @media (max-width: 390px) {
        padding: 0;
    }
}

.text-right.card-default-presale-title__sub-title-dark {
  font-family: Inter;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  text-align: right;
  color: $dark-1;

    @media (max-width: 390px) {
        padding: 0;
    }
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
  font-size: 24px;
  line-height: 32px;
  /* identical to box height, or 125% */
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
  background-color: #C8D3D7;

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
</style>
