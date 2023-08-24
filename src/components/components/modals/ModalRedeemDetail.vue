<template>
  <div class="modal-redeem-detail">
    <div class="row">
      <div class="col-md-12">
        <b-modal
            v-model="isShowModal"
            id="modal-redeem-detail"
            size="lg"
            title="Redeem Detail"
            hide-footer
            centered
            @hidden="resetModalRedeemDetail"
        >
        <template v-slot:modal-header-close>
                <img
                src="@/assets/modal/Union.png"
                height="18"
                />
            </template>
          <b-form @submit="onSubmit" v-if="show" class="address-book">
            <div class="row">
              <div class="col-lg-7 col-md-12 col-sm-12">
                <p class="text-detail-redeem">
                  {{ $t("modals.redeem-detail.title") }}
                </p>
                <div class="row">
                  <div class="col-md-12 input-bg-dark">
                    <b-form-input
                      id="bg-input-dark"
                      v-model="fullName"
                      :state="validateName"
                      placeholder="Full Name*"
                    ></b-form-input>
                    <b-form-invalid-feedback :state="validateName">
                      {{ $t("modals.redeem-detail.validate-empty") }}
                    </b-form-invalid-feedback>
                  </div>
                </div>

                <div class="row mt-4">
                  <div class="col-md-12 input-bg-dark">
                    <b-form-input
                      id="bg-input-dark"
                      v-model="phoneNumber"
                      :state="validatePhone"
                      placeholder="Phone Number*"
                      type="tel"
                      pattern="^\d{3}-\d{7}$"
                    ></b-form-input>
                    <b-form-invalid-feedback :state="validatePhone">
                      {{ $t("modals.redeem-detail.validate-phone") }}
                    </b-form-invalid-feedback>
                  </div>
                </div>

                <div class="row mt-4">
                  <div class="col-md-4 custom-aa">

                    <b-form-select
                      id="bg-input-dark"
                      v-model="province"
                      :state="validateProvince"
                      :options="selectedProvince"
                    ></b-form-select>
                    <b-form-invalid-feedback :state="validateProvince">
                      {{ $t("modals.redeem-detail.validate-select-option") }}
                    </b-form-invalid-feedback>
                  </div>
                  <div class="col-md-4 custom-aa">
                    <b-form-select
                      id="bg-input-dark"
                      v-model="district"
                      :state="validateDistrict"
                      :options="selectedDistrict"
                    ></b-form-select>
                    <b-form-invalid-feedback :state="validateDistrict">
                      {{ $t("modals.redeem-detail.validate-select-option") }}
                    </b-form-invalid-feedback>
                  </div>
                  <div class="col-md-4 custom-aa">
                    <b-form-select
                      id="bg-input-dark"
                      v-model="postcode"
                      :state="validatePostcode"
                      :options="selectedPostcode"
                    ></b-form-select>
                    <b-form-invalid-feedback :state="validatePostcode">
                      {{ $t("modals.redeem-detail.validate-select-option") }}
                    </b-form-invalid-feedback>
                  </div>
                </div>

                <div class="row mt-4">
                  <div class="col-md-12 input-bg-dark">
                    <b-form-input
                      id="bg-input-dark"
                      v-model="address"
                      :state="validateAddress"
                      placeholder="Address*"
                    ></b-form-input>
                    <b-form-invalid-feedback :state="validateAddress">
                      {{ $t("modals.redeem-detail.validate-empty") }}
                    </b-form-invalid-feedback>
                  </div>
                </div>

                <div class="row mt-4">
                  <div class="col-md-12 input-bg-dark">
                    <b-form-input
                      id="bg-input-dark"
                      v-model="email"
                      :state="validateMail"
                      placeholder="Email Address"
                    ></b-form-input>
                    <b-form-invalid-feedback :state="validateMail">
                      {{ $t("modals.redeem-detail.validate-email") }}
                    </b-form-invalid-feedback>
                  </div>
                </div>

                <div class="row mt-4">
                  <div class="col-6 mt-2">
                    <p class="text-detail__redeem" style="color: #9F9F9F;">
                      {{ $t("modals.redeem-detail.notification-email") }}
                    </p>
                  </div>
                  <div class="col-6 text-right">
                    <b-form-checkbox
                        v-model="checked"
                        name="check-button"
                        size="lg"
                        switch
                    ></b-form-checkbox>
                  </div>
                </div>
              </div>
              <div class="col-lg-5 col-md-12 col-sm-12">
                <div class="bg-dark-grey-3">
                <p class="text-detail-redeem">
                  {{ $t("modals.redeem-detail.summary") }}
                </p>
                <div class="row bg-dark-dark" style="padding : 1px !important;">
                  <div class="d-flex justify-content-start " style="padding-left : 4px !important;">
                      <img
                        src="/images/card.png"
                        class="img-game-redeem"
                      />
                      <div style="padding-top : 15px; margin-left : 13px;">
                          <span class="detail-title"> {{ $t("modals.redeem-detail.game") }}</span>
                          <p class="detail-token" style="font-size:12px !important;">
                              {{ $t("modals.redeem-detail.detail-game") }}
                          </p>
                      </div>
                  </div>
                </div>


                <div class="row" style="margin-top : 14.16px;">
                  <div class="col-6">
                    <span class="text-redeem__detail">
                      {{ $t("modals.redeem-detail.type") }}
                    </span>
                    </div>
                    <div class="col-6 text-right">
                      {{ $t("modals.redeem-detail.amount", {amount: amount}) }}
                    </div>
                  </div>

                  <hr/>

                  <div class="row">
                  <span>
                    {{ $t("modals.redeem-detail.software-format") }}
                    <a>
                    <span
                        class="iconify icon_information align-text-top redeem_i"
                        data-icon="akar-icons:info"
                        data-width="20"
                        data-height="20"
                        style="margin-top: 0px !important;"
                    ></span>
                    </a>
                  </span>
                  <span style="font-size: 12px" class="text-redeem-detail">{{
                    type
                  }}</span>
                  <span class="mt-3">
                    {{ $t("modals.redeem-detail.collection-edition") }}
                    <a id="collector-edition">
                    <span
                        class="iconify icon_information align-text-top redeem_i"
                        data-icon="akar-icons:info"
                        data-width="20"
                        data-height="20"
                        style="margin-top: 0px !important;"
                    ></span>
                    </a>
                    <b-tooltip target="collector-edition">{{
                        $t("tooltip.collector-edition")
                      }}</b-tooltip>
                  </span>
                  <span style="font-size: 12px">
                    <b-form-group v-slot="{ ariaDescribedby }" style="margin-bottom : 0px">
                      <b-form-radio-group
                          id="radio-group-2"
                          v-model="selected"
                          :aria-describedby="ariaDescribedby"
                          name="radio-sub-component"
                      >
                        <b-form-radio value="first">
                          <span class="text-redeem-detail">
                            {{ $t("modals.redeem-detail.ps4") }}</span
                          ></b-form-radio
                        >
                        <b-form-radio value="second">
                          <span class="text-redeem-detail">
                            {{ $t("modals.redeem-detail.ps5") }}</span
                          ></b-form-radio
                        >
                      </b-form-radio-group>
                    </b-form-group>
                  </span>
                  </div>
                </div>
                <div class="detail-info">
                  <div class="icon-info-modal my-auto">
                    <b-icon
                        id="collector-info"
                        icon="exclamation-circle"
                        style="width: 15px; height: 15px"
                    ></b-icon>
                  </div>
                  <span class="text-icon__redeem">
                    {{ $t('modals.redeem-detail.icon-text') }}
                  </span>
                </div>
                <b-button type="submit" class="mt-3 btn-modal-redeem-detail" block>{{
                    $t("modals.redeem-detail.redeem")
                  }}
                </b-button>
              </div>
            </div>
          </b-form>
        </b-modal>
      </div>
    </div>
    <modal-redeem-comfirm-shipping v-if="isOpenNextModal"/>
  </div>
