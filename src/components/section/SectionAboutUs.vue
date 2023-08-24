<template>
  <div class="section-about-us">
    <div class="container">
      <div class="title-section">
            <h1 class="title-section-meet">{{ $t('about.about-us.title') }}</h1>
            <p class="detail-section-meet">
              {{ $t('about.about-us.detail') }}  
            </p>
          </div>

          <div class="carousel-card">
              <b-carousel
              id="categoryRoulette"
              :interval="0"
              controls
              indicators
              img-width="1024"
              img-height="480"
              @sliding-start="onSlideStart"
              @sliding-end="onSlideEnd"
            >
              <b-carousel-slide
                v-for="(slide, index) in news_card"
                img-blank
                :key="index"
              >
                <div class="row card-contents">
                  <!-- <div class="row"> -->
                  <div class="col-md-4"
                      v-for="(values,idx) in slide"
                      :key="idx"
                      >
                    <div class="assets-card">
                      <b-card class="mb-2">
                        <multi-card
                          :image="values.image"
                          :detail="values.detail"
                          :image_logo="values.image_logo"
                          :text_logo="values.text_logo"
                          :section="sections" />
                      </b-card>
                    </div>
                  <!-- </div> -->
                  </div>
                </div>
              </b-carousel-slide>
            </b-carousel>
          </div>
    </div>
    
  </div>
</template>

<script>
import MultiCard from "@/components/common/MultiCard.vue";

import ServiceAboutUs from "@/data/ServiceAboutUs.json";

export default {
  components: { MultiCard },
  name: "section-about-us",
  data() {
    return {
      slide: 0,
      sliding: true,
      news_card: ServiceAboutUs.news_cards,
      sections: "about"
    };
  },
  methods: {
    onSlideStart(sliding) {
      this.sliding = sliding;
    },
    onSlideEnd(sliding) {
      this.sliding = sliding;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/About.scss";
@import '~@/scss/_variables.scss';

.section-about-us {
  padding-top: 3rem;
  padding-bottom: 3rem;
}

img.card-img-top {
  width: 268px;
  height: 214px;
  display: flex;
  align-self: center;
  margin-top: 1rem;
}

.card.mb-2 {
  background-color: #FAFAFA;
  border-radius: 18px;
}

.carousel-item {
  height: 550px;
}
</style>
