<template>
  <div class="section-profile-setting">
      <div class="container">
        <div class="row">
          <div class="text-title">
            <p>{{ $t("profile-setting.title") }}</p>
          </div>
        </div>
        <div class="row setting-custom">
            <div class="col-lg-4 col-md-4 col-sm-12 avatar-setting">
                <div class="avatar-profile-setting">
                    <p class="title-medium">
                      {{ $t("profile-setting.image") }}
                    </p>
                    <image-input v-model="avatar">
                      <div class="image-profile" slot="activator">
                        <b-avatar
                          v-if="!avatar"
                          size="118px"
                          class="grey lighten-3 mb-3"
                          badge-variant="secondary" 
                          badge-offset="auto"
                          :src="default_img_profile"
                          >
                          <div 
                          slot="badge"
                          variant="outline-dark"
                          >
                            <span
                                class="iconify"
                                data-icon="prime:pencil"
                                data-width="12.99"
                                data-height="12.99"
                                style="vertical-align: middle; margin-top: 0.25rem;"
                            >
                            </span>
                          </div>
                        </b-avatar>
                        <b-avatar 
                        v-else
                        size="118px" 
                        :ripple="false"
                        badge-variant="secondary" 
                        badge-offset="auto"  
                        class="mb-3"
                        :src="avatar.imageURL">
                        <div 
                          slot="badge"
                          variant="outline-dark"
                          >
                            <span
                                class="iconify"
                                data-icon="prime:pencil"
                                data-width="12.99"
                                data-height="12.99"
                                style="vertical-align: middle; margin-top: 0.25rem;"
                            >
                            </span>
                          </div>
                        </b-avatar>
                      </div>
                    </image-input>
              </div>
          </div>
          <!-- end image profile setting -->
          <div class="col-lg-8 col-md-8 col-sm-12 form-setting">
            <form
                  @submit.stop.prevent
                  class="address-book needs-validation"
                  novalidate
            >
              <div class="row form-setting">
                <div class="col-md-12 form-floating">
                    <p class="input-field-block form-floating">
                      <input
                          type="text"
                          v-model="username"
                          :class="username.length > maxCharacterUsername ? 'was-validated' : ''"
                          class="bg-input fullname form-control"
                          :state="validateName"
                          :maxlength="maxCharacterUsername"
                          :placeholder="$t('profile-setting.username')"
                          required
                          id="floatingFullname"
                          @keyup="charUsernameCount()"
                      />
                      <label
                          class="floating-fullname"
                          for="floatingFullname"
                      >{{$t('profile-setting.username')}}</label>
                      <span class="v-reset-input" :class="username.length > 0 ? 'v-reset-input-active': ''" @click="resetUsername()">
                          <span class="iconify-inline" data-icon="heroicons-solid:x" style="color: #4A525F; vertical-align: -0.2em;" data-width="15" data-height="15"></span>
                      </span>
                    </p>
                    <div :class="username === '' ? 'validate-text' : 'only-count-no'">
                      <span :class="validName(username) ? 'invalid-feedback': 'invalid-input'" > {{$t('validation.field-error_characterUsername')}}</span>
                      <span :class="username.length > maxCharacterUsername || username.length == 0? 'count-character-input' : 'count-character'">{{charUsername}}/{{maxCharacterUsername}}</span>
                    </div>
                </div>
                <!-- E-mail setting -->  
                <div class="col-md-12 form-floating email mt-3">
                    <p class="input-field-block form-floating">
                      <input
                          type="text"
                          v-model="email"
                          :class="email.length > maxCharacterEmail ? 'was-validated' : ''"
                          :maxlength="maxCharacterEmail"
                          :placeholder="$t('profile-setting.email')"
                          class="bg-input email form-control"
                          id="floatingEmail"
                          pattern="(?=[^@]*[A-Za-z])([a-zA-Z0-9])(([a-zA-Z0-9])*([._-])?([a-zA-Z0-9]))+@(([a-zA-Z0-9]))+([.])+([a-zA-Z]{2,4})+$"
                          @keyup="charEmailCount()"
                      />
                      <label
                          class="floating-email"
                          for="floatingInputEmail"
                      >{{$t('profile-setting.email')}}</label>
                      <span class="v-reset-input" :class="email.length > 0 ? 'v-reset-input-active': ''" @click="resetEmail()">
                          <span class="iconify-inline" data-icon="heroicons-solid:x" style="color: #4A525F; vertical-align: -0.2em;" data-width="15" data-height="15"></span>
                      </span>
                    </p>
                    <div :class="email.length > maxCharacterEmail || validEmail(email) === false ? 'validate-text' : 'only-count-no'">
                      <span :class="validEmail(email) ? 'invalid-feedback': 'invalid-input'" > {{ $t("modals.redeem-detail.validate-email") }}</span>
                      <span :class="email.length > maxCharacterEmail ? 'count-character-input' : 'count-character'">{{charEmail}}/{{maxCharacterEmail}}</span>
                    </div>
                </div>
                <!-- Wallet Address setting --> 
                <div class="col-md-12 form-outline mt-3">
                  <p class="title-medium wallet-address"> {{$t('profile-setting.address-wallet')}}</p>
                    <a class="copy-clipboard" href="javascript:void(0);" @click="copyContractAddress()">
                      <span
                        class="iconify trailing"
                        data-icon="bx:copy"
                        style="color: #4A525F;"
                        data-width="24"
                        data-height="24"
                      ></span>
                        <input
                          type="text"
                          id="wallet-address"
                          class="bg-input form-control"
                          :value="wallet"
                          />
                    </a>
                    <input type="hidden" id="hidden-wallet-address" :value="wallet_account">
                </div> 
                <div class="col-md-12 form-outline">
                  <button
                    type="submit"
                    class="btn btn-md btn-preorder btn-border text-color float-right"
                    style="width: 192px; height: 52px; margin-top: 5rem; margin-bottom: 7rem"
                    @click="saveSetting()"
                  >
                  {{ $t("common.save-btn") }}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <b-modal id="modal-error" size="sm" hide-footer ok-only no-stacking centered>
            <div class="d-block text-center error-text">
              <span class="iconify" data-icon="mdi:alert-circle" style="color: #d66463" data-width="96"
                    data-height="96"></span>
            <p class="mt-4" style="word-break: break-word;" text-center>{{textError}}</p>
        </div>
      </b-modal>
      </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {vuexTypes} from "@/store/modules/types";
