<template>
    <div class="section-marketplace">
        <div class="container">
            <div class="row space-between-section">
                <p class="heading-title">{{ $t('home.section-marketplace.title-lbl') }}</p>
                <div class="col-12">
                    <div class="row">
                        <div class="col-sm-4 col-md-3 col-lg-3 sidebar__bg-border">
                            <sidebar-filter-data :categoriesList="categoriesList" :filter="filter" :is_loaded="is_loaded" />
                        </div>
                        <div class="col-sm-8 col-md-9 col-lg-9 d-flex justify-content-center my-auto" v-if="!is_loaded">
                            <div class="spinner-border" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                        <div class="col-sm-8 col-md-9 col-lg-9" v-if="is_loaded">
                            <card-marketplace :marketplaceList="list" />

                            <b-button
                                @click="goToPage('/list')"
                                class="btn-preorder profile view-all__btn"
                                block
                                :hidden="totalList < default_show_card">
                                {{ $t('filter.view-all-btn') }}
                            </b-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SidebarFilterData from "@/components/common/SidebarFilterData";
import CardMarketplace from "@/components/common/CardMarketplace";

export default {
    name: 'section-marketplace',
    components: {
        CardMarketplace,
        SidebarFilterData
    },
    props: {
        list: { type: Array, required: true },
        totalList: { type: Number },
        categoriesList: { type: Array, required: true },
        filter: { type: Object, required: false },
        is_loaded: { type: Boolean, required: false },
    },
    data: function () {
        return {
            default_show_card: 12,
        }
    },
    methods: {
        goToPage(path) {
            // this.$router.push(path);
            this.$router.push({ path: path, query: { type: 'marketplace' } })
        },
    }
}
</script>

<style lang="scss" scoped>
@import '~@/scss/_variables.scss';
@import "~@/scss/filter-data.scss";

.view-all__btn {
    font-weight: 600 !important;
    font-size: 16px !important;
    line-height: 16px !important;
    background-color: $app-background-color !important;
    border: 2px solid $app-theme-color;
    border-radius: 6px !important;
}

.btn-secondary:hover {
    border-color: $app-theme-color;
    background-color: $app-theme-color !important;
}
</style>