<template>
  <div class="section-redeem">
    <div class="container">
      <div class="row">
            <div class="col-12 title">
                <h1 class="title">{{ $t("redeem.title") }}</h1>
            </div>
      </div>
      <b-card-text v-show="isRedeemPage" style="margin: 0; padding: 0;">
        <div class="row">
          <div class="col-12">
            <b-tabs class="my-profile" content-class="mt-3" card>
              <b-tab class="tab-list" :title="$t('redeem.tab.redeemable')" active>
                <div class="row">
                  <div class="col-12 text-right">
                    <div class="row filter-my-profile">
                      <div class="col-12">{{ $t("redeem.sort") }}</div>
                    </div>
                    <div class="row justify-content-end">
                      <div class="col-12" style="display: inline-table;">
                      <div class="dropdown">
                          <b-button class="btn btn-dark dropdown-toggle dropdownMenuLink"
                              v-b-toggle.redeemable-sort-collapse>
                              {{ redeemable_sort_by_list[redeemable_sort_by].name }}
                          </b-button>
                          <b-collapse id="redeemable-sort-collapse" class="sort-collapse">
                              <b-list-group>
                                  <b-list-group-item v-for="(value, index) in redeemable_sort_by_list" :key="index"
                                      @click="doRedeemableSortBy(index)">
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
                    v-for="(value, idx) in service_redeem_cards.list"
                    :key="idx"
                  >
                    <div class="card-content">
                      <b-card
                        class="mb-4 card-collection"
                        style="padding-top: 0 !important"
                      >
                        <card-profile
                          :image="value.image"
                          :stack="value.stack"
                          :title="value.title"
                          :info="value.info"
                          :gift="value.gift"
                          :discount="value.discount"
                          :preorder="value.preorder"
                          :claim_in="value.claim_in"
                          :price="value.price"
                          :currency="value.currency"
                          :status_name="$t('card-profile.redeemable-in')"
                          :is_claim="false"
                          :product_id="value.product_id"
                          :publisher="value.publisher"
                        />
                        <b-button
                        id="sec-claim-btn"
                          variant="primary"
                          v-if="value.is_claim"
                          class="button-hilight btn-preorder profile"
                          block
                          @click="IsShowRedeemlist"
                          >
                          {{ $t('card-profile.claimable-btn') }}
                        </b-button>
                        <b-button
                            else
                            id="sec-redeem-btn"
                            variant="primary"
                            class="button-hilight btn-preorder profile"
                            block
                            @click="IsShowRedeemlist"
                        >
                          {{ $t('card-profile.redeemable-btn') }}
                        </b-button>
                      </b-card>

                    </div>
                    <!-- on top-->
                    <button class="pagetop" style="z-index: 2" v-show="scY > 300" @click="toTop">
                      <img class="btn-pagetop-img" :src="require('@/assets/profile/btn-gototop.svg')" loading="lazy">
                    </button>
                  </div>
                </div>
                <div class="row text-center pagination" v-if="Object.keys(service_redeem_cards.list).length != 0">
                  <p class="mt-3">
                      <i
                          class="fas fa-arrow-left"
                          style="cursor:pointer;"
                          :class="service_redeem_cards.current_page == 1 ? 'disable_prev_page': 'arrow-enable'"
                          @click="prevPage"
                      ></i>
                      <span style="color:#4A525F; margin-left:29px; margin-right:29px">Page {{service_redeem_cards.current_page}} of {{service_redeem_cards.total_page}}</span>
                      <i
                          class="fas fa-arrow-right"
                          style="cursor:pointer;"
                          :class="service_redeem_cards.current_page == service_redeem_cards.total_page ? 'disable_next_page': 'arrow-enable'"
                          @click="nextPage"
                      >
                      </i>
                  </p>
                </div>
              </b-tab>
              <b-tab class="tab-list" :title="$t('redeem.tab.history')">
                <div class="row">
                 <section-redeem-history
                 :redeem_his_list="service_redeem_history_list"
                 :redeem_fields_physical="service_redeem_fields_physical"
                 :redeem_digital_list="service_redeem_history_digital"
                 :redeem_fields_digital="service_redeem_fields_digital"
                 :order_no="order_no"
                   />
                </div>
              </b-tab>
            </b-tabs>
          </div>
        </div>
      </b-card-text>
        <div v-show="!isRedeemPage" class="section-redeem-list">
          <div class="row">
            <div class="col-md-12">
              <div class="breadcrumb-custom">
                <span @click="goBack()" style="font-size : 16px !important; cursor: pointer" class="text-link">{{ $t('profile-list-claim.my-collection')}} <span class="dot">.</span></span>
                <span class="text-link"> {{$t('common.products')}} <span class="dot">.</span> </span>
                <span class="text-link active"> {{$t('redeem-list.redeemable-list-all')}} </span>
              </div>
            </div>
          </div>
          <datatable-selection
              :claim="false"
              :btn="btn_section"
              :digital_content="content"
              :type="type"
              :dataList="service_redeem_cards"
              :is_redeem="true"
          />
        </div>
    </div>
  </div>
</template>

<script>
import SectionRedeemHistory from "@/components/section/SectionRedeemHistory.vue";
import datatableSelection from '@/components/common/DatatableSelection.vue';
import CardProfile from "@/components/common/CardProfile.vue";

