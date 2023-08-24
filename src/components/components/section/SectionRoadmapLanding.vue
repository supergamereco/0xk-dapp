<template>
    <div class="section-roadmap">
        <div class="container">
            <div class="row">
                <div class="col-md-12 title-section roadmap-landing">
                    <h1 class="title-section-meet">{{$t('common.roadmap')}}</h1>
                </div>
                <div class="col-md-12 text-center">
                    <img class="section-roadmap__image" src="~@/assets/home/roadmap.png" >
                    <p class="section-roadmap__new"><img class="section-roadmap__image_new img-fluid" src="~@/assets/home/roadmap-mobile.png" /></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'section-road-map',
}
</script>

<style lang="scss" scoped>
@import "~@/scss/About.scss";
@import "~@/scss/roadmap";


.section-roadmap__image {
  margin-top: 4rem;
}
</style>