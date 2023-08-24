<template>
  <div id="roadmap-home" class="section-roadmap">
    <div class="container">
      <div class="row">
        <div class="col-md-12 road-map">
          <p class="section-roadmap__heading">{{ $t("common.roadmap") }}</p>
          <p class="section-roadmap__info">
            {{ $t("home.section-roadmap.info-lbl") }}
          </p>
        </div>
        <div class="col-md-12 image-road-map text-center">
          <img class="section-roadmap__image" src="~@/assets/home/roadmap.png" />
          <p class="section-roadmap__new"><img class="section-roadmap__image_new img-fluid" src="~@/assets/home/roadmap-mobile.png" /></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "section-roadmap",

  mounted() {
    this.onTopRoadmap()
    this.$root.$emit("on-click-to");
  },

  methods:{
    onTopRoadmap(){
      if(this.$route.path === '/roadmap'){
        var el = document.getElementById('nav-bar-top');
        el.scrollIntoView({behavior: "smooth", block: "start"});
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~mdb-ui-kit/css/mdb.min.css";
@import "~@/scss/_variables.scss";
@import "~@/scss/roadmap";

</style>