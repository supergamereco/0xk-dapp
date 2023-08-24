<template>
    <div class="section-profile">
        <div class="container">
            <div class="row">
                <div class="col-12 profile-title">
                    <h1 class="title-my-profile">{{ $t("my-profile.title") }}</h1>
                </div>
            </div>
            <b-card-text v-show="isProfilePage" style="margin: 0; padding: 0">
                <div class="row">
                    <div class="col-12">
                        <b-tabs class="my-profile" content-class="mt-3" v-model="tabIndex" card>
                            <b-tab :title="$t('my-profile.tab.wishlish')">
                                <div class="row">
                                    <div class="col text-right">
                                        <div class="row filter-my-profile">
                                            <div class="col-12">
                                                {{ $t("my-profile.sort") }}
                                            </div>
                                        </div>
                                        <div class="row justify-content-end">
                                            <div class="col-12" style="display: inline-table;">
                                                <div class="dropdown">
                                                    <b-button class="btn btn-dark dropdown-toggle dropdownMenuLink"
                                                        v-b-toggle.wishlist-sort-collapse>
                                                        {{ wishlist_sort_by_list[wishlist_sort_by].name }}
                                                    </b-button>
                                                    <b-collapse id="wishlist-sort-collapse" class="sort-collapse">
                                                        <b-list-group>
                                                            <b-list-group-item v-for="(value, index) in wishlist_sort_by_list" :key="index"
                                                                @click="doWishlistSortBy(index)">
                                                                {{value.name}}
                                                            </b-list-group-item>
                                                        </b-list-group>
                                                    </b-collapse>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div
                                        :class="openMenu ? 'col-lg-4 col-md-6 col-sm-12 col-custom' : 'col-lg-3 col-md-6 col-sm-12 col-custom'"
                                        v-for="(value, index) in service_my_wish_list"
                                        :key="index"
                                    >
                                        <b-card
                                            class="mb-4 card-wishlist"
                                            style="padding-top: 0 !important"
                                        >
                                            <div class="bg-img" style="position: relative" :style="'background-image: url('+getImgUrl(value.product)+')'">
                                                <!-- <b-card-img
                                                class="img-fluid"
                                                    :src="getImgUrl(value.product)"
                                                    alt="Image"
                                                ></b-card-img> -->
                                                <div class="action-holder">
                                                    <span>
                                                        <img
                                                            src="~@/assets/profile/icon_heart.png"
                                                            style="width: 100%"
                                                            @click="removeWishList(value.product.id,value.id)"
                                                        />


                                                    <!-- <b-button
                                                        class="rounded-circle px-2"
                                                        size="lg"
                                                        @click="removeWishList(value.productId,value.productPriceId)"
                                                    >
                                                        <i
                                                            class="fas fa-heart fa-lg"
                                                            style="color: #F7CA38 !important"
                                                        ></i>
                                                    </b-button> -->
                                                    </span>
                                                </div>
                                                <div class="detail-img">
                                                    <h5
                                                        v-if="value.discount_percent"
                                                        style="position: absolute; max-height: 28px !important; bottom: 48px; right: 0px"
                                                    >
                                                        <b-badge class="tag_inside_img_right">-{{value.discount_percent}}%</b-badge>
                                                    </h5>
                                                    <!-- <h5
                                                        v-if="value.preorder"
                                                        style="position: absolute; max-height: 28px !important; bottom: 12px; right: 0px"
                                                    >
                                                        <b-badge class="tag_inside_img_right">{{
                                                                $t("card-profile.pre-order")
                                                            }}
                                                        </b-badge>
                                                    </h5> -->
                                                </div>
                                            </div>
                                            <b-card-text style="margin-bottom: 0 !important">
                                                <div class="row card-text-wishlist">
                                                    <div class="col-12 card-title">
                                                        {{ value.product.name }}
                                                    </div>
                                                    <!-- <div class="col-1 text-right">
                                                        {{ value.stack }}
                                                    </div> -->
                                                </div>
                                                <div class="row card-text-wishlist" >
                                                    <div v-if="isOpenPreOrder(value.effective_from)" class="col-5 card-end-in">
                                                        {{ $t('card-default-presale.ending-lbl') }}
                                                    </div>
                                                    <div v-else class="col-5 card-start-in">
                                                        {{ $t('card-default-presale.starting-lbl') }}
                                                    </div>
                                                    <div v-if="!isOpenPreOrder(value.effective_to) && value.effective_to > 0" class="col-7 text-right card-end-in-right">
                                                        <countdown :time="getTimeEnd(value.effective_to)">
                                                            <template slot-scope="props">{{ props.days }}D {{ props.hours }}H : {{ props.minutes }}M : {{
                                                                    props.seconds
                                                                }}S
                                                            </template>
                                                        </countdown>
                                                    </div>
                                                    <div v-else class="col-7 text-right card-end-in-right">
                                                        NOW
                                                    </div>

                                                </div>
                                                <div class="row card-text-wishlist">
                                                    <div class="col-6 card-total-sales">
                                                        {{ $t("my-profile.wishlist.total-sales") }}
                                                    </div>
                                                    <p class="col-6 text-right title-medium">
                                                        {{
                                                            $t("my-profile.wishlist.current-total-unit-lbl", {
                                                                current: value.inventory.available, 
                                                                total: value.inventory.quantity
                                                            })
                                                        }}
                                                    </p>
                                                    <div class="col-12">
                                                        <div
                                                            class="progress"
                                                            style="height: 0.6rem !important;"
                                                        >
                                                            <div
                                                                class="progress-bar card-content__progress-bar"
                                                                role="progressbar"
                                                                :style="getStyleProgress(value.inventory.available, value.inventory.quantity)"
                                                                :aria-valuenow="getProgress(value.inventory.available, value.inventory.quantity)"
                                                                aria-valuemin="0"
                                                                aria-valuemax="100"
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="progress-line">
                                                    <hr class="line"/>
                                                </div>
                                            </b-card-text>
                                            <b-card-text>
                                                <div class="row">
                                                    <div class="col-4 text-price card-price">
                                                        {{ $t("my-profile.wishlist.price") }}
                                                    </div>
                                                    <div class="col-8 text-price text-right price-bot">
                                                        <p style="display: inline-flex; margin-bottom: 0">
                                                            {{ value.unit_price }} {{ value.currency.name }}&nbsp;
                                                          <b-img
                                                            center
                                                            :src="getImgCurrencyUrl(value.currency.image_url)"
                                                            class="currency-price"
                                                            alt=""
                                                        ></b-img>
                                                        </p>
                                                    </div>
                                                </div>
                                            </b-card-text>
                                        </b-card>

                                        <!-- on top-->
                                        <button class="pagetop" style="z-index: 2" v-show="scY > 300" @click="toTop">
                                            <img class="btn-pagetop-img" :src="require('@/assets/profile/btn-gototop.svg')" loading="lazy">
                                        </button>
                                    </div>
                                </div>
                            </b-tab>
                            <b-tab :title="$t('my-profile.tab.activity')">
                                <div class="row">
                                    <div id="activity-filter" class="col-8">
                                        <div class="row filter-my-profile">
                                            <div class="col-12">
                                                {{ $t("my-profile.filter-by") }}
                                            </div>
                                        </div>
                                        <div id="filter-top" class="row justify-content-end">
                                            <div class="col-12">
                                                <a :class="isFilterAll ? 'btn-filter-active' : 'btn-filter'" @click="filterData(0)">
                                                    <span
                                                    style="width: 84px; height: 38px; cursor: pointer;">{{ $t("my-profile.filter.all") }}</span></a>
                                                <a :class="isFilterBuy ? 'btn-filter-active' : 'btn-filter'" @click="filterData(2)">
                                                    <span style="width: 84px; height: 38px; cursor: pointer;">{{ $t("my-profile.filter.buy") }}</span></a>
