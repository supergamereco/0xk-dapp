<template>
    <div class="section-profile-address-book center">
      <div class="container">
        <b-card-text>
            <div class="row address-book__title">
                <div class="col-12">
                    <h1 class="address-title">
                        {{ $t("profile-address.title") }}
                    </h1>
                </div>
            </div>
            <div class="row address-book__detail">
                <form
                    @submit.stop.prevent="saveAddress()"
                    class="address-book needs-validation"
                    novalidate
                >
                    <div class="row">
                        <div class="col-md-12 form-floating fullname">
                            <input
                                id="bg-input"
                                class="bg-input floating-fullname form-control"
                                v-model="fullName"
                                type="text"
                                pattern="^[a-zA-Zก-๎ ]+$"
                                :placeholder="$t('profile-address.full-name')"
                                required
                            />
                            <label
                                class="floating-fullname"
                                for="floatingFullname"
                                >{{$t('profile-address.full-name')}}</label
                            >
                            <span class="invalid-feedback">
                                 {{fullName.length > 0
                                 ? $t("modals.redeem-detail.validate-email") : $t("modals.redeem-detail.validate-empty") }}
                            </span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mt-4">
                            <p class="input-field-block form-floating">
                                <input
                                    type="tel"
                                    v-model="phoneNumber"
                                    :placeholder="$t('profile-address.phone-number')"
                                    id="bg-input"
                                    class="bg-input phone-number form-control"
                                    :state="validatePhoneNumber"
                                    pattern="^\d{3}-\d{7}$"
                                    required
                                />
                                <label
                                    class="floating-number"
                                    for="floatingInput"
                                    >{{$t('profile-address.phone-number')}}</label
                                >
                                <span
                                    class="v-reset-input"
                                    :class="
                                        phoneNumber.length > 0
                                            ? 'v-reset-input-active'
                                            : ''
                                    "
                                    @click="phoneNumber = ''"
                                >
                                <span class="iconify-inline" data-icon="heroicons-solid:x" style="color: #4A525F; vertical-align: -0.2em;" data-width="15" data-height="15"></span></span
                                >
                                <span
                                    class="invalid-feedback"
                                    style="top: 54px"
                                >
                                                    {{
                                    $t(
                                        "modals.redeem-detail.validate-phone"
                                    )
                                  }}
                                </span>
                            </p>
                        </div>
                        <div class="col-md-6 mt-4 profile-address-input">
                            <p class="input-field-block form-floating">
                                <input
                                    type="text"
                                    v-model="email"
                                    :placeholder="$t('profile-address.email')"
                                    id="bg-input"
                                    pattern="^(?=[^@]*[A-Za-z])([a-zA-Z0-9])(([a-zA-Z0-9])*([._-])?([a-zA-Z0-9]))+@(([a-zA-Z0-9]))+([.])+([a-zA-Z]{2,4})+$"
                                    class="bg-input email form-control"
                                    required
                                />
                                <label class="floating-email" for="floatingEmail">{{$t('profile-address.email')}}</label>
                                <span class="v-reset-input" :class="email.length > 0 ? 'v-reset-input-active': ''" @click="email = ''">
                                  <span class="iconify-inline" data-icon="heroicons-solid:x" style="color: #4A525F; vertical-align: -0.2em;" data-width="15" data-height="15"></span>
                                </span>
                                 <span class="invalid-feedback" style="top: 54px">
                                   {{email.length > 0 ? $t("modals.redeem-detail.validate-email") : $t("modals.redeem-detail.validate-empty") }}
                                 </span>
                            </p>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-4 col-md-4 col-sm-12 mt-4">
                            <div class="form-floating province">
                                <select
                                    class="bg-select province form-select"
                                    :class="province !== null ? 'active' : ''"
                                    id="floatingSelectProvince"
                                    v-model="province"
                                    :state="validateProvince"
                                    :style="getStyleFont(province)"
                                    aria-label="Floating label select"
                                    @change="selectProvince"
                                    required
                                >
                                    <option
                                        v-for="(value, idx) in provinceList"
                                        :key="idx"
                                        :value="value"
                                    >
                                        {{ value }}
                                    </option>
                                </select>
                                <label
                                    class="label-select-province"
                                    for="floatingSelectProvince"
                                    >{{$t('profile-address.province')}}</label
                                >
                                <div class="invalid-feedback">
                                    {{
                                        $t(
                                            "modals.redeem-detail.validate-select-option"
                                        )
                                    }}
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-12 mt-4">
                            <div class="form-floating district">
                                <select
                                    class="bg-select district form-select"
                                    :class="district != null ? 'active' : ''"
                                    id="floatingSelectDistrict"
                                    v-model="district"
                                    :state="validateDistrict"
                                    :style="getStyleFont(district)"
                                    aria-label="Floating label select"
                                    :disabled="province == null"
                                    @change="selectDistrict"
                                    required
                                >
                                    <option
                                        v-for="(value, idx) in districtList"
                                        :key="idx"
                                        :value="value"
                                    >
                                        {{ value }}
                                    </option>
                                </select>
                                <label
                                    class="label-select-district"
                                    for="floatingSelectDistrict"
                                    >{{$t('profile-address.district')}}</label
                                >
                                <div class="invalid-feedback">
                                    {{
                                        $t(
                                            "modals.redeem-detail.validate-select-option"
                                        )
                                    }}
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-12 mt-4">
                            <div class="form-floating postcode">
                                <select
                                    class="bg-select postcode form-select"
                                    :class="postcode !== null ? 'active' : ''"
                                    id="floatingSelectPostcode"
                                    v-model="postcode"
                                    :state="validatePostcode"
                                    :style="getStyleFont(postcode)"
                                    aria-label="Floating label select"
                                    :disabled="district == null"
                                    required
                                >
                                    <option
                                        v-for="(value, idx) in postcodeList"
                                        :key="idx"
                                        :value="value"
                                    >
                                        {{ value }}
                                    </option>
                                </select>
                                <label
                                    class="label-select-postcode"
                                    for="floatingSelectPostcode"
                                    >{{$t('profile-address.postcode')}}</label
                                >
                                <div class="invalid-feedback">
                                    {{
                                        $t(
                                            "modals.redeem-detail.validate-select-option"
                                        )
                                    }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-4">
                        <div class="col-md-12">
                            <div class="form-floating">
                                <textarea
                                    class="bg-input address form-control"
                                    :class="!checkAddress ? 'custom-validate' : ''"
                                    placeholder="Address*"
                                    id="bg-input"
                                    v-model="address"
                                    :state="validateAddress"
                                    :maxlength="maxCharacterAddress"

                                    wrap="soft"
                                    style="resize: none; min-height: 80px"
                                    required
                                ></textarea>
                                <label
                                    class="floating-address"
                                    for="floatingTextareaAddress"
                                    >{{$t('profile-address.address')}}
                                </label>
                                <div class="invalid-feedback">
                                    <span> {{ $t("modals.redeem-detail.validate-empty")}}</span>
                                </div>
                                 <div class="invalid-custom" :style="(!checkAddress && address.length > 0) ? 'display:block': 'display:none'">
                                    <span> {{$t("modals.redeem-detail.validate-email")}}</span>
                                </div>
                                <div class="char-count">
                                      <span>{{address.length}}/{{maxCharacterAddress}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-4" style="margin-bottom: 9rem;">
                        <div class="col-md-12">
                            <button
                                type="submit"
                                class="btn btn-md btn-preorder btn-border text-color float-right"
                                style="width: 192px; height: 52px"

                            >
                                {{ $t("common.save-btn") }}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </b-card-text>
      </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {vuexTypes} from "@/store/modules/types";
import { getAllPostcode, getAllDistrict, getAllProvince, getDistrictByProvince, getPostcodeByDistrict } from "@/common/core"
import moment from "moment";

export default {
  name: "section-profile-address-book",
  data() {
    return {
      fullName: "",
      phoneNumber: "",
      email: "",
      province: null,
      district: null,
      postcode: null,
      address: "",
      checkAddress: true,
      submitStatus: false,
      maxCharacterAddress: 100,
      validate: false,
      provinceList: getAllProvince(),
      districtList: '',
      postcodeList: ''
    };
  },
  async created() {
    try {
      await this.initLoad()
    } catch (e) {
      // ErrorHandler.process(e)
    }
  },
  computed: {
    ...mapGetters({
      userAddress: vuexTypes.userAddress,
    }),
    validateName() {
      return this.fullName.length > 4 && this.fullName.length < 13;
    },
    validatePhoneNumber() {
      return this.phoneNumber.length > 0;
    },
    validateMail() {
      return this.email.length > 0;
    },
    validateProvince() {
      return this.province > 0;
    },
    validateDistrict() {
      return this.district > 0;
    },
    validatePostcode() {
      return this.postcode > 0;
    },
    validateAddress() {
      return this.address.length > 0;
    },
  },
  mounted() {
    // let forms = document.querySelectorAll(".needs-validation");
    // // Loop over them and prevent submission
    // Array.prototype.slice.call(forms).forEach(function (form) {
    //  form.addEventListener(
    //       "submit",
    //       function (event) {
    //         if (!form.checkValidity()) {
    //           event.preventDefault();
    //           event.stopPropagation();
    //         }
    //         form.classList.add("was-validated");
    //       },
    //       false
    //   );
    // });

    this.$root.$on('address-data' , async () => {
      await this.initLoad()
    })
  },
  beforeUpdate(){
    this.districtList = getAllDistrict(this.province)
    this.postcodeList = getAllPostcode(this.district)
  },
  beforeDestroy() {
    this.$root.$off('address-data')
  },
  methods: {
    ...mapActions({
      myProfile: vuexTypes.MY_PROFILE,
      editAddressProfile: vuexTypes.EDIT_MY_ADDRESS,
      disconnect: vuexTypes.DISCONNECT_METAMASK
    }),
    async initLoad() {
      if ( Number(localStorage.getItem('authorization_expire')) < moment().unix()) {
          this.$root.$emit('bv::show::modal', 'modal-login')
          await this.$router.push('/');
          await this.disconnect()
      }
      await this.myProfile()

      if (this.userAddress.email) {
        this.email = this.userAddress.email;
      }
      if (this.userAddress.fullName) {
        this.fullName = this.userAddress.fullName
      }
      if (this.userAddress.phoneNumber) {
        this.phoneNumber = this.userAddress.phoneNumber
      }
      if (this.userAddress.address) {
        this.address = this.userAddress.address
      }
      if (this.userAddress.province) {
        this.province = this.userAddress.province
      }
      if (this.userAddress.district) {
        this.district = this.userAddress.district
      }
      if (this.userAddress.postcode) {
        this.postcode = this.userAddress.postcode
      }

    },

    validAddress(address){
      let re = /^[a-zA-Zก-๎0-9 .,'/-]+$/
      this.checkAddress = re.test(address);
      return this.checkAddress
    },
    getStyleFont(value) {
      return value !== null ? "color: #E3E3E3;" : "color: #888E97;";
    },
    getValueFormSelect(value) {
      return value !== null ? value : "";
    },
    async saveAddress() {
      let forms = document.querySelectorAll(".needs-validation");
      // Loop over them and prevent submission
      this.submitStatus = true
      Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener("submit",
            function (event) {
              if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
              }
              form.classList.add("was-validated");
            },
            false
        );
      });

       this.validAddress(this.address)

      let email = document.querySelector(".email");
      let phoneNum = document.querySelector(".phone-number");
      let address = document.querySelector(".address");
      let fullname = document.querySelector(".floating-fullname");

      if(this.email.length == 0 || email.checkValidity() === false) return
      if((this.fullName.length > 0 && fullname.checkValidity() === false) || this.fullName.length < 1 ) return
      if(this.phoneNumber.length < 1 && phoneNum.checkValidity() === false) return
      if((this.address.length > 0 && address.checkValidity() === false) || this.address.length < 1  || (!this.checkAddress && this.address.length > 0)) return
      if(this.province.length < 1) return
      if(this.district.length < 1) return
      if(this.postcode.length < 1) return

      await this.editAddressProfile({
        'email': this.email,
        'fullName': this.fullName,
        'phoneNumber': this.phoneNumber,
        'address': this.address,
        'province': this.province,
        'district': this.district,
        'postcode': this.postcode,
      })

      this.$root.$emit('address-data')

    },
    selectProvince(){
      this.districtList = getDistrictByProvince(this.province);
      this.district = null
      this.postcode = null
    },
    selectDistrict(){
      if(this.district == null){return}
      this.postcodeList = getPostcodeByDistrict(this.district);
      this.postcode = null
    }
  },
  watch: {
    address(value){
      if(this.submitStatus){
        this.validAddress(value)
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@/scss/_variables.scss";

#bg-input {
  background: $light-1 !important;
  border: 2px solid $light-2 !important;
  box-sizing: border-box;
  border-radius: 12px;
  color: $dark-1 !important;
  margin-bottom: 0;
}

.bg-select {
  box-sizing: border-box;
  border-radius: 12px;
  color: $dark-1 !important;
  margin-bottom: 0;
}

.bg-select.province.form-select,
.bg-select.district.form-select,
.bg-select.postcode.form-select {
  background: url("~@/assets/modal/select.png") no-repeat !important;
  background-position: right 0.75rem center !important;
  background-size: 14px 20px !important;
  background-color: $light-1 !important;
  border: none;
}

.section-profile-address-book {
  max-width: 856px;
  margin: auto;
}

@media only screen and (max-width: 480px) {
  button.btn.btn-md.btn-outline-secondary.btn-border.text-color.float-right {
    margin: 0 !important;
    width: 100% !important;
  }

  button.btn.btn-md.btn-preorder.btn-border.text-color.float-right {
    margin-bottom: 0.3rem !important;
    width: 100% !important;
  }
}

.invalid-feedback,
.invalid-custom {
  position: absolute;
  font-weight: 400 !important;
  font-size: 12px !important;
  line-height: 16px !important;
  letter-spacing: 0em !important;
  margin-left: 0.9rem;
  text-align: left !important;
  color: #D73D24 !important;
}

h1.address-title {
  font-size: 32px;
  font-weight: 700;
  color: $dark-1;
  margin-top: 4rem;
  margin-bottom: 3rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  line-height: 44px;
}

.bg-input.fullname.form-control,
.bg-input.phone-number.form-control,
.bg-input.email.form-control,
.bg-input.address.form-control,
.bg-input.fullname.form-control:focus,
.bg-input.phone-number.form-control:focus,
.bg-input.email.form-control:focus,
.bg-input.address.form-control:focus {
  color: #e3e3e3;
}

.was-validated .form-control:invalid:focus,
.form-control.is-invalid:focus {
  border-color: #D73D24 !important;
  box-shadow: 0 0 0 1.5px #D73D24 !important;
}

.was-validated .form-control:invalid,
.form-control.is-invalid {
  border-color: #D73D24 !important;
  box-shadow: 0 0 0 1.5px #D73D24 !important;
}
.custom-validate {
  border-color: #D73D24 !important;
  box-shadow: 0 0 0 1.5px #D73D24 !important;
}

button.btn.btn-outline-secondary.btn-border.text-color.close.ripple-surface-dark {
  -webkit-text-fill-color: #ffffff !important;
}

.form-control.is-invalid {
  margin-bottom: 0;
}

.form-control.is-valid {
  margin-bottom: 0;
}

.form-outline .form-control.is-invalid ~ .form-notch .form-notch-leading,
.form-outline .form-control.is-invalid ~ .form-notch .form-notch-middle,
.form-outline .form-control.is-invalid ~ .form-notch .form-notch-trailing,
.form-select.is-invalid,
.was-validated
.form-outline
.form-control:invalid
~ .form-notch
.form-notch-leading,
.was-validated
.form-outline
.form-control:invalid
~ .form-notch
.form-notch-middle,
.was-validated
.form-outline
.form-control:invalid
~ .form-notch
.form-notch-trailing,
.was-validated .form-select:invalid {
  border-color: #D73D24 !important;
}

input.bg-input::placeholder,
textarea.bg-input::placeholder {
  color: $light-1 !important;
  opacity: 1;
}

p.input-field-block label.floating-number {
  left: 0px;
  color: $dark-2 !important;
  font-size: 14px;
  font-weight: 400;
}

.form-floating.fullname > label {
  left: 14px;
}

/** FORM INPUT NEW */
p.input-field-block {
  box-sizing: border-box;
  border-radius: 12px;
  margin-bottom: 0;
  display: flex;

  #bg-input {
    border: 2px solid $light-2 !important;
    // min-width: 417px;
    max-height: 56px;
  }
}

.address-book .form-floating > .form-control:focus ~ label,
.address-book .form-floating > .form-control:not(:placeholder-shown) ~ label {
    font-size: 12px;
    font-weight: 400;
    color: $dark-2 !important;
    opacity: 1;
    transform:  translateY(-0.7rem) translateX(0rem);
}

.address-book .form-floating > .form-select.active ~ label,
.address-book .form-floating > .form-select:focus ~ label,
.address-book .form-floating > .form-select ~ label{
    color: $dark-2 !important;
    font-size: 12px;
    font-weight: 400;
    opacity: 1;
    transform:  translateY(-0.7rem) translateX(0.10rem);
}

.address-book .form-floating > .form-select ~ label {
    color: $dark-2 !important;
    opacity: 1;
    font-size: 14px;
    font-weight: 400;
    transform: translateY(0.0rem) translateX(0.15rem);
}

/** */

@media (max-width: 576px) {
    .profile-address-input p.input-field-block .v-reset-input {
        top: 17px !important;
    }
    .profile-address-input p.input-field-block label {
        top: 0px !important;
    }
}

</style>
