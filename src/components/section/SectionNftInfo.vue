<template>
    <div class="section-nft-info">
        <!-- get start -->
        <div class="home__start">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 col-md-12 col-sm-12 get-start-center" >
                        <div class="get-start">
                            <p class="home__title game-start__heading">
                                {{ $t("home.section-get_start.title-lbl") }}
                            </p>
                            <p class="text-sub-title-yellow">
                                {{ $t("home.section-get_start.sub-title-lbl") }}
                            </p>
                            <div class="home-info">
                                <p class="text-info-detail">
                                    {{ $t("home.section-get_start.info-1-lbl") }}
                                </p>
                                <p class="text-info-detail">
                                    {{ $t("home.section-get_start.info-2-lbl") }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-12 col-sm-12">
                        <div class="image-home-start">
                            <img
                                src="~@/assets/home/What_is_NCM_yellow.png"
                                class="img-home-start img-fluid"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- feature -->
        <div class="home__feature">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 col-md-12 col-sm-12 order-1 order-lg-0">
                        <div class="feature-img">
                            <img
                                src="~@/assets/home/Features.svg"
                                class="img-home-feature img-fluid"
                            />
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-12 col-sm-12 order-0 order-lg-1 get-start-center">
                        <div class="feature">
                            <div class="col-md-12 center feature-detail">
                                <p class="home__title game-start__heading">
                                    {{ $t("home.section-feature.title-lbl") }}
                                </p>
                                <p class="text-sub-title-yellow">
                                    {{ $t("home.section-feature.sub-title-lbl") }}
                                </p>
                                <p class="text-info-detail">
                                    <b class="text-bold-yellow">{{
                                            $t("home.section-feature.info-1-hilight-lbl")
                                        }}</b>
                                    {{ $t("home.section-feature.info-1-lbl") }}
                                </p>
                                <!--                                <p class="text-info-detail">-->
                                <!--                                    <b class="text-bold-yellow">{{-->
                                <!--                                            $t("home.section-feature.info-2-hilight-lbl")-->
                                <!--                                        }}</b>-->
                                <!--                                    {{ $t("home.section-feature.info-2-lbl") }}-->
                                <!--                                </p>-->
                                <p class="text-info-detail">
                                    <b class="text-bold-yellow">{{
                                            $t("home.section-feature.info-3-hilight-lbl")
                                        }}</b>
                                    {{ $t("home.section-feature.info-3-lbl") }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- privileges -->
        <div class="home__privilage">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 col-md-12 col-sm-12 get-start-center privileges">
                        <p class="home__title game-start__heading">
                            {{ $t("home.section-privileges.title-lbl") }}
                        </p>
                        <p class="text-sub-title-yellow">
                            {{ $t("home.section-privileges.sub-title-lbl") }}
                        </p>
                        <p class="text-info-detail">
                            <b class="text-bold-yellow">{{
                                    $t("home.section-privileges.info-1-hilight-lbl")
                                }}</b>
                            {{ $t("home.section-privileges.info-1-lbl") }}
                        </p>
                        <p class="text-info-detail">
                            <b class="text-bold-yellow">{{
                                    $t("home.section-privileges.info-3-hilight-lbl")
                                }}</b>
                            {{ $t("home.section-privileges.info-3-lbl") }}
                        </p>
                    </div>
                    <div class="col-lg-6 col-md-12 col-sm-12">
                        <div class="privilage-img">
                            <img class="img-fluid img-home-privilege" src="~@/assets/home/Privileges_yellow.png" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'section-nft-info'
}
</script>

<style lang="scss" scoped>
div.center.feature-detail {
    padding-left: 0 !important;
}

.get-start {
    display: inline;
    float: left;
}

.get-start-center {
    margin: auto;
}

.img-home-start {
    min-height: 422px;
    display: flex;
    object-fit: cover;
    margin-right: auto;
    margin-left: auto;
}

.img-home-feature {
    min-height: 408px;
    display: flex;
    margin-right: auto;
    margin-left: auto;
}

.img-home-privilege {
    min-height: 408px;
    display: flex;
    margin-right: auto;
    margin-left: auto;
}

@media only screen and (max-width: 576px) {
    div.center.feature-detail {
        padding-left: 8px !important;
    }
}

@media only screen and (max-width: 768px) {
    .image-home-start {
        width: 80%;
        margin: auto;
    }
}

@media only screen and (max-width: 992px) {
    div.center.feature-detail {
        padding-left: 0 !important;
    }

    .home__start {
        padding-top: 40px;
    }

    .img-home-start {
        max-width: 300px;
        width: 100%;
        height: auto;
    }

    .img-home-feature {
        max-width: 600px;
        width: 100%;
        height: auto;
    }

    .img-home-privilege{
        max-width: 500px;
        width: 100%;
        height: auto;
    }
}
</style>