<template>
  <div class="section-related-product">
    <div class="container section__related_product">
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12">
            <p class="heading-title">
              {{$t('home.section-releseNews.title-lbl')}}
            </p>
            <card-related-product :services="services" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardRelatedProduct from '@/components/common/CardRelatedProduct.vue';

export default {
  name: "section-related-product",
  props: {
      services: { type: Array, required: true }
  },
  components: {
    CardRelatedProduct
  },
  mounted() {
    cardSlideRelateProduct();
  },
}
</script>

<style lang="scss" scoped>
</style>