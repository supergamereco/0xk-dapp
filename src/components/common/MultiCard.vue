<template>
  <div class="multi-card">
    <img
      class="section-partners-image img-fluid"
      :src="getImgUrl(image)"
    />
    <b-card-text>
      <p class="detail-section-meet">
        {{ detail }}
      </p>
    </b-card-text>
    <div class="logo-card">
      <img class="section-logo__image" :src="getImgUrl(image_logo)" style="width: 34px; height: 34px;" />
      <span class="text-logo"> {{ text_logo }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "multi-card",
  props: {
    image: { type: String, required: true },
    detail: { type: String, required: true },
    image_logo: { type: String, required: true },
    text_logo: { type: String, required: true },
    section: { type: String, required: true }
  },
  methods: {
    getImgUrl(name) {
      let images = '';
      if(this.section == 'games') {
        images = require.context('@/assets/game_detail/', false, /\.png$/)
      } else {
        images = require.context("@/assets/aboutImages/", false, /\.png$/);
      }
      return images("./" + name);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/scss/_variables.scss';

img.card-img-top {
  width: 268px;
  height: 214px;
  display: flex;
  align-self: center;
  margin-top: 1rem;
}

.card.mb-2 {
  background-color: #2b2b3e;
  border-radius: 18px;
}

p.card-text {
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 30px;
  text-align: center;
  color: $dark-1;
  margin-top: 1.5rem;
}

span.text-logo {
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 36px;
  text-align: center;
  letter-spacing: -0.015em;
  color: $dark-1;
}

img.section-partners-image {
  width: 268px;
  height: 214px;
  display: flex;
  position: initial;
  margin: auto;

  @media (max-width: $medium) {
    width: 100% !important;
    height: auto !important;
    margin-left: 0rem !important;
  }
}
</style>