<!--                                                <a :class="isFilterClaim ? 'btn-filter-active' : 'btn-filter'" @click="filterData(2)">-->
<!--                                                    <span style="width: 134px; height: 38px; cursor: pointer;">{{ $t("my-profile.filter.claim") }}</span></a>-->
                                                <a :class="isFilterRedeem ? 'btn-filter-active' : 'btn-filter'" @click="filterData(3)">
                                                    <span style="width: 134px; height: 38px; cursor: pointer;">{{ $t("my-profile.filter.redeem") }}</span></a>
                                            </div>
                                        </div>
                                        <div class="row custom-dropdown-filter">
                                            <div class="col-12">
                                                <div class="dropdown">
                                                    <a
                                                        class="btn btn-dark dropdown-toggle dropdownMenuLink filter"
                                                        role="button"
                                                        id="dropdownMenuFilter"
                                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                                    >
                                                        {{ $t("redeem.history.filter-text") }}
                                                    </a>

                                                    <ul
                                                        class="dropdown-menu"
                                                        aria-labelledby="dropdownMenuFilter"
                                                    >
                                                        <li><a class="dropdown-item dropdown-filter" @click="filterData(0)">
                                                            {{ $t("my-profile.filter.all") }}</a></li>
                                                        <li><a class="dropdown-item dropdown-filter" @click="filterData(2)">
                                                            {{ $t("my-profile.filter.buy") }}</a></li>
