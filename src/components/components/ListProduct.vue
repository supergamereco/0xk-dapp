<template>
    <div class="list-product">
        <div class="container">
            <div class="row space-between-section">
                <p class="heading-title" v-if="queryParams.type === 'limited'">{{ $t('product-list.limited-lbl') }}</p>
                <p class="heading-title" v-else>{{ $t('product-list.marketplace-lbl') }}</p>

                <div class="row list-product__navigation">
                    <span class="list-product__navigation-highlight">
                        <b-link href="/" class="list-product__navigation-back">{{ $t("product-list.home-navigation-lbl") }}</b-link>
                        &nbsp;&nbsp;
                        <i class="fas fa-circle fa-xs fa-center circle-icon"></i>
                        &nbsp; {{ (queryParams.type === 'limited') ? $t("product-list.limited-navigation-lbl") : $t("product-list.marketplace-navigation-lbl") }}
                    </span>
                </div>

                <div class="col-12">
                    <div class="row">
                        <div class="col-sm-6 col-md-3 col-lg-3 sidebar__bg-border">
                            <sidebar-filter-data :categoriesList="categoriesList" :filter="filter" :is_loaded="is_loaded" />
                        </div>
                        <div class="col-sm-6 col-md-9 col-lg-9" v-if="queryParams.type === 'limited'">
                            <card-limited :limitedList="limitedList" />
                        </div>
                        <div class="col-sm-6 col-md-9 col-lg-9" v-else>
                            <div class="d-flex justify-content-center spinner-load-more" v-if="!is_loaded">
                                <div class="spinner-border my-auto" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>

                            <card-marketplace :marketplaceList="nftMarketplaceList" />
                            <b-button
                                @click="loadMore()"
                                class="btn-preorder profile view-all__btn"
                                block v-if="is_loaded">
                                {{ $t('product-list.load-more') }}
                            </b-button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CardMarketplace from "@/components/common/CardMarketplace";
import SidebarFilterData from "@/components/common/SidebarFilterData";
import ServiceHomeGameInfo from "@/data/ServiceHomeGameInfo.json";
import CardLimited from "@/components/common/CardLimited";
import { api } from "@/js/api/api.js";

export default {
    name: 'list-product',
    components: {
        CardLimited,
        CardMarketplace,
        SidebarFilterData
    },
    data: function () {
        return {
            limitedList: ServiceHomeGameInfo.preorder,
            queryParams: this.$route.query,
            nftMarketplaceList: [],
            productLimit: 12,
            productPage: 1,
            categoriesList: [],
            filter: {
                categories: [],
                order: 0
            },
            is_loaded: false
        }
    },
    async created() {
        this.$root.$on('doFilter', (filter) => {
            this.filter = filter
            this.productPage = 1
            // this.nftMarketplaceList = []
            this.getNftMarketplaceList(true)
        })

        await this.initLoad()
    },
    methods: {
        async initLoad() {
            await this.getCategoriesList()
            const result = await this.getNftMarketplaceList(false)
            if (result !== false) {
                for (var j = 0; j < result.length; j++) {
                    this.nftMarketplaceList.push(result[j])
                }
            }
        },
        async getCategoriesList() {
            const result = await api.get(process.env.VUE_APP_API_URL + '/category')
            this.categoriesList = result.data.data
            this.filter.categories = result.data.data
        },
        async getNftMarketplaceList(is_filter) {
            /* eslint-disable no-console */
            let url = process.env.VUE_APP_API_URL + '/product_price?page=' + this.productPage + '&limit=' + this.productLimit

            if (typeof this.filter.order != 'undefined') {
                url += '&order=' + this.filter.order
            }
            if (typeof this.filter.categories != 'undefined' && this.filter.categories.length > 0) {
                url += '&category='

                for (var i = 0; i < this.filter.categories.length; i++) {
                    url += this.filter.categories[i].id

                    if (i < (this.filter.categories.length-1)) {
                        url += ','
                    }
                }
            }

            

            try {
                this.is_loaded = false
                const result = await api.get(url)
                this.is_loaded = true

                if (is_filter) {
                    this.nftMarketplaceList = result.data.data.list
                }

                return result.data.data.list
            } catch (e) {
                this.is_loaded = true

                return false
            }
        },
        async loadMore() {
            /* eslint-disable no-console */
            try {
                this.productPage++
                const result = await this.getNftMarketplaceList(false)
                if (result === false) {
                    this.productPage--
                } else {
                    if (result.length > 0) {
                        for (var j = 0; j < result.length; j++) {
                            this.nftMarketplaceList.push(result[j])
                        }
                    }
                }
            } catch (e) {
                this.productPage--
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/scss/filter-data.scss";

.heading-title {
    margin-bottom: 1.5rem;
}

.list-product__navigation {
    margin-bottom: 2rem;
}

.list-product__navigation-back {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    /* or 150% */
    align-items: center;
    /* Dark2 */
    color: #888E97;
}

.circle-icon {
    /* Light 2 */
    color: #C8D3D7;
    font-size: 4px;
}

.list-product__navigation-highlight {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    /* or 150% */
    display: flex;
    align-items: center;
    /* Yellowe */
    color: #F7CA38;
}

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

.spinner-load-more {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: black;
    opacity: 0.3;
}
</style>