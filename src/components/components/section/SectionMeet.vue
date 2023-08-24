<template>
    <div class="section-meet">
        <div class="container">
            <div class="col-md-12">
                <div class="title-section">
                    <h1 class="title-section-meet">{{ $t('about.meet.title') }}</h1>
                    <p class="detail-section-meet">{{$t('about.meet.detail')}}</p>
                </div>
            </div>
            <div class="col-md-12">
                <div class="detail-section-meet">
                    <img src="@/assets/aboutImages/Rectangle_bg.png" class="img-bg-rectangle">
                    <div class="images-covers">
                        <div class="img-bg-ellipse">
                        <span class="iconify" data-icon="clarity:play-solid" style="color: white;" data-flip="vertical"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'section-meet'
}
</script>

<style lang="scss" scoped>
@import '@/scss/About.scss';
@import '~@/scss/_variables.scss';

.section-meet {
    padding-bottom: 3rem;
    padding-top: 3rem;
    color: #e3e3e3;
}

img.img-bg-rectangle {
    display: flex;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
    height: auto;
    position: relative;

    @media (max-width: $tablet) {
        width: 100%;
        height: auto;
    }
}

.images-covers {
    position: absolute;
    margin-left: 46%;
    margin-top: -27%;

    @media (min-width: 821px) and (max-width: 1024px) {
        margin-left: 44% !important;
        margin-top: -26.5% !important;
    }

    @media (min-width: 768px) and (max-width: 820px) {
        margin-left: 43%;
        margin-top: -33.5%;
    }

    @media (max-width: 767px) {
        margin-left: 40%;
        margin-top: -32.5%;
    }
}

.img-bg-ellipse {
    position: relative;
    width: 72px;
    height: 72px;
    background-color: transparent;
    border-radius: 50%;
    border: 2px solid $yellow;
    backdrop-filter: blur(4px);

    @media (max-width: $tablet) {
        // width: 80% !important;
        // height: auto !important;
    }

    // @media (max-width: $small) {
    //     width: 72px !important;
    //     height: 72px !important;
    // }
}

.detail-section-meet {
    margin-top: 2rem;
}

img.img-bg {
    right: 0%;
    margin-top: -4.75rem;
}

svg.iconify.iconify--clarity {
    width: 35.76px;
    height: 35.76px;
    position: absolute;
    right: 1rem;
    top: 1.15rem;

    @media (max-width: $tablet) {
        width: 50% !important;
        height: auto !important;
    }
}

</style>