<!--                                                        <li><a class="dropdown-item dropdown-filter" @click="filterData(2)">-->
<!--                                                            {{ $t("my-profile.filter.claim") }}</a></li>-->
                                                        <li><a class="dropdown-item dropdown-filter" @click="filterData(3)">
                                                            {{ $t("my-profile.filter.redeem") }}</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="activity-filter" class="col-4 text-right">
                                        <div class="row filter-my-profile">
                                            <div class="col-12">
                                                {{ $t("my-profile.sort") }}
                                            </div>
                                        </div>
                                        <div class="row justify-content-end">
                                            <div class="col-12" style="display: inline-table;">
                                                <div class="dropdown">
                                                    <b-button class="btn btn-dark dropdown-toggle dropdownMenuLink"
                                                        v-b-toggle.activity-sort-collapse>
                                                        {{ activity_sort_by_list[activity_sort_by].name }}
                                                    </b-button>
                                                    <b-collapse id="activity-sort-collapse" class="sort-collapse">
                                                        <b-list-group>
                                                            <b-list-group-item v-for="(value, index) in activity_sort_by_list" :key="index"
                                                                @click="doActivitySortBy(index)">
                                                                {{value.name}}
                                                            </b-list-group-item>
                                                        </b-list-group>
                                                    </b-collapse>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="activity-list">
                                    <div
                                        class="row activity-row"
                                        v-for="(value, index) in service_activity.list"
                                        :key="index"
                                        :class="
                                        index == service_activity.length - 1
                                        ? 'activity-no-border'
                                        : ''
                                    "
                                    >
                                        <div id="badge-status" class="col-lg-2 col-md-6 col-sm-12 m-auto"
                                            style="text-align:center;">
                                        <span
                                            class="badge badge-pill"
                                            style="
                                            padding-top: 9px !important;
                                            font-size: 16px !important;
                                            font-weight: 700 !important;
                                        "
                                        :class="getBadge(value.status)"
                                        >
                                            {{ getStatus(value.status) }}
                                        </span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-12 swap-col">
                                            <div class="row">
                                                <div class="col-12 text-col">
                                                    {{ getWalletFromTo(value.from )}}
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-12 text-grey">
                                                    {{ $t("my-profile.activity.from") }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-12 swap-col">
                                            <div class="row">
                                                <div class="col-12 text-col">
                                                    {{ getWalletFromTo(value.to) }}
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-12 text-grey">
                                                    {{ $t("my-profile.activity.to") }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-6 col-sm-12 swap-col">
                                            <div class="row">
                                                <div class="col-12 text-col">
                                                    {{ getPrice(value.price) }} {{ value.currency }}
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-12 text-grey">
                                                    {{ $t("my-profile.activity.price") }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-6 col-sm-12 swap-col">
                                            <div class="row">
                                                <div class="col-12 text-col">
                                                    {{ getTimeDiff(value.date) }}
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-12 text-grey">
                                                    {{ $t("my-profile.activity.date") }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row text-center pagination" v-if="Object.keys(service_activity).length != 0">
                                    <p class="mt-3">
                                        <i
                                            class="fas fa-arrow-left"
                                            style="cursor:pointer;"
                                            :class="service_activity.current_page == 1 || service_activity.current_page == 0 ? 'disable_prev_page': 'arrow-enable'"
                                            @click="prevActivityPage"
                                        ></i>
                                        <span style="color:#4A525F; margin-left:29px; margin-right:29px">Page {{service_activity.current_page}} of {{service_activity.total_page}}</span>
                                        <i
                                            class="fas fa-arrow-right"
                                            style="cursor:pointer;"
                                            :class="service_activity.current_page == service_activity.total_page ? 'disable_next_page': 'arrow-enable'"
                                            @click="nextActivityPage"
                                        >
                                        </i>
                                    </p>
                                </div>
                                <!-- on top-->
                                <button class="pagetop" style="z-index: 2" v-show="scY > 300" @click="toTop">
                                    <img class="btn-pagetop-img" :src="require('@/assets/profile/btn-gototop.svg')" loading="lazy">
                                </button>
                            </b-tab>
                        </b-tabs>
                    </div>
                </div>
            </b-card-text>
            <div v-show="isClaimList" class="section-claim-list-profile">
                <div class="row">
                    <div class="col-md-12">
                        <div class="breadcrumb-custom">
                            <span @click="goBack()" style="font-size : 16px !important; cursor: pointer"
                                class="text-link">{{ $t('profile-list-claim.my-collection') }} <span
                                class="dot">.</span></span>
                            <span style="font-size : 16px !important;"
                                class="text-link"> {{ $t('profile-list-claim.product-name') }}<span
                                class="dot">.</span> </span>
                            <span style="font-size : 16px !important;"
                                class="text-link active"> {{ $t('profile-list-claim.claimable-list-all') }}</span>
                        </div>
                    </div>
                </div>
                <datatable-selection
                    :claim="true"
                    :btn="btn_claim_section"
                    :digital_content="content_claim"
                    :type="actionTypeClaim"
                    :dataList="services_collection"
                    :is_redeem="false"
                />
            </div>
            <div v-show="isRedeemList" class="section-redeem-list-profile">
                <div class="row">
                    <div class="col-md-12">
                        <div class="breadcrumb-custom">
                            <span @click="goBack()" style="font-size : 16px !important; cursor: pointer" class="text-link">{{
                                    $t('profile-list-claim.my-collection')
                                }} <span
                                    class="dot">.</span></span>
                            <span class="text-link"> {{ $t('redeem-list.redeemable') }} <span
                                class="dot">.</span></span>
                            <span class="text-link"> {{ $t('common.products') }} <span class="dot">.</span> </span>
                            <span class="text-link active"> {{ $t('redeem-list.redeemable-list-all') }} </span>
                        </div>
                    </div>
                </div>
                <datatable-selection
                    :claim="false"
                    :btn="btn_redeem_section"
                    :digital_content="content_redeem"
                    :type="actionTypeRedeem"
                    :dataList="services_collection"
                    :is_redeem="true"
                />
            </div>
        </div>
    </div>
</template>

<script>
import {vuexTypes} from '@/store/modules/types'
import {mapActions} from 'vuex'
import datatableSelection from '@/components/common/DatatableSelection.vue';
import {getContractActivity, timeDifference} from "@/common/core"

//data
import ServiceFilter from "@/data/ServiceFilter.json";
import ServiceProfile from '@/data/ServiceProfile.json'
import moment from "moment";

export default {
    name: "section-profile",
    components: {
        datatableSelection
    },
    created: function () {
        if (this.$route.params.action && this.$route.params.action === "wishlist") {
            this.tabIndex = 0
        }
        this.isFilterAll = true;

        for (let i = 0; i < this.wishlist_sort_by_list.length; i++) {
            if (this.wishlist_sort_by == '' && this.wishlist_sort_by_list[i].checked) {
                this.wishlist_sort_by = i
            }
        }
        for (let i = 0; i < this.activity_sort_by_list.length; i++) {
            if (this.activity_sort_by == '' && this.activity_sort_by_list[i].checked) {
                this.activity_sort_by = i
            }
        }
    },
    props: {
        services_collection: {required: false},
        service_my_wish_list: {type: Array, required: false},
        service_activity: {required: false},
        openMenu: {required: false},
    },
    data: () => {
        return {
            pageList: "",
            actionTypeClaim: "Claim",
            actionTypeRedeem: "Redeem",
            isProfilePage: true,
            scY: ServiceProfile.scY,
            tabIndex: 0,
            typeFilter: 0,
            isClaimList: false,
            isRedeemList: false,
            isFilterAll: false,
            isFilterBuy: false,
            isFilterRedeem: false,
            isFilterClaim: false,
            btn_claim_section: "Claim",
            content_claim: "Claimable",
            btn_redeem_section: "Redeem",
            content_redeem: "Redeemable",
            wallet_address_to: "",
            wallet_address_from: "",
            type: "physical",
            badge_list: [
                {status: 2, class: "green-custom", type : "buy"},
                {status: 1, class: "blue-custom", type : "claim"},
                {status: 3, class: "red-custom",  type : "redeem"},
            ],
            wishlist_sort_by_list: ServiceFilter.wishlist_sort_by_list,
            activity_sort_by_list: ServiceFilter.activity_sort_by_list,
            wishlist_sort_by: '',
            activity_sort_by: ''
        };
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
        this.$root.$on("on-click-tab-profile", (tabNumber) => {
            this.isClaimList = false;
            this.isRedeemList = false;
            this.isProfilePage = true;
            this.tabIndex = tabNumber;
        });
    },
    methods: {
        ...mapActions({
            ncmMyWishList: vuexTypes.NCM_API_PRODUCT_WISHLIST,
        }),
        getBadge(status) {
            let index = this.badge_list.findIndex((badge) => badge.status === status);
            return "badge-" + this.badge_list[index].class;
        },
        getWalletFromTo(wallet) {
            return wallet == '' ? '-' : getContractActivity(wallet)
        },
        getPrice(value) {
            return typeof(value) == 'object' ? '-' : value
        },
        getProgress(currentUnit,totalUnit) {
            return (currentUnit/totalUnit) * 100
        },
        getStyleProgress(currentUnit,totalUnit){
            return 'width: ' + this.getProgress(currentUnit,totalUnit) + "%"
        },
        filterData(type) {
            this.$root.$emit("filter-activity", type, this.activity_sort_by);
            this.isFilterAll = false;
            this.isFilterBuy = false;
            this.isFilterRedeem = false;
            this.isFilterClaim = false;
            this.typeFilter = type

            switch (type) {
                case 1:
                    this.isFilterClaim = true;
                    break;
                case 2:
                    this.isFilterBuy = true;
                    break;
                case 3:
                    this.isFilterRedeem = true;
                    break;
                default :
                    this.isFilterAll = true;
            }
        },
        async removeWishList(productId,productPriceId) {
            await this.ncmMyWishList({
                'productId': productId,
                'productPriceId': productPriceId,
                'remove': true
            })
            this.$root.$emit('update-wishlist');
        },
        goBack() {
            this.isClaimList = false;
            this.isRedeemList = false;
            this.isProfilePage = true;
        },
        showClaimList() {
            this.isProfilePage = false;
            this.isRedeemList = false;
            this.isClaimList = true;
        },
        showRedeemList() {
            this.isProfilePage = false;
            this.isClaimList = false;
            this.isRedeemList = true;
        },
        handleScroll: function () {
            if (this.scTimer) return;
            this.scTimer = setTimeout(() => {
                this.scY = window.scrollY;
                clearTimeout(this.scTimer);
                this.scTimer = 0;
            }, 100);
        },
        toTop: function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        },
        getImgUrl(value) {
            let image_url = '';
            if (value.media) {
                for (var i = 0; i < value.media.length; i++) {
                    if (image_url == '' && value.media[i].media_type.name == 'image') {
                        image_url = value.media[i].media_url;
                    }
                }
            }
            return process.env.VUE_APP_URL_MEDIA + image_url;
        },
        getImgCurrencyUrl(image_url) {
            return process.env.VUE_APP_URL_MEDIA + image_url;
        },
        switchText(isClaim) {
          return (isClaim) ? this.$t('card-profile.claimable-in') : this.$t('card-profile.redeemable-in')
        },
        getStatus(status) {
            let index = this.badge_list.findIndex((activity) => activity.status === status);
            let strStatus = 'my-profile.activity.' + this.badge_list[index].type + "-status"
            return this.$t(strStatus)
        },
        prevPage() {
            if(this.services_collection.current_page ==  1) return;
            this.$root.$emit('change-page', 2, this.services_collection.current_page - 1);
        },
        nextPage() {
            if(this.services_collection.current_page ==  this.services_collection.total_page) return;
            this.$root.$emit('change-page', 2, this.services_collection.current_page + 1);
        },
        prevActivityPage() {
            if(this.service_activity.current_page ==  1) return;
            this.$root.$emit('change-page-activity', this.service_activity.current_page - 1, this.typeFilter, this.activity_sort_by);
        },
        nextActivityPage() {
            if(this.service_activity.current_page ==  this.service_activity.total_page) return;
            this.$root.$emit('change-page-activity', this.service_activity.current_page + 1, this.typeFilter, this.activity_sort_by);
        },
        isOpenPreOrder(time) {
            return moment() >= moment.unix(time);
        },
        getTimeEnd(time) {
            const fromTime = moment();
            const toTime = moment.unix(time);
            if(fromTime < toTime){
                const ms = toTime.diff(fromTime);
                const d = moment.duration(ms);
                return d.asMilliseconds();
            }
            return 0;
        },
        getTimeOpenAndEnd(start,end) {
            let dateStart =  moment.unix(start).format("Do MMM HHA");
            let dateEnd =  moment.unix(end).format("Do MMM HHA");
            return dateStart.toUpperCase()+'UTC - '+dateEnd.toUpperCase()+' UTC';
        },
        getTimeDiff(previous){
            return timeDifference(previous)
        },
        doWishlistSortBy(index) {
            this.wishlist_sort_by = index
            this.$root.$emit('bv::toggle::collapse', 'wishlist-sort-collapse')
            this.$root.$emit("load-wishlist", index, this.typeFilter)
        },
        doActivitySortBy(index) {
            this.activity_sort_by = index
            this.$root.$emit('bv::toggle::collapse', 'activity-sort-collapse')
            this.$root.$emit("load-activity", index, this.typeFilter)
        }
    },
};
</script>

<style lang="scss" scoped>
@import "~@/scss/_variables.scss";
@import "~@/scss/card-profile";

.dropdown-filter {
    cursor: pointer;
}

.disabled-link {
    pointer-events: none;
}

div.profile-title h1.title-my-profile {
    color: $dark-1;
    font-weight: 700;
    font-size: 32px;
    line-height: 44px;
}

.col-12.profile-title {
    letter-spacing: 0.16em;
    text-transform: uppercase;
    margin-top: 4rem;
}

.text-grey {
    color: $dark-2;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
}

.card-text {
    margin-top: 1rem;
}


.card-body {
    margin: 0;
}

.badge {
    padding: 6px;
}

.activity-list {
    color: #ffffff;
    border-radius: 16px;
    padding: 0 15px;
    margin-top: 20px;
    background-color: $light-1 !important;
}

.activity-list .badge {
    min-width: 90px;
    min-height: 34px;
}

.tab-pane article {
    pad: 20px;
}

.col-auto {
    background-color: #2b2b3e !important;
}

.tabs .tab-content {
    background-color: #1b1b21 !important;
    padding: 36px !important;
}

.activity-row {
    border-bottom: 1px solid $light-2;
    padding: 20px 0;
}

.activity-no-border {
    border-bottom: none !important;
}

.badge {
    padding-left: 4px !important;
    padding-right: 4px !important;
    padding-top: 5px !important;
    padding-bottom: 4px !important;
}


div.tabs.my-profile .card-header {
    padding-left: 10px !important;
}


div.tabs.my-profile div ul li.nav-item .nav-link {
    padding-left: 0;
    padding-right: 0;
    margin-right: 50px;
    letter-spacing: 5px;
    font-size: 24px !important;
    font-weight: 600;
}

.row.card-text-wishlist {
    line-height: 32px;
    font-size: 14px !important;
}

.action-holder {
    cursor: pointer;
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 0;
}

.btn.rounded-circle.px-2.btn-secondary.btn-lg {
    width: 48px !important;
    height: 48px !important;
    background-color: $light-2 !important;
    border: none;
    box-shadow: none !important;
    opacity: 0.4;
    border: 1px solid #C8D3D7;
}

i.fas.fa-heart.fa-lg {
    margin-top: 0.45rem;
}

.btn-primary.btn-block.disabled {
    background: #525252;
}

div.progress-line hr.line {
    margin-top: 0 !important;
}

.badge-green-custom {
    color: $white-bg;
    background-color: #71bb69;
}

.badge-red-custom {
    color: $white-bg;
    background-color: #d66463;
}

.badge-blue-custom {
    color: $white-bg;
    background-color: #51bcbc;
}

.text-col {
    color: $dark-1;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
}

div.swap-col {
    margin: auto;
    word-break: break-word;
}

@media only screen and (max-width: 991px) {
    div.swap-col {
        margin: initial;
    }

}

@media only screen and (max-width: 768px) {

    div#badge-status {
        text-align: unset !important;
        margin-bottom: 20px !important;
    }
    .activity-list .badge {
        width: unset;
    }
    .activity-list {
        text-align: left !important;
    }

    div.swap-col {
        display: flex;
        flex-direction: column-reverse;
    }

    div.tabs.my-profile div ul li.nav-item .nav-link {
        font-size: 22px !important;
    }

}

span.dot {
    font-size: 3rem;
    margin-left: 0.75rem;
    margin-right: 0.75rem;
}

.row.justify-content-end.button {
    margin-top: 0.5rem;
}

img.currency-price.mx-auto.d-block {
    width: 24px;
    height: 24px;
}

.card-content__progress-bar {
  background-color: $yellow;
}

.card-end-in,
.card-start-in,
.card-total-sales {
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    color: $light-grey-2;
    margin: 10px 0px;
    word-wrap: break-word;
}

.card-end-in-right {
    word-wrap: break-word;
    margin: 10px 0px;
    color: #4A525F !important;
    line-height: 22px;
    text-transform: none !important;
    padding: 0 15px 0 0;

    @media (max-width: 320px) {
        padding: 0 3px 0 0;
    }
}

p.title-medium {
    margin: 10px 0px;

    @media (max-width: 320px) {
        padding: 0 3px 0 0;
    }
}

.sort-collapse {
    position: absolute;
    z-index: 10;
    right: 0;
    text-align: left;
    font-weight: 600;
    font-size: 16px;
    line-height: 16px;
}

.sort-collapse .list-group-item {
    cursor: pointer;
}
</style>
