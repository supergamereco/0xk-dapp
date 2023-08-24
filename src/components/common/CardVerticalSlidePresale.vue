<template>
  <div class="card-vertical-slide-presale">
    <card-vertical-presale-main :services="thumbnail_slide"/>
  </div>
</template>

<script>
import { validateMobile } from '@/common/core'
import CardVerticalPresaleMain from './CardVerticalPresaleMain.vue';

export default {
  components: { CardVerticalPresaleMain },
  name: "card-vertical-slide-presale",
  props: {
      thumbnailImage: { type: Array, required: true },
  },
  data: () => {
    return{
      isMobile: validateMobile(),
      thumbnail_slide: [],
      imageSlide: [],
    }
  },
  created() {
      this.thumbnail_slide = this.thumbnailImage
  }
};
</script>