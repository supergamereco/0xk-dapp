<template>
  <div class="about">
    <section-banner class="row"/>
    <section-meet />
    <section-nft-info />
    <section-roadmap-landing class="row" />
    <div class="row founder">
      <div class="container title-founder">
        <h1 class="title-section-meet">
          {{ $t("home.section-founder.title-lbl") }}
        </h1>
        <p class="detail-section-meet">
          {{ $t("about.founder.detail_titile") }}
        </p>
        <section-founder />
      </div>
    </div>
    <section-partner id="section-partner" ref="section-partner" class="row" />
    <section-about-us id="section-news" ref="section-news"  class="row" />
        <!-- on top-->
    <button class="pagetop" style="z-index: 2" v-show="scY > 300" @click="toTop">
        <img class="btn-pagetop-img" :src="require('@/assets/profile/btn-gototop.svg')" loading="lazy">
    </button>
  </div>
</template>

<script>
import SectionAboutUs from "@/components/section/SectionAboutUs.vue";
import SectionBanner from "@/components/section/SectionBanner.vue";
import SectionFounder from "@/components/section/SectionFounder.vue";
import SectionMeet from "@/components/section/SectionMeet.vue";
import SectionPartner from "@/components/section/SectionAbountPartner.vue";
import SectionRoadmapLanding from "@/components/section/SectionRoadmapLanding.vue";
import ServiceProfile from '@/data/ServiceProfile.json'
import SectionNftInfo from "@/components/section/SectionNftInfo";

export default {
  name: "about",
  components: {
    SectionNftInfo,
    SectionBanner,
    SectionMeet,
    SectionRoadmapLanding,
    SectionFounder,
    SectionPartner,
    SectionAboutUs,
  },
   data: () => {
        return {
            scY: ServiceProfile.scY,
        };
    },
  mounted() {
        this.goTop();
        this.$root.$emit("on-click-to");
        window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
      goTop() {
        let el = document.getElementById("nav-bar-top");
        if (this.$route.params.action === "partner") {
          el =  document.getElementById("section-partner");
        }
        if (this.$route.params.action === "news") {
          el =  document.getElementById("section-news");
        }
        this.goto(el);
      },
      handleScroll: function () {
            if (this.scTimer) return;
            this.scTimer = setTimeout(() => {
                this.scY = window.scrollY;
                clearTimeout(this.scTimer);
                this.scTimer = 0;
            }, 100);
      },
      toTop: function () {
          window.scrollTo({
              top: 0,
              behavior: "smooth"
          });
      },
      goto(el)  {
         let top = el;
         setTimeout(() => {
               window.scrollTo(0, top.offsetTop);
            }, 400);

      }
    },
};
</script>

<style lang="scss" scoped>
@import "~@/scss/About.scss";
// #app .container-fluid {
//   padding-left: 0 !important;
//   padding-right: 0 !important;
// }
.row.founder {
    padding-top: 4rem;
    padding-bottom: 4rem;
}
</style>
