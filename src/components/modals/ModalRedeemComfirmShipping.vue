<template>
  <div class="modal-redeem-confrim-shipping">
    <b-modal
      v-model="isShowModal"
      id="modal-confirm-shipping"
      size="lg"
      :title='$t("modals.redeem-confirm-shipping.title")'
      hide-footer
      centered
    >
      <template v-slot:modal-header-close>
        <img
        src="@/assets/modal/Union.png"
        height="18"
        />
      </template>
      <div class="row">
        <div class="col-md-6">
          <div class="row bg-dark-grey-3">
            <div class="col-md-3" style="padding-left: 1px; padding-top: 10px;">
              <!-- <img style="max-width: 70px; max-height: 70px;" src="~@/assets/game_detail/icon_img.png" /> -->
            </div>
            <div class="col-md-9" style="padding-left: 1px; padding-top: 10px;">
              <p style="margin: 8px 0px 8px;">{{$t('modals.redeem-detail.game')}}</p>
              <p style="font-size: 12px; color: #9f9f9f">{{$t('modals.redeem-detail.detail-game')}}</p>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-md-6">{{$t('modals.redeem-detail.type')}}</div>
            <div class="col-md-6 text-right">{{$t('modals.redeem-detail.amount', {amount: amount})}}</div>
          </div>
          <hr />
          <div class="row">
            <div class="col-md-7 d-flex align-items-center justify-content-start" style="margin-bottom : 7px;">

              <span style="margin-right:5px;">{{$t('modals.redeem-detail.software-format')}}</span>
              <a>
                <span
                    class="iconify icon_information align-text-top redeem_i"
                    data-icon="akar-icons:info"
                    data-width="20"
                    data-height="20"
                    style="margin-left : 3px; margin-top: 0px !important;"
                ></span>
                </a>
              <b-tooltip target="collector-edition-icon">{{
                $t(tooltipCollectorEdition)
              }}</b-tooltip>
            </div>
            <div class="col-md-5 text-right d-flex align-items-center justify-content-end text-detail-redeem__physical" style="font-size: 12px;">
              {{ $t('modals.redeem-confirm-shipping.shipping-type')}}
            </div>
            <div class="col-md-7 d-flex align-items-center justify-content-start" style="margin-bottom : 7px;">
              <span class="text-detail-comfirm-redeem" style="margin-right:5px;">{{$t('modals.redeem-detail.collector-edition')}}</span>
              <a id="collector-edition-icon">
                <span
                    class="iconify icon_information align-text-top redeem_i"
                    data-icon="akar-icons:info"
                    data-width="20"
                    data-height="20"
                    style="margin-left : 3px; margin-top: 0px !important;"
                ></span>
                </a>
              <b-tooltip target="collector-edition-icon">{{
                $t(tooltipCollectorEdition)
              }}</b-tooltip>
            </div>
            <div class="col-md-5 text-right d-flex align-items-center justify-content-end text-detail-redeem__physical" style="font-size: 12px; margin-bottom : 7px;">{{type_ps}}</div>
          </div>
        </div>
        <div class="col-md-6" style="font-size: 12px">
          <div class="row bg-dark-grey-3" style="max-width: 352px;">
            <!-- <div class="row"> -->
            <div class="col-md-10 col-sm-6">
              <p class="text-title__redeem">{{$t('modals.redeem-detail.title')}}</p>
              <span class="text-address">{{address}}</span>
              <span style="color: #9f9f9f">{{email}}</span>
            </div>
            <div class="col-md-2 col-sm-6" style="padding: 1px">
              <template variant="outline-dark">
                <div class="icon-banner">
                  <span 
                    class="iconify" 
                    data-icon="prime:pencil"
                    data-width="29"
                    data-height="25"
                  >
                  </span>
                </div>
              </template>
            </div>
          </div>
          <div class="row bg-dark-grey-3 mt-2" style="max-width: 352px;">
            <p class="text-detail__redeem_confirm">{{$t('modals.redeem-detail.shipping-payment')}}</p>
            <div class="col-md-6 my-1" style="color: #9f9f9f">{{$t('modals.redeem-detail.shipping-fee')}}</div>
            <div class="col-md-5 text-right" style="color: #9f9f9f; padding-right: 5px;">
              {{fee}}
            </div>
            <div class="col-md-1" style="color: #9f9f9f; padding-left: 4px;">
              <img src="~@/assets/game_detail/polygon.png" style="max-width: 14.05px; max-height : 14px;" />
            </div>
            <div class="col-md-6 my-1" style="color: #9f9f9f; text-transform:uppercase;">{{$t('modals.redeem-detail.vat', {percent: percent_vat })}}</div>
            <div class="col-md-5 text-right" style="color: #9f9f9f;  padding-right: 5px;">
              {{vat}}
            </div>
            <div class="col-md-1" style="color: #9f9f9f; padding-left: 4px">
              <img src="~@/assets/game_detail/polygon.png" style="max-width: 14.05px; max-height : 14px;" />
            </div>
            <div class="col-md-6 my-1" style="color: #9f9f9f">{{$t('modals.redeem-detail.total-payment')}}</div>
            <div
              class="col-md-5  text-right"
              style="font-size: 18px; color: #962eff;  padding-right: 5px;"
            >
              <b>{{total}} </b>
            </div>
            <div class="col-md-1" style="color: #9f9f9f; padding-left: 1px;  margin-top: 0px;">
              <img src="~@/assets/game_detail/polygon.png" style="max-width: 23.93px; max-height : 24px;" />
            </div>
          </div>
          <b-button
            class="mt-3 btn-modal-profile-shipping"
            block
            @click="isOpenModal"
            >{{$t('modals.redeem-detail.confirm')}}</b-button
          >
        </div>
      </div>
    </b-modal>
    <modal-redeem-success-physical v-if="isOpenNextModal" />
  </div>
