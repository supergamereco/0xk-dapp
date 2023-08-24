<template>
    <div id="help-top" class="help-center">
        <div class="row align-items-center bg-image help-center__banner">
            <div class="bg-banner" />
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="header-text">
                            <h1 class="help-center__title-banner">
                                {{ $t("help-center.title-lbl") }}
                            </h1>
                            <h5 class="help-center__sub-title-banner">
                                {{ $t("help-center.sub-title-lbl") }}
                            </h5>
<!--                            <div class="search-section">-->
<!--                                <div class="form-group has-search">-->
<!--                                    <form-->
<!--                                        id="searchForm"-->
<!--                                        method="post"-->
<!--                                        action="#"-->
<!--                                        style="position: relative;"-->
<!--                                    >-->
<!--                                        <span-->
<!--                                            class="iconify form-control-feedback"-->
<!--                                            data-icon="radix-icons:magnifying-glass"-->
<!--                                            data-width="24"-->
<!--                                            data-height="24"-->
<!--                                        ></span>-->
<!--                                        <input-->
<!--                                            type="text"-->
<!--                                            id="form-control-help-center"-->
<!--                                            class="form-control helpcenter"-->
<!--                                            placeholder="Search"-->
<!--                                        />-->
<!--                                    </form>-->
<!--                                </div>-->
<!--                            </div>-->
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <section-card-help-center />
    </div>
</template>

<script>
import SectionCardHelpCenter from "@/components/section/SectionCardHelpCenter.vue";

export default {
    name: "help-center",
    components: { SectionCardHelpCenter },
    
    mounted() {
        this.onTopHelp();
        this.$root.$emit("on-click-to");
    },

    methods: {
        onTopHelp() {
            if (this.$route.path === "/help") {
                var el = document.getElementById("nav-bar-top");
                el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import "~@/scss/_variables.scss";

::placeholder {
    color: $light-2 !important;
    opacity: 1; /* Firefox */
}
:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: $light-2 !important;
}
::-ms-input-placeholder {
    /* Microsoft Edge */
    color: $light-2 !important;
}

.help-center {
    position: relative;
}

.help-center__banner {
    height: 368px;
    /* White */
    background: $app-background-color;
    /* Drop Shadow1 */
    box-shadow: 0px 2px 12px 2px rgba(0, 0, 0, 0.05);
}

.help-center__title-banner {
    text-align: center;
    font-weight: 600;
    font-size: 36px;
    line-height: 32px;
    /* identical to box height, or 89% */
    text-transform: uppercase;
    letter-spacing: 0.08em;
    /* Dark 1 */
    color: $dark-1;
    margin-bottom: 2.5rem;
    word-break: break-word;
}

.help-center__sub-title-banner {
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    /* identical to box height, or 133% */
    text-align: center;
    /* Dark2 */
    color: $dark-2;
    opacity: 0.8;
    //margin-bottom: 2rem;
    word-break: break-word;
}

.bg-banner {
    background: url("~@/assets/help_center/help_center_bg.png");
    position: absolute;
    height: 368px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.form-group.has-search {
    justify-content: center !important;
    width: 56%;
    margin: auto;

    // @media (max-width: 991px) {
    //     width: 75%;
    //     margin: auto;
    // }
}

.has-search .form-control {
    padding-left: 3.175rem;
}

input#form-control-help-center {
    background-color: $light-1 !important;
    border-radius: 16px !important;
    // color: $light-2 !important;
    height: calc(1.5em + 0.75rem + 16px) !important;

    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    opacity: 0.8;
}

.has-search .form-control-feedback {
    position: absolute;
    z-index: 2;
    display: block;
    line-height: 2.375rem;
    text-align: center;
    pointer-events: none;
    color: $light-2;
    top: 28%;
    left: 20px;
}
input.form-control.help-center::placeholder {
    font-weight: 700;
    font-size: 16px;
    color: $light-2;
    opacity: 1;
}

@media (max-width: 991px) {
    .form-group.has-search{
        width: 80%;
    }
}

@media (max-width: 768px) {
    .help-center__title-banner{
        font-size: 33px;
    }
}
</style>