</template>

<script>
import ModalRedeemComfirmShipping from "@/components/modals/ModalRedeemComfirmShipping.vue";

//data
import ServiceFormatFrom from '@/data/ServiceFormatFrom.json'
import ServiceModals from '@/data/ServiceModals'

export default {
  components: {ModalRedeemComfirmShipping},
  name: "modal-redeem-detail",
  data: () => {
    return {
      show: true,
      tooltipCollectorEdition: "Free upgrade to Collector's Edition to the lucky winner. Choose your preferred platform to receive if you are the winner.",
      isShowModal: true,
      fullName: "",
      phoneNumber: "",
      province: null,
      district: null,
      postcode: null,
      address: "",
      email: "",
      emailBlured: false,
      checked: false,
      selected: [],
      isOpenNextModal: false,
      selectedProvince: ServiceFormatFrom.from_selected_province,
      selectedDistrict: ServiceFormatFrom.from_selected_district,
      selectedPostcode: ServiceFormatFrom.from_selected_post_code,
      amount: ServiceModals.modals_redeem_detail.amount,
      type: ServiceModals.modals_redeem_detail.type,
    };
  },
  computed: {
    validateName() {
      return this.fullName.length > 0 ? true : false;
    },
    validatePhone() {
      return this.phoneNumber.length > 0 ? true : false;
    },
    validateMail() {
      return this.email > 0 ? true : false;
    },
    validateProvince() {
      return this.province > 0 ? true : false;
    },
    validateDistrict() {
      return this.district > 0 ? true : false;
    },
    validatePostcode() {
      return this.postcode > 0 ? true : false;
    },
    validateAddress() {
      return this.address.length > 0 ? true : false;
    },
    emailState() {
      return this.email.length > 0 ? true : false;
    },
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.isOpenNextModal = true;
      this.$bvModal.hide("modal-redeem-detail");
      this.$bvModal.show("modal-confirm-shipping");
    },
    validate: function () {
      this.emailBlured = true;
      if (this.validEmail(this.email)) {
        this.valid = true;
      }
    },
    validEmail: function (email) {
      var re = /(.+)@(.+){2,}\.(.+){2,}/;
      return re.test(email.toLowerCase());
    },
    submit: function () {
      this.validate();
      if (this.valid) {
        //THIS IS WHERE YOU SUBMIT DATA TO SERVER
        this.submitted = true;
      }
    }, //end submit
    resetModalRedeemDetail() {
      this.fullName = ""
      this.phoneNumber = ""
      this.province = null
      this.district = null
      this.postcode = null
      this.address = ""
      this.email = ""
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@/scss/_variables.scss";

div#modal-redeem-detail___BV_modal_content_ {
  // min-width: 894px !important;
  // min-height : 616px !important;
  font-family: Montserrat;
  font-style: normal;

  @media (max-width: $tablet) {
    width: 100%;
  }
}

@media (min-width: 768) {
  div#modal-redeem-detail___BV_modal_content_ {
    min-width: 894px !important;
    min-height: 616px !important;
  }
}

div.custom-aa select.custom-select {
    background: none !important;
    display: inline-block !important;
    width: 100% !important;
    height: calc(1.5em + 0.75rem + 2px) !important;
    padding: 0.375rem 1.75rem 0.375rem 0.75rem !important;
    font-size: 1rem !important;
    font-weight: 400 !important;
    line-height: 1.5 !important;
    color: #E3E3E3 !important;
    vertical-align: middle !important;
    background: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 4 5'><path fill='%2387898E' d='M2 0L0 2h4zm0 5L0 3h4z'/></svg>") right 0.75rem center/8px 10px no-repeat !important;
    border: 2px solid #484c56 !important;
    box-sizing: border-box;
    -webkit-appearance: none !important;
    -moz-appearance: none !important;
    appearance: none !important;
}

#bg-input-dark {
    border: 2px solid #484c56 !important;
    box-sizing: border-box;
    border-radius: 12px;
    color : #E3E3E3 !important;
    caret-color : #87898E !important;
}

div.input-bg-dark input.form-control {
  background: #23262F !important;
}

div.input-bg-dark input.form-control::placeholder {
    color: #87898E !important;
}

.custom-control-label::before {
    position: absolute;
    top: 0.25rem;
    left: -1.5rem;
    display: block;
    width: 1rem;
    height: 1rem;
    pointer-events: none;
    content: "";
    background-color: #23262F !important;
    border: 1px solid #962EFF !important;
}

.custom-switch .custom-control-input:checked ~ .custom-control-label::after {
    background-color: #23262F !important;
    transform: translateX(0.75rem);
}

.custom-radio .custom-control-input:checked ~ .custom-control-label::after {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%232B2B3E'/%3e%3c/svg%3e") !important;
    //background: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3e%3cpath fill='white' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e") no-repeat right .75rem center/8px 10px !important;
}

.img-game-redeem {
  width : 70.26px;
  height : 70.31px;
  margin-left : 7px;
  margin-top : 7px;
  margin-bottom :7px;
}

h5#modal-redeem-detail___BV_modal_title_ {
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
  letter-spacing: -0.015em;
}

p.text-detail-redeem {
  font-weight: 600;
  font-size: 16px;
  line-height: 30px;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: #e3e3e3;
}

p.text-title-redeem {
  font-weight: 600;
  font-size: 16px;
  line-height: 30px;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: #e3e3e3;
}

span.text-redeem-detail {
  font-weight: 500;
  font-size: 12px;
  line-height: 30px;
  letter-spacing: 0.175em;
  text-transform: uppercase;
  color: #e3e3e3;
}

p.text-card-redeem {
  font-weight: 600;
  font-size: 16px;
  line-height: 30px;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: #e3e3e3;
  /* margin-top: 0rem; */
}

span.text-redeem__detail {
  font-weight: 500;
  font-size: 16px;
  line-height: 30px;
  letter-spacing: -0.015em;
}

.detail-info {
  background: #1e87ff;
  border-radius: 12px;
  padding: 0.75rem;
  padding-bottom : 0px;
  margin-top: 1rem;
  display: flex;

}

#collector-info {
  width: 21px !important;
  height: 21px !important;
}

span.text-icon__redeem {
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.015em;
  color: #FFFFFF;
  /* display: inline; */
}

// .icon-info-modal {
//   margin: 1rem;
// }

button.btn.mt-3.btn-modal-redeem-detail.btn-secondary.btn-block {
  background: linear-gradient(89.66deg, #962EFF 2.15%, #3106BB 99.71%);
  border-radius: 6px;
  font-weight: 700 !important;
  font-size: 18px;
  line-height: 36px;
  border: none;
}

svg.iconify.iconify--akar-icons.icon_information.align-text-top.redeem_i {
    margin-top: 0px !important;
}

</style>