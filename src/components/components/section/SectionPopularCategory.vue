<template>
    <div class="section-popular-category">
        <div class="container">
            <div class="row space-between-section">
                <p class="heading-title">{{ $t('home.section-popular-category.title-lbl') }}</p>
                <div class="col-md-3" style="text-align: center;" v-for="(value, index) in categoriesList" :key="index">
                    <img :src="getImgHomeUrl(value.image)" class="img-fluid popular-category__image" />
                    <p class="popular-category__name">{{ value.name }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'section-popular-category',
    props: {
        categoriesList: { type: Array, required: true },
    },
    methods: {
        getImgHomeUrl(image_url) {
            return process.env.VUE_APP_URL_MEDIA + image_url;
        },
    }
}
</script>

<style lang="scss" scoped>
@import '~@/scss/_variables.scss';

.popular-category__image {
    max-width: 80px;
}

.popular-category__name {
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
    /* identical to box height, or 133% */
    text-align: center;
    /* Dark1 */
    color: $app-font-color;
    margin-top: 1rem;
}
</style>