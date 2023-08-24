<template>
  <div class="section-card-game-detail">
    <div class="card-game-detail container">
      <div class="row">
        <div class="col-lg-6 col-md-12 col-sm-12" style="padding-bottom: 20px;">
          <card-vertical-slide-presale v-if="product_detail" :thumbnailImage="product_detail.product.media" />
        </div>
        <div id="preorder-top" class="col-lg-6 col-md-12 col-sm-12" style="padding-bottom: 20px;">
          <div class="row">
            <div class="col-12 card__presale">
              <card-presale v-if="product_detail"
                :price="product_detail.unit_price"
                :salePrice="product_detail.unit_price - (product_detail.unit_price * (product_detail.discount_percent / 100))"
                :currency="product_detail.currency.name"
                :mainTitle="product_detail.product.name"
                :subTitle="product_detail.product.category.name"
                :discount="product_detail.discount_percent"
                :startData="product_detail.effective_from"
                :closeData="product_detail.effective_to"
                :productId="product_detail.product.id"
                :productPriceId="product_detail.id"
                :statusBtn="product_detail.type"
                :currencyImageUrl="getImgCurrencyUrl(product_detail.currency.image_url)"
                :productImageUrl="getImgUrl(product_detail.product)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CardVerticalSlidePresale from "@/components/common/CardVerticalSlidePresale.vue";
import CardPresale from "@/components/common/CardPresale.vue";

export default {
  name: "section-card-game-detail",
  components: {
    CardVerticalSlidePresale,
    CardPresale,
  },
  props: {
    product_detail: { type: Object, required: false },
  },
  mounted() {
    cardSlideCarousel();
  },
  data: () => ({
    isLoaded: false,
  }),
  methods: {
    getImgUrl(value) {
      let image_url = '';
      value.media.forEach(media => {
          if (image_url == '' && media.media_type.name == 'image') {
              image_url = media.media_url;
          }
      });
          
      return process.env.VUE_APP_URL_MEDIA + image_url;
    },
    getImgCurrencyUrl(image_url){
      return process.env.VUE_APP_URL_MEDIA + image_url;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/scss/_variables.scss";
.section-card-game-detail {
  background-color: #f0f1f3;
  padding-top: 5%;
  padding-left: 6%;
  padding-bottom: 5%;
  padding-right: 6%;
}

.col-12.card__presale {
  display: flex;
  justify-content: center;
}
</style>
