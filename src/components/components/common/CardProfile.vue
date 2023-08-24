<template>
  <div class="card-profile">
    <div class="bg-img" :style="'background-image: url('+getImgUrl(image,is_claim)+')'">
        <!-- <b-card-img class="img-fluid bg-image-new" :src="getImgUrl(image,is_claim)" alt="Image"> </b-card-img> -->
    </div>
    <b-card-text>
      <div class="row">
        <div class="col-12 card-title" style="margin-top: 1rem; margin-bottom: 1.1rem;">
          {{ title }}
          <div v-if="info" class="d-inline">
            <a v-b-popover.hover.top="$t('tooltip.info-card')">
              <span
                class="iconify icon_information align-text-top"
                data-icon="akar-icons:info"
                data-width="19px"
                data-height="19px"
                style="margin-top: 0px; margin-right: 0px"
              ></span>
            </a>
          </div>
          <div v-else></div>
        </div>
      </div>
      <div class="row">
        <div class="col-6 card-claim-in">
          <p>
            {{ status_name }}
          </p>
          </div>
        <div v-if="!isOpenPreOrder(claim_in)" class="col-6 text-right card-claim-in-time">
          <p>
          <countdown :time="getTimeEnd(claim_in)">
            <template slot-scope="props">{{ props.days }}D {{ props.hours }}H : {{ props.minutes }}M : {{
                props.seconds
              }}S
            </template>
          </countdown>
          </p>
        </div>
        <div v-else class="col-6 text-right card-claim-in-time">
          <p>
          NOW
          </p>
        </div>
      </div>
      <div class="row">
        <!-- <div class="col-4 text-platform card-platform">
          {{ $t("card-profile.platform") }}
        </div>
        <div class="col-8 text-platform text-right">
          <span class="text-card-profile" style="display: inline-flex">
            {{ getPlatform(platform) }}&nbsp;
          </span>
        </div> -->
      </div>
      <div class="row">
        <div class="col-4 text-price card-price">
          {{ $t("card-profile.price") }}
        </div>
        <div class="col-8 text-price text-right price-bot">
          <p class="text-card-profile" style="display: inline-flex; margin-bottom:0;">
            {{ price }}&nbsp;{{ currency }}&nbsp;
            <img src="~@/assets/game_detail/USDC.svg" class="currency-price" style="width: 1.58vw;height: auto;vertical-align: bottom;"/>
          </p>
        </div>
      </div>
      <div class="progress-line">
        <hr class="line" />
      </div>
    </b-card-text>
  </div>
</template>

<script>
import moment from "moment";
import {convertPlatform} from "@/common/core"

export default {
  name: "card-profile",
  props: {
    image: { type: String, required: true },
    gift: { type: Boolean, required: true },
    discount: { type: String, required: false },
    preorder: { type: Boolean, required: true },
    title: { type: String, required: true },
    info: { type: Boolean, required: true },
    claim_in: { type: Number, required: true },
    price: { type: Number, required: true },
    currency: { type: String, required: true },
    status_name: { type: String, required: true },
    is_claim: { type: Boolean, required: true },
    product_id: { type: String, required: true }
  },

  methods: {
    getImgUrl(name ,isClaim) {
      if(name === 'card.png'){
        let images = require.context('@/assets/profile/', false, /\.png$/)
        return images('./' + name)
      }
      if(!isClaim){
        return name
      }
      return name
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
    getPlatform(value){
      return convertPlatform(value)
    },
  }
};
</script>

<style lang="scss" scoped>
@import "~@/scss/_variables.scss";
@import "~@/scss/card-profile";

p.text-icon {
    font-weight: bold;
    font-size: 18px;
    line-height: 36px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: -0.015em;
    color: #E3E3E3;
}

.line {
  margin-bottom: 0.5rem;
}

</style>