//data
import ServiceFilter from "@/data/ServiceFilter.json";
import ServiceProfile from '@/data/ServiceProfile.json'

export default {
  name: "section-redeem",
  components: {
    datatableSelection,
    SectionRedeemHistory,
    CardProfile
  },
  props: {
    service_redeem_cards: {required: false },
    service_redeem_history_list: { required: true },
    service_redeem_fields_physical: { type: Array, required: false },
    service_redeem_history_digital: { required: false},
    service_redeem_fields_digital: { type: Array, required: false },
    openMenu: {required: false},
  },
  data: () => {
    return {
      isRedeemPage: true,
      isRedeemHisory: false,
      selected: null,
      status_name: "Redeemable in",
      order_no: ServiceProfile.order_redeem_no,
      scY: ServiceProfile.scY,
      btn_section: "Redeem",
      content: "Redeemable",
      type: "physical",
      services_redeem_list: ServiceProfile.redeem_list,
      redeemable_sort_by_list: ServiceFilter.redeemable_sort_by_list,
      redeemable_sort_by: '',
    };
  },
  created() {
    for (let i = 0; i < this.redeemable_sort_by_list.length; i++) {
      if (this.redeemable_sort_by == '' && this.redeemable_sort_by_list[i].checked) {
        this.redeemable_sort_by = i
      }
    }
  },
  mounted() {
      window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    IsShowRedeemlist() {
      this.isRedeemPage = false;
    },
    goBack() {
      this.isRedeemPage = true;
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
    prevPage() {
      if(this.service_redeem_cards.current_page ==  1) return;
      this.$root.$emit('change-page', 3, this.service_redeem_cards.current_page - 1, this.redeemable_sort_by);
    },
    nextPage() {
      if(this.service_redeem_cards.current_page ==  this.service_redeem_cards.total_page) return;
      this.$root.$emit('change-page', 3, this.service_redeem_cards.current_page + 1, this.redeemable_sort_by);
    },
    doRedeemableSortBy(index) {
      this.redeemable_sort_by = index
      this.$root.$emit('bv::toggle::collapse', 'redeemable-sort-collapse')
      this.$root.$emit("load-redeemable", index)
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@/scss/_variables.scss";
@import "~@/scss/card-profile";

div.title h1.title {
    color: $dark-1;
    margin-top: 4rem;
    text-transform: uppercase;
    font-size: 32px;
    font-weight: 600;
    line-height: 44px;
    letter-spacing: 0.16em;

}

.col-4.text-right {
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 30px;
  align-items: center;
  text-align: right;
  letter-spacing: -0.015em;
  color: #e3e3e3;
}

span.badge.tag_inside_img_right.badge-secondary {
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  letter-spacing: -0.015em;
  color: #ffffff !important;
  min-width: 56px;
  min-height: 28px;
  border-radius: 6px 0px 0px 6px !important;
}

article.card.mb-4.card-redeemable.img-fluid {
  background: #2b2b3e;
  border-radius: 18px;
}


div.section-redeem
  > p.card-text
  > div.row
  > div
  > div
  > div
  > div
  > div.row
  > div
  > div
  > article
  > img.card-img {
  width: 100%;
  padding: 5%;
  border-radius: 16px;
}

div.section-redeem
  > p.card-text
  > div.row
  > div
  > div
  > div
  > div
  > div.row
  > div
  > div
  > article
  > div.card-body
  > p.card-text
  > div
  > div.card-title {
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 36px;
  letter-spacing: -0.015em;
  color: #e3e3e3;
}

img.stack.mx-auto.d-block {
  margin-top: 5px;
  width: 18px;
  height: 18px;
}

span.stack-number {
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.015em;
  color: #e3e3e3;
}

.col-8.card-redeemable-in {
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 30px;
  letter-spacing: -0.015em;
  color: #9f9f9f;
}

.col-4.text-platform.card-platform {
  color: #9f9f9f;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
}

.col-8.text-platform.text-right {
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 30px;
  letter-spacing: -0.015em;
}

.col-4.text-price.card-price {
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: -0.015em;
  color: #962eff;
}

span.redeem-in {
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 30px;
  text-align: right;
  letter-spacing: -0.015em;
  color: #e3e3e3;
}

.col-8.text-price.text-right {
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: -0.015em;
  color: #962eff;
}

img.currency-price.mx-auto.d-block {
  width: 24px;
  height: 24px;
  margin-top: 0.15rem;
}

a.btn.button-hilight.btn-preorder.btn-primary.btn-block {
  padding: 5%;
  border: 0px;
}

.row.filter {
  margin-top: 2%;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 30px;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: #9f9f9f;
}

// .section-redeem {
//   font-family: Montserrat;
//   font-style: normal;
// }

.row.filter-redeem {
    font-weight: 600;
    font-size: 16px;
    color: #9f9f9f;
    text-transform: uppercase;
}

.section-redeem > p.card-text .card-header .nav-tabs .nav-link.active {
  color: #E3E3E3 !important;
}

span.dot {
  font-size: 3rem;
  margin-left: 0.75rem;
  margin-right: 0.75rem;
}

.row.justify-content-end.button {
  margin-top: 0.5rem;
}

span.text-title {
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 30px;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: #9F9F9F;
  text-transform: uppercase;
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
