<template>
    <div class="sidebar-filter-data">
        <p class="header">{{ $t('filter.filter-lbl') }}</p>
        <div class="accordion">
            <div class="row filter-category">
                <p class="title-filter collapse-change" data-toggle="collapse" data-target="#collapseCategory" aria-controls="collapseCategory">
                    {{ $t('filter.category-lbl') }}
                </p>
                <div id="collapseCategory" class="collapse show" aria-labelledby="category">
                    <div class="row detail-filter__space">
                        <div class="col-9">
                            <label class="form-check-label detail-filter">All</label>
                        </div>
                        <div class="col-3 text-right">
                            <input class="form-check-input detail-checked" 
                                v-model="select_all_category" @click="selectAllCategory(true)" type="checkbox" 
                                :checked="select_all_category" :disabled="!is_loaded">
                        </div>
                    </div>
                    <div class="row detail-filter__space" v-for="(value, index) in categoriesList" :key="index">
                        <div class="col-9">
                            <label class="form-check-label detail-filter">{{ value.name }}</label>
                        </div>
                        <div class="col-3 text-right">
                            <input class="form-check-input detail-checked" type="checkbox" 
                                v-model="filter.categories" :value="value" :checked="isChecked(value.id)" @change="doFilter($event)" :disabled="!is_loaded">
                        </div>
                    </div>
                </div>
            </div>

            <!-- <div class="row filter-status mt-1">
                <p class="title-filter collapse-change" data-toggle="collapse" data-target="#collapseStatus" aria-controls="collapseStatus">
                    {{ $t('filter.status-lbl') }}
                </p>
                <div id="collapseStatus" class="collapse show" aria-labelledby="status">
                    <div class="row detail-filter__space" v-for="(value, index) in status_list" :key="index">
                        <div class="col-9">
                            <label class="form-check-label detail-filter">{{ value.name }}</label>
                        </div>
                        <div class="col-3 text-right">
                            <input class="form-check-input detail-checked" type="checkbox" :value="index" :checked="value.checked">
                        </div>
                    </div>
                </div>
            </div> -->

            <div class="row filter-sort-by mt-1">
                <p class="title-filter collapse-change" data-toggle="collapse" data-target="#collapseSortBy" aria-controls="collapseSortBy">
                    {{ $t('filter.sort-by-lbl') }}
                </p>
                <div id="collapseSortBy" class="collapse show" aria-labelledby="sortBy">
                    <div class="row detail-filter__space" v-for="(value, index) in sort_by_list" :key="index">
                        <div class="col-9">
                            <label class="form-check-label detail-filter">{{ value.name }}</label>
                        </div>
                        <div class="col-3 text-right">
                            <input class="form-check-input detail-checked" name="sortBy" type="radio" 
                                v-model="filter.order" @change="doFilter($event)" :value="index" :checked="index == filter.order" :disabled="!is_loaded">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ServiceFilter from "@/data/ServiceFilter.json";

export default {
    name: 'sidebar-filter-data',
    props: {
        categoriesList: { type: Array, required: false },
        filter: { type: Object, required: false },
        is_loaded: { type: Boolean, required: false },
    },
    data: function () {
        return {
            // status_list: ServiceFilter.status_list,
            sort_by_list: ServiceFilter.sort_by_list,
            select_all_category: true
        }
    },
    methods: {
        selectAllCategory(do_filter) {
            if (this.select_all_category == false) {
                this.filter.categories = this.categoriesList

                if (do_filter == true) {
                    this.doFilter()
                }
            } else {
                this.filter.categories = []
            }
        },
        doFilter() {
            this.$root.$emit('doFilter', this.filter)
        },
        async isChecked(category_id) {
            let result = false
            for (var i = 0; i < this.filter.categories.length; i++) {
                if (category_id == this.filter.categories[i].id) {
                    result = true
                }
            }
            return result
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~@/scss/_variables.scss';

p.header {
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    /* or 133% */
    /* Dark1 */
    color: $app-font-color;
}

.title-filter {
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    /* or 150% */
    /* Dark1 */
    color: $app-font-color;
}

.detail-filter {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    /* or 150% */
    /* Dark1 */
    color: $app-font-color;
}

.detail-filter__space {
    margin-bottom: 1rem;
}

.detail-checked {

}

.form-check-input[type=checkbox]:checked {
    /* White */
    background: $app-background-color;
    /* Yellowe */
    border: 2px solid $app-theme-color;
    border-radius: 2px;
}

.form-check-input {
    border: 2px solid $app-theme-color;
}

.form-check-input:checked,
.form-check-input:focus,
.form-check-input[type=checkbox]:checked:focus {
    border-color: $app-theme-color;
    background-color: transparent;
}

.form-check-input:focus:before,
.form-check-input:checked:focus:before {
    box-shadow: none;
}

.form-check-input[type=checkbox]:checked:after {
    display: block;
    transform: rotate(45deg) /*!rtl:ignore*/;
    width: .375rem;
    height: .8125rem;
    border: .125rem solid $app-theme-color;
    border-top: 0;
    border-left: 0 /*!rtl:ignore*/;
    margin-left: .25rem;
    margin-top: -1px;
    background-color: transparent;
}

.form-check-input[type=radio]:checked:after {
    background-color: $app-theme-color;
    border-color: $app-theme-color;
}

.form-check-input:checked:focus {
    border-color: $app-theme-color;
}

.title-filter.collapse-change:after {
    font-family: Font Awesome\ 5 Pro,Font Awesome\ 5 Free;
    content: "\f077";
    float: right;
}

.title-filter.collapse-change.collapsed:after {
    content: "\f078";
}
</style>