import ImageInput from "@/components/common/ImageInput.vue";

import ServiceProfile from "@/data/ServiceProfile.json";
import moment from "moment";

export default {
  name: "section-profile-setting",
  data: () => {
    return {
      avatar: null,
      saving: false,
      saved: false,
      banner: null,
      text: "This will get copied!",
      show: true,
      username: "",
      email: "",
      image_profile: ServiceProfile.profile_setting.image_profile,
      image_banner: ServiceProfile.profile_setting.image_banner,
      textError: "",
      maxCharacterUsername: process.env.VUE_APP_PROFILE_CHARACTER_NAME,
      charUsername: 0,
      maxCharacterEmail: process.env.VUE_APP_PROFILE_CHARACTER_EMAIL,
      charEmail: 0,
      default_img_profile: ""
    };
  },
  components: {
    ImageInput: ImageInput,
  },
  props: {
    wallet: { type: String, required: true },
    wallet_account: { required: true }
  },
  watch: {
    avatar: {
      handler: function () {
        this.saved = false;
      },
      deep: true,
    },
    banner: {
      handler: function () {
        this.saved = false;
      },
      deep: true,
    },
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
      userModel: vuexTypes.userModel,
      metamaskAccount: vuexTypes.metamaskAccount,
    }),
    validateName() {
      return this.username.length > 0 && this.username.length <= this.maxCharacterUsername;
    },
  },
  mounted() {
    let forms = document.querySelectorAll(".needs-validation");
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
     form.addEventListener(
          "submit",
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

    this.$root.$on('setting-data' , async () => {
      await this.initLoad()
    })
    this.$root.$on("error-image", (data) => {
        this.openModalError(data)
    });
  },
  beforeDestroy(){
    this.$root.$off('setting-data')
  },
  methods: {
    ...mapActions({
      myProfile: vuexTypes.MY_PROFILE,
      editProfile: vuexTypes.EDIT_MY_PROFILE,
      disconnect: vuexTypes.DISCONNECT_METAMASK
    }),
    async initLoad() {

      if ( Number(localStorage.getItem('authorization_expire')) < moment().unix()) {
          this.$root.$emit('bv::show::modal', 'modal-login')
          await this.$router.push('/');
          await this.disconnect()
      }
      await this.myProfile()
      
      if (this.userModel.avatarUrl) {
        this.default_img_profile = this.userModel.avatarUrl
      } else {
         this.default_img_profile = this.getImgUrl("Img_ProfileDefault.png");
      }
  
      this.avatar = {
        imageURL: this.userModel.avatarUrl
      };

      this.username = this.userModel.customerName;
      this.charUsername = this.username.length;
      this.email = this.userModel.email;
      this.charEmail = this.email.length;
    },
    uploadImage() {
      this.saving = true;
      setTimeout(() => this.savedAvatar(), 1000);
    },
    savedAvatar() {
      this.saving = false;
      this.saved = true;
    },
    copyContractAddress() {
        let hiddenToCopy = document.querySelector('#hidden-wallet-address')
        hiddenToCopy.setAttribute('type', 'text')
        hiddenToCopy.select()
        document.execCommand('copy')
        hiddenToCopy.setAttribute('type', 'hidden')
        window.getSelection().removeAllRanges()
    },
    getImgUrl(name) {
      let images = require.context("@/assets/profile/", false, /\.png$/);
      return images("./" + name);
    },
    async saveSetting() {
      if(this.username.length < 1 || this.username.length > this.maxCharacterUsername) return

      if((this.email.length > 0 && this.email.length > this.maxCharacterEmail) || !this.validEmail(this.email))return

      await this.editProfile({
       'username': this.username,
       'avatar': this.avatar.imageFile,
       'email': this.email,
       'update_avatar': this.avatar.imageFile != undefined
      })
      this.$root.$emit("load-profile");
    },
    openModalError(data){
      this.textError = data
      this.$bvModal.show("modal-error");
    },
    validate: function () {
        this.emailBlured = true;
        if (!this.validName(this.username)) {  
          this.valid = false;
          return
        }
        if (!this.validEmail(this.email)) {
          this.valid = false;
          return
      }
    },
    validName: function (name) {
      let countCharacter = this.maxCharacterUsername;
      if (name.length <= 0 || name.length > countCharacter) {
          return false;
      }
      return true;
    },
    validEmail: function (email) {
      let re = /^(?=[^@]*[A-Za-z])([a-zA-Z0-9])(([a-zA-Z0-9])*([._-])?([a-zA-Z0-9]))+@(([a-zA-Z0-9]))+([.])+([a-zA-Z]{2,4})+$/;
      if(email &&  !re.test(email.toLowerCase())|| email.length > this.maxCharacterEmail) {
        return false;
      }
      return true;
    },
    charUsernameCount: function() {
      this.charUsername = this.username.length;
    },
    charEmailCount: function() {
      this.charEmail = this.email.length;
    },
    resetUsername() {
      this.username = '';
      this.charUsername = this.username.length;
    },
    resetEmail() {
      this.email = '';
      this.charEmail = this.email.length;

    }
  },
};
</script>


<style lang="scss" scoped>
@import "~@/scss/_variables.scss";

.bg-input {
  background: $light-1 !important;
  border: 2px solid $light-2 !important;
  box-sizing: border-box;
  border-radius: 12px;
  color: $dark-1 !important;
  margin-bottom: 0;
}

.validate-text {
  display: flex; 
  justify-content: space-between;
}

.only-count-no {
  justify-content: right;
}

.text-title {
  margin-top: 4rem;
  text-transform: uppercase !important;
}

p.title-medium {
  font-size: 20px;
  line-height: 28px;
  
  &.wallet-address {
    font-size: 16px;
    line-height: 22px;
    margin-bottom: 8px;
  }
}

.avatar-setting {
  display: flex;
  justify-content: center;
  text-align: center;
}

.col-md-12.avatar-profile-setting {
  margin-top: 2rem;
}

img.profile-avatar {
  width: 100%;
  height: auto;
  position: absolute;
}

.image-profile {
  margin-top: 0.5rem;
}

.col-md-12.avatar-banner-setting {
  margin-top: 1rem;
}

img.profile-banner {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 6px;
}

.setting-banner {
  width: 192px;
  height: 94px;
}

.image-banner {
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
}

.form-outline.mb-4 {
  width: 100%;
  height: 54px;
  background: #23262f;
  border: 2px solid #484c56;
  box-sizing: border-box;
  border-radius: 12px;
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
}
.form-control.is-valid, .was-validated .form-control:valid {
  margin-bottom: 0 !important;
}

