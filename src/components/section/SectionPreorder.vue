<template>
    <div class="section-preorder" style="padding-top: 50px;">
        <div class="bg_image__preorder container">
            <div class="row" style="margin-bottom: 2rem;">
                <div class="col-sm-12 col-md-9">
                    <p class="section-roadmap__heading">{{ $t('home.title-limited-lbl') }}</p>
                </div>
                <div class="col-sm-12 col-md-3">
                    <p class="view-all__txt" @click="goToPage('/list')" :hidden="totalLimited <= 3">
                        {{ $t('filter.view-all-btn') }}
                    </p>
                </div>
            </div>
            <div class="row">
                <card-pre-order :service="services" />
            </div>
        </div>
    </div>
</template>

<script>
import CardPreOrder from '@/components/common/CardPreOrder.vue';

export default {
    name: "section-preorder",
    components: {
        CardPreOrder
    },
    props: {
      services: { type: Array, required: true },
      totalLimited: { type: Number }
    },
    data: () => ({
        isGameDetail: false
    }),
    mounted() {
      cardSlidePreOrder()
    },
    methods: {
        goToPage(path) {
            // this.$router.push(path);
            this.$router.push({ path: path, query: { type: 'limited' } })
        },
    }
};
</script>

<style lang="scss" scoped>
@import "~@/scss/_variables.scss";
@import "~@/scss/roadmap";

.section-preorder {
  background: $yellow-3;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;  
  padding-top: 6vh;
  padding-bottom: 6.5vh;
}

.view-all__txt {
    cursor: pointer;
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    /* or 140% */
    text-align: right;
    /* Dark1 */
    color: $app-font-color;
    padding: 10px;
}

@media (max-width: 576px) {
    .view-all__txt {
        text-align: center;
    }
}
</style>