</template>

<script>
import ModalRedeemSuccessPhysical from '@/components/modals/ModalRedeemSuccessPhysical.vue';
import ServiceModals from '@/data/ServiceModals.json'

export default {
  name: "modal-redeem-confrim-shipping",
  components: { ModalRedeemSuccessPhysical },
  data: () => {
    return {
      isShowModal: true,
      isOpenNextModal: false,
      amount: ServiceModals.modals_confirm_shipping.amount,
      type: ServiceModals.modals_confirm_shipping.type,
      type_ps: ServiceModals.modals_confirm_shipping.type_ps,
      address: ServiceModals.modals_confirm_shipping.address,
      email: ServiceModals.modals_confirm_shipping.email,
      fee: ServiceModals.modals_confirm_shipping.fee,
      vat: ServiceModals.modals_confirm_shipping.vat,
      percent_vat: ServiceModals.modals_confirm_shipping.percent_vat,
      total: ServiceModals.modals_confirm_shipping.total,
      tooltipCollectorEdition:
        "Free upgrade to Collector's Edition to the lucky winner. Choose your preferred platform to receive if you are the winner.",
    };
  },
  methods: {
      isOpenModal() {
        this.isOpenNextModal = true
        this.$bvModal.hide('modal-confirm-shipping')
        this.$bvModal.show('modal-success-physical-2')
      }
  }
};
</script>

<style lang="scss" scoped>
div#modal-confirm-shipping___BV_modal_content_ {
    font-family: Montserrat;
    font-style: normal;
}

 #modal-confirm-shipping___BV_modal_header_ button.close {
     opacity: 1 !important;
 }

span.text-address {
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: -0.015em;
    color: #9F9F9F;
}

.col-md-6.text-right.text-detail-redeem__physical {
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: 0.175em;
    text-transform: uppercase;
    color: #E3E3E3;
}

.icon-banner {
    display: flex;
    background: #1b1b21;
    opacity: 64%;
    border: 1px solid #9f9f9f;
    box-sizing: border-box;
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);
    border-radius: 50%;
    float: right;
    min-width: 30px;
    min-height: 30px;
}

.btn-modal-profile-shipping {
    background: linear-gradient(89.66deg, #962eff 2.15%, #3106bb 99.71%);
    max-width: 352px;
    min-height: 52px;
    border-radius: 6px;
    font-weight: 700 !important;
    font-size: 18px;
    line-height: 36px;
    border: none !important;
    margin: auto !important;
}
</style>