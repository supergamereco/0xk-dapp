<template>
  <div class="section-key-feature">
      <div class="row space-between-section">
          <div :class="!isMobile ? 'col-10 offset-2 feature__bg desktop' : 'col-12 feature__bg mobile'" >
<!--          <div class="col-12 feature__bg " >-->
            <div class="row feature__space">
                  <div class="col-sm-12 col-md-12 col-lg-2" style="margin: auto;">
                      <p class="feature__highlight">Features</p>
                      <p class="feature__title">What is unique?</p>
                      <p class="feature__sub-title">New features of new product.</p>
                  </div>
                  <div class="col-sm-12 col-md-12 col-lg-10">
                      <card-key-features :services="services" />
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import CardKeyFeatures from '@/components/common/CardKeyFeatures.vue';
import {validateMobile} from "@/common/core";

export default {
  name: "section-key-feature",
  data: () => {
    return{
      isMobile: validateMobile()
    }
  },
  props: {
      services: { type: Array, required: true }
  },
  components: {
       CardKeyFeatures
  },
  mounted() {
        cardSlideKeyFeature();
  }
}
</script>

<style lang="scss" scoped>
.feature__bg {
    background: #FEFAEB;
}

.feature__bg.desktop {
    #carousal__key_feature > .carousel-cell {
        width: 30.33% !important;
    }
}

.feature__space {
    padding: 120px 80px 120px 13px;
}

.feature__highlight {
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    /* or 133% */
    display: flex;
    align-items: center;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    /* Yellowe */
    color: #F7CA38;
}

.feature__title {
    font-weight: 700;
    font-size: 54px;
    line-height: 70px;
    /* or 130% */
    /* Dark1 */
    color: #4A525F;
}

.feature__sub-title {
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    /* or 140% */
    /* Dark2 */
    color: #888E97;
}

</style>