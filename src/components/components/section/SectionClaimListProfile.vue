<template>
  <div class="section-claim-list-profile">
    <div class="row">
      <div class="col-md-12">
        <div class="breadcrumb-custom">
          <span style="font-size : 16px !important;" class="text-link active">{{ $t('profile-list-claim.my-collection')}} <span class="dot">.</span></span>
          <span style="font-size : 16px !important;" class="text-link"> {{ $t('profile-list-claim.product-name')}}<span class="dot">.</span> </span>
          <span style="font-size : 16px !important;" class="text-link"> {{ $t('profile-list-claim.claimable-list-all')}}</span>
        </div>
      </div>
    </div>
    <datatable-selection 
        :service_data_list="services_claim_lists"
        :btn="btn_section"
        :digital_content="content"
        :is_redeem="false"
    />
  </div>
</template>

<script>
import DatatableSelection from '@/components/common/DatatableSelection.vue';

//data
import ServiceProfile from '@/data/ServiceProfile.json'

export default {
  name: "section-claim-list-profile",
  components: { DatatableSelection },
  data: () => {
      return {
          btn_section: "Claim",
          content: "Claimable",
          services_claim_lists: ServiceProfile.claim_lists 
      }
  }
};
</script>