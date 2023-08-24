<template>
  <div class="card__related_product">
        <div class="row" style="padding-bottom: 50px;">
            <div
                class="col-12 carousel__related_product"
                id="carousal__related_product"
            >
                <div
                    class="carousel-cell slide"
                    v-for="(value, index) in services"
                    :key="index"
                    img-blank
                >
                    <b-card class="card__product mb-2">
                        <b-card-header>
                            <b-card-img
                                class="carousel-cell-image img-fluid"
                                :src="getImgUrl(value.product)"
                            />
                        </b-card-header>
                        <b-card-title class="title__section__relate_product">
                            {{ value.product.name }}
                        </b-card-title>
                        <b-card-text>
                            <p class="article__relate__product__contents">
                                {{ value.product.description }}
                            </p>
                        </b-card-text>
                        <div class="row price__product">
                            <div class="col-4 d-flex align-items-center">
                                <span class="card-default-presale-content__font-yellow">{{
                                $t("card-default-presale.price-lbl")
                                }}</span>
                            </div>
                            <div class="col-8 d-flex align-items-center justify-content-end">
                                <span class="card-default-presale-content__font-yellow">
                                    {{ value.unit_price }} {{value.currency.name}}&nbsp;
                                </span>
                                <b-card-img
                                    :src="getImgCurrencyUrl(value.currency.image_url)"
                                    style="width: 28.45px !important; hieght: 28px !important"
                                />
                            </div>
                        </div>
                    </b-card>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
export default {
  name: "card-related-product",
  props: {
    services: { type: Array, required: true },
  },
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
  },
};
</script>

<style lang="scss" scoped>
@import "~@/scss/_variables.scss";

.carousel-cell {
    width: 25%;
    display: flex;
    justify-content: center;

    @media (max-width: 1024px) {
        width: auto;
    }
}

.card.card__product {
    width: 304px;
    height: auto;
    border: 1px solid $light-1;
    background: $white-bg;
    border-radius: 18px;
}

.card-header {
    min-width: auto;
    min-height: 214px;
    background: $light-1 !important;
    border-radius: 16px !important;
}

img.carousel-cell-image.img-fluid.card-img {
    margin: 3rem 0rem;
    min-width: 100%;
    min-height: auto;
}

h4.card-title.title__section__relate_product {
    color: $dark-1;
    font-size: 18px;
    font-style: normal;
    line-height: 24px;
    font-weight: 700;
    padding-top: 6%;
}

p.card-text {
    margin-top: 18px;
}

p.article__relate__product__contents {
    color: $dark-2;
    font-size: 18px;
    font-weight: 500;
    font-style: normal;
    line-height: 24px;
    margin-top: -0.5rem;
    margin-bottom: -0.5rem;
}

span.card-default-presale-content__font-yellow {
    font-size: 16px;
    color: #F7CA38;
    font-weight: 700;
    line-height: 24px;
    font-style: normal;
}

.section__text_title_game_detail {
    margin-bottom: 5vh;

    @media (max-width: 820px) {
      padding-left: 30px !important;
    }
}

.card-body {
    width: 100%;
    height: 418px;
}
</style>
