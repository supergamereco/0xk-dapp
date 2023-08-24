<template>
  <div class="section-redeem-list">
    <div class="row">
      <div class="col-md-12">
        <div class="breadcrumb-custom">
          <span class="text-link"> {{ $t('redeem-list.redeemable')}} <span class="dot">.</span></span>
          <span class="text-link"> {{$t('common.games')}} <span class="dot">.</span> </span>
          <span class="text-link active"> {{$t('redeem-list.redeemable-list-all')}} </span>
        </div>
      </div>
    </div>
      <datatable-selection 
        :claim="false"
        :btn="btn_section"
        :digital_content="content"
        :type="type"
        :is_redeem="true"
      />
  </div>
</template>

<script>
import datatableSelection from '@/components/common/DatatableSelection.vue';

//data
import ServiceProfile from '@/data/ServiceProfile.json'
import {i18n} from "@/i18n";

export default {
  name: "section-redeem-list",
  components: { datatableSelection },
  data: () => {
    return {
        btn_section: "Redeem",
        content: "Redeemable",
        type: "physical",
        services_redeem_list: ServiceProfile.redeem_list
    };
  },

  methods: {
    goToPage(path) {
      this.$router.push(path);
    },

  },
};
</script>

<style lang="scss" scoped>
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
</style>