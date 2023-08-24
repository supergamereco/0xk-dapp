<template>
  <div class="modal-redeem-success-physical">
    <b-modal
      v-model="isShowModal"
      id="modal-success-physical-2"
      size="md"
      :title='$t("modals.redeem-success.modal-title")'
      hide-footer
      centered
    >
      <template v-slot:modal-header-close>
        <img
        src="@/assets/modal/Union.png"
        height="18"
        />
      </template>
      <div class="d-block">
        <span class="text-title__redeem_physical_success" style="line-height: 36px;">
          <b>{{$t('modals.redeem-success.title')}}</b></span>
        <p style="line-height: 36px;">
          {{ $t('modals.redeem-success.detail-title')}}
        </p>
        <p style="font-size: 14px; line-height: 30px;">
          {{$t('modals.redeem-success.order-no', {order: order_no})}}
        </p>
        <div class="row">
          <div class="col-md-6" style="color: #f0b90b; line-height: 30px;">
            {{ $t('modals.redeem-success.collector')}}
            <span
              class="iconify"
              data-icon="bi:gift"
              style="color: #f0b90b"
              data-width="15"
              data-height="15"
            ></span>
          </div>
          <div class="col-md-6 text-right" style="line-height: 30px;">{{$t('modals.redeem-success.amount-collect', {amount: collect_amount})}}</div>
          <div class="col-md-6" style="line-height: 30px;">{{$t('modals.redeem-detail.type')}}</div>
          <div class="col-md-6 text-right" style="line-height: 30px;">{{$t('modals.redeem-success.amount-collect', {amount: stardard_amount})}}</div>
        </div>
      </div>
      <hr />
      <b-button
        class="mt-3 btn-modal-profile"
        style="border:none;"
        block
        @click="isOpenModal"
        >{{$t('modals.redeem-success.view-detail')}}</b-button
      >
    </b-modal>
    <modal-redeem-success-physicla-confirm 
      :order_no="order_no"
      :amount="stardard_amount"
      v-if="isNextModalOpen" />
  </div>
</template>

<script>
import ModalRedeemSuccessPhysiclaConfirm from '@/components/modals/ModalRedeemSuccessPhysiclaConfirm.vue'
import ServiceModals from '@/data/ServiceModals.json'
export default {
  components: { ModalRedeemSuccessPhysiclaConfirm },
    name: 'modal-redeem-success-physical',
    data: () => {
        return {
            isShowModal: true,
            isNextModalOpen: false,
            order_no: ServiceModals.modals_redeem_physical.order_no,
            collect_amount: ServiceModals.modals_redeem_physical.collect_amount,
            stardard_amount: ServiceModals.modals_redeem_physical.stardard_amount
        }
    },
    methods: {
       isOpenModal() {
        this.isNextModalOpen = true
        this.$bvModal.hide('modal-success-physical-2')
        this.$bvModal.show('modal-success-physical')
       } 
    }
}
</script>

<style lang="scss" scoped>
@import "~@/scss/_variables.scss";
div#modal-success-physical-2___BV_modal_content_ {
    font-family: Montserrat;
    font-style: normal;
    max-width: 400px;
    min-height: 411px;

    @media (max-width: $tablet) {
       width: 100%;
    }
}

 #modal-success-physical-2___BV_modal_header_ button.close {
     opacity: 1 !important;
 }
</style>