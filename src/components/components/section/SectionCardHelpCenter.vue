<template>
    <div class="section-card-help-center">
        <div class="container" style="margin-top: 60px;">
            <div class="row card-help-center__card-list">
                <div class="col-lg-4 col-md-6 col-sm-12 d-flex align-items-stretch" v-for="(value, idx) in $t('help-center.card-list')" :key="idx">
                    <div class="card" style="width: 100%">
                        <b-link :href="value.url" :disabled="value.txt !== ''" class="custom-m-text">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">{{ value.title }}</h5>
                                <p class="card-detail">{{ value.detail }}</p>
                                <p class="card-detail" :style="value.txt !== '' ? 'display: block; font-weight: bold;' : 'display: none;'">{{ value.txt }}</p>
                            </div>
                        </b-link>
                    </div>
                </div>
            </div>
            <div class="row card-help-center__promoted-articles" style="margin: 60px 0">
                <div class="col-12">
                    <h1 class="promoted-articles__title">{{ $t('help-center.header-help-lbl') }}</h1>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12" v-for="(value, idx) in $t('help-center.promoted-articles-list')" :key="idx">
                    <h5 class="promoted-articles__detail">{{ value.title }}</h5>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: "section-card-help-center",
};
</script>

<style lang="scss" scoped>
@import '~@/scss/_variables.scss';

.section-card-help-center {
    background: $app-background-color;
}

.card {
    margin-bottom: 25px;
    background: #FCFCFC;
    /* Light1 */
    border: 1px solid #F0F1F3;
    /* Drop Shadow1 */
    box-shadow: 0px 2px 12px 2px rgba(0, 0, 0, 0.05);
    border-radius: 18px;
}

.card-title {
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
    /* or 133% */
    text-align: center;
    /* Light Grey 1 */
    color: $app-font-color;
    word-break: break-word;
}

.card-detail {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    /* or 150% */
    text-align: center;
    /* Dark2 */
    color: $dark-2;
}

.promoted-articles__title {
    margin-bottom: 50px;
    font-weight: 700;
    font-size: 32px;
    line-height: 44px;
    /* identical to box height, or 138% */
    /* Dark1 */
    color: $app-font-color;
}

.promoted-articles__detail {
    margin-bottom: 60px;
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
    /* identical to box height, or 133% */
    /* Dark1 */
    color: $app-font-color;
}

a.disabled {
    pointer-events: none;
}
.custom-m-text {
    margin: auto;
}
</style>