.was-validated .form-control:invalid:focus,
.form-control.is-invalid:focus {
  border: 2px solid #EE8877 !important;
  box-shadow: 0 0 0 1.5px rgb(238 136 119) !important;
}

.was-validated .form-control:invalid,
.form-control.is-invalid {
  border-color: #EE8877 !important;
  box-shadow: 0 0 0 1.5px #EE8877 !important;
}

.form-control.is-invalid {
  margin-bottom: 0;
}

.form-floating>.form-control:focus~label, 
.form-floating>.form-control:not(:placeholder-shown)~label, 
.form-floating>.form-select~label {
  opacity: 1;
}

.form-setting {
  width: 520px;
}

.form-outline .form-control {
  color: white;
}


i.far.fa-times-circle.trailing {
  width: 21.5px;
  height: 21.5px;
  top: 28px;
}

svg.iconify.iconify--la.trailing {
  width: 21.5px;
  height: 21.5px;
  color: #9F9F9F;
}

@media only screen and (max-width: 1024px) {
  .form-setting {
    width: auto;
  }
}

@media only screen and (max-width: 768px) {
  .form-setting {
    margin-top: 0.5rem;
  }
}

@media (max-width: 576px) {
  .section-profile-setting .title {
      text-align: center !important;
  }
}

.row.setting-custom {
    margin-top: 53px;
}

input#wallet-address {
    min-height: 56px;
    background: $light-1 !important;
    border-radius: 12px;
    border: 0px !important;
    font-weight: 500;
    font-size: 16px;
    line-height: 30px;
    letter-spacing: -0.015em;
    color: $dark-1 !important;
}

svg.iconify.iconify--bx {
    position: absolute;
    margin: 1.25rem 0rem;
    right: 5%;
}

span.count-character-input {
    font-size: 10px;
    color: red;
    text-align: end;
    display: block;
    // margin: -0.85rem 0.5rem;
}

span.count-character {
    font-size: 10px;
    color: red;
    text-align: end;
    display: block;
    // margin: -0.85rem 0.5rem;
}

.iconify.trailing {
  pointer-events: all;
  cursor: pointer;
}

.was-validated {
  border-color:#EE8877 !important;
}

.was-validated .form-control:invalid:focus,
.form-control.is-invalid:focus {
  border: 2px solid #EE8877 !important;
  box-shadow: 0 0 0 1.5px rgb(238 136 119) !important;
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
  border-color: #EE8877 !important;
}

</style>