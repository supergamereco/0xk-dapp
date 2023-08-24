<template>
  <div class="modal-redeem-success-physicial-confirm">
    <b-modal
      v-model="isShowModal"
      id="modal-success-physical"
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
        <span style="font-size: 14px ">{{$t('modals.redeem-success.order-no', {order: order_no})}}</span>
        <div class="row mt-4">
          <div class="col-md-6" style="font-size: 16px">{{$t('modals.redeem-detail.type')}}</div>
          <div class="col-md-6 text-right" style="font-size: 16px">{{ $t('modals.redeem-detail.amount', {amount: amount})}}</div>
        </div>
      </div>
      <hr />
      <b-button
        class="mt-3 btn-modal-profile"
        style="border: none;"
        block
        @click="$bvModal.hide('modal-success-physical')"
        >{{$t('modals.redeem-success.view-detail')}}</b-button
      >
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "modal-redeem-success-physical-comfirm",
  props: {
    order_no: {type: String, required: true },
    amount: { type: Number, required: true }
  },
  data: () => {
    return {
      isShowModal: true
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~@/scss/_variables.scss";
div#modal-success-physical___BV_modal_content_ {
    max-width: 400px;
    min-height: 276px;
    font-family: Montserrat;
    font-style: normal;
    line-height: 36px;

    @media (max-width: $tablet) {
       width: 100%;
    }
}

@media (min-width: $tablet){
  div.modal-dialog.modal-md.modal-dialog-centered {
      max-width: 400px !important;
      margin: 1.75rem auto;
  }
}

 #modal-success-physical___BV_modal_header_ button.close {
     opacity: 1 !important;
 }
</style>