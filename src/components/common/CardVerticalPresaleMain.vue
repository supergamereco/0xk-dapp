<template>
    <div class="row card__vertical_presale_main">
        <div 
            class="col-12 carousel carousel-main"
            id="carousel-main"
        >
            <div 
                class="carousel-cell slide"
                v-for="(value, index) in services"
                :key="index"
                img-blank>
                <div class="bg__main">
                    <b-img 
                    class="carousel-main-image"
                    :data-flickity-lazyload="getImgUrl(value)" />
                </div>
            </div>
        </div>
        <div
            id="carousel-nav"
            class="col-12 carousel carousel-nav">
            <div 
                class="image__slide"
                v-for="(image, index) in services" 
                :key="index"
                >
                <div 
                    class="carousel-cell slide"
                    v-if="index > 0">
                    <div class="images__slide_bg">
                        <b-img 
                            :class="index === 4 ? 'slide__lg_image': ''"
                            :data-flickity-lazyload="getImgUrl(image)"
                            style="width: 210px; max-height: 152px" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "card-vertical-presale-main",
    props: {
        services: { type: Array, required: true }
    },
    // created() {
    //   /* eslint-disable no-console */
    //   console.log('card-vertical-presale-main', this.services)
    // },
    methods: {
        getImgUrl(media) {
            let image_url = '';
            if (image_url == '' && media.media_type.name == 'image') {
                image_url = media.media_url
            }
            return process.env.VUE_APP_URL_MEDIA + image_url
        },
    }
}
</script>

<style lang="scss" scoped>
@import "~@/scss/_variables.scss";

img.carousel-main-image {
    width: 100%;
    height: auto;
    border-radius: 10px;
    margin: auto;
    // padding: 0rem 3rem !important;
}

.bg__main {
    margin: auto;
    min-width: 100%;
    min-height: 454px;
    max-width: 607px;
    // background: $white-bg;
    border-radius: 8px;
    // box-shadow: 0px 2px 12px 2px rgb(0 0 0 / 5%);
    display: flex;
    justify-content: center;
}

.images__slide_bg {
    min-width: 100%;
    min-height: auto;
    max-height: 124px;
    margin-right: 8px;
}

#carousel-nav .carousel-cell.slide {
    width: 33.33%;
    height: auto;
    display: flex;
    justify-content: center;
}

#carousel-main  .carousel-cell.slide {
    min-width: 100% !important;
    min-height: 100% !important;
    // background: $white-bg !important;
}



.carousel.carousel-nav.flickity-enabled.is-draggable {
    margin-top: 10px
}

@media (max-width: 1024px) {
.carousel.carousel-nav.flickity-enabled.is-draggable {
    margin-top: -11%
    }
}

@media (max-width: 991px) {
.carousel.carousel-nav.flickity-enabled.is-draggable {
    margin-top: 10px
    }
}

@media (max-width: 768px) {
.carousel.carousel-nav.flickity-enabled.is-draggable {
    margin-top: -11%
    }
}

@media (max-width: 480px) {
.carousel.carousel-nav.flickity-enabled.is-draggable {
    margin-top: -20%
    }
}

@media (max-width: 320px) {
.carousel.carousel-nav.flickity-enabled.is-draggable {
    margin-top: -40%
    }
}

.slide__lg_image {
    width: 195px;
    height: 124px;
}
</style>