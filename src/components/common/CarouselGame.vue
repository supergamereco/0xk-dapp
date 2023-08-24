<template>
    <div class="carousel-game">
        <div
            id="carouselMain"
            class="carousel carousel-main"
        >
            <div
                class="carousel-cell slide"
                v-for="(listVideo, indexList) in services.video_game"
                :key="'listVideo' + indexList"
            >
                <iframe
                    style="
                        min-height: 500px;
                        width: 100%;
                        height: 100%;
                        border-radius: 10px;
                    "
                    type="iframe"
                    aspect="16by9"
                    :src="listVideo"
                    allowfullscreen
                ></iframe>
            </div>

            <div
                class="carousel-cell slide"
                v-for="(listSlide, indexList) in services.slide_image"
                :key="'listSlide' + indexList"
            >
                <img
                    :data-flickity-lazyload="listSlide"
                    style="
                        min-height: 500px;
                        height: 100%;
                        width: 100%;
                        border-radius: 10px;
                    "
                />
            </div>
        </div>

        <div
        id="carouselNav"
            class="carousel carousel-nav"
        >
            <div
                class="carousel-cell slide"
                v-for="(listNavVideo, indexList) in services.video_image"
                :key="'listNavVideo' + indexList"
            >
                <img
                    :data-flickity-lazyload="listNavVideo"
                    style="min-width: 306px; width: 100%; border-radius: 10px"
                />
            </div>
            <div
                class="carousel-cell slide"
                v-for="(listNavImage, indexList) in services.slide_image"
                :key="'listNavImage' + indexList"
            >
                <img
                    :data-flickity-lazyload="listNavImage"
                    style="min-width: 306px; width: 100%; border-radius: 10px"
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "carousel-game",
    components: {},
    props: {
        services: { type: Object, required: true },
    },
};
</script>

<style lang="scss" scoped>
.main-carousel {
    width: 500px;
    height: 400px;
    margin: auto;
}

.carousel {
    margin-bottom: 40px;
}

.carousel-cell {
    width: 66%;
    height: 500px;
    margin-right: 10px;
}

.carousel-cell:before {
    display: block;
    text-align: center;
    line-height: 200px;
    font-size: 80px;
    color: white;
}

.carousel-nav .carousel-cell {
    height: 180px;
    width: 306px;
}

.carousel-nav .carousel-cell:before {
    font-size: 50px;
    line-height: 80px;
}

div.carousel-nav div.flickity-viewport {
    height: 180px !important;
}

</style>
