<template>
  <div class="from-contact">
  <form @submit.stop.prevent class="row g-3 needs-validation" novalidate>
      <div class="col-md-12  form-floating fullname" id="position-relative">
          <input
              id="bg-input"
              class="bg-input fullname form-control"
              v-model="fullname"
              :placeholder="$t('from.full-name')"
              type="text"
              pattern="^[a-zA-Zก-๎ ]+$"
              required
          />
          <label
              class="floating-fullname"
              for="floatingFullname"
              >{{$t('from.full-name')}}</label
          >
           <span class="invalid-feedback">
                {{fullname.length > 0 
                ? $t("modals.redeem-detail.validate-email") : $t("modals.redeem-detail.validate-empty") }}
          </span>
      </div>

      <div class="col-md-12 position-relative">
        <p class="input-field-block form-floating">
            <input
                type="text"
                v-model="company"
                :placeholder="$t('from.company-name')"
                id="bg-input"
                class="bg-input company form-control"
            />
            <label class="floating-company" for="floatingCompany">
              {{$t('from.company-name')}}
            </label>
            <span
                class="v-reset-input"
                :class="
                    company.length > 0
                        ? 'v-reset-input-active'
                        : ''
                "
                @click="company = ''"
                ><span class="iconify-inline" data-icon="heroicons-solid:x" style="color: #4A525F;" data-width="15" data-height="15"></span></span
            >
        </p>
      </div>

      <div class="col-md-12 position-relative">
        <p class="input-field-block form-floating">
            <input
                type="text"
                v-model="email"
                :placeholder="$t('from.email')"
                id="bg-input"
                class="bg-input email form-control"
                pattern="^(?=[^@]*[A-Za-z])([a-zA-Z0-9])(([a-zA-Z0-9])*([._-])?([a-zA-Z0-9]))+@(([a-zA-Z0-9]))+([.])+([a-zA-Z]{2,4})+$"
                required
            />
            <label class="floating-email" for="floatingEmail">
              {{$t('from.email')}}
            </label>
            <span class="invalid-feedback" style="top: 54px">
              {{ email.length > 0 ? !validEmail(email) ? $t("modals.redeem-detail.validate-email"): '':$t("validation.field-error_empty") }}
            </span>
            <span
                class="v-reset-input"
                :class="
                    email.length > 0
                        ? 'v-reset-input-active'
                        : ''
                "
                @click="email = ''"
                ><span class="iconify-inline" data-icon="heroicons-solid:x" style="color: #4A525F;" data-width="15" data-height="15"></span></span
            >
        </p>
      </div>

      <div class="col-md-12 position-relative">
        <div class="form-floating">
            <textarea
                class="bg-input message form-control"
                :placeholder="$t('from.message')"
                id="bg-input"
                v-model="message"
                rows="3"
                style="
                  min-height: 124.5px;
                  resize: none;
                  color: #4A525F !important;
                  border: 0px !important;
                "
                required
            ></textarea>
            <label
                class="floating-message"
                for="floatingTextareaMessage"
                >{{$t('from.message')}}</label
            >
            <div class="invalid-feedback">
                {{ $t("validation.field-error_empty") }}
            </div>
        </div>
      </div>

      <div class="col-md-12 custom-submit-botton">
        <div class="custom-submit-botton">
          <b-button
            type="submit"
            @click="sendEmail"
            :disabled="isDisable"
            class="btn btn-preorder btn-border text-color"
            style="
              width: 192px;
              height: 52px;
              border: 0px;
              font-size: 18px;
              align-items: center;
              text-align: center;
              letter-spacing: -0.015em;
              z-index: 2;
            "
            >{{ $t("common.send-btn") }}</b-button
          >
        </div>
      </div>
  </form>
  
  
  </div>
</template>

<script>
import {mapActions} from "vuex";
import {vuexTypes} from "@/store/modules/types";

export default {
  name: "from-contact",
  data: () => {
    return {
      fullname: "",
      email: "",
      company: "",
      message: "",
      isDisable: false,
    };
  },
  mounted() {
    const forms = document.querySelectorAll(".needs-validation");
    Array.prototype.slice.call(forms).forEach((form) => {
      form.addEventListener(
        "submit",
        (event) => {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add("was-validated");
        },
        false
      );
    });
  },
  methods: {
    ...mapActions({
      sendEmailContactUs: vuexTypes.SEND_EMAIL_CONTACT_US,
    }),
    async sendEmail() {
      
      let fullname = document.querySelector(".bg-input.fullname");

      if(!this.validEmail(this.email) || this.email.length < 1 || this.fullname.length < 1 || !fullname.checkValidity() || this.message.length < 1) return
      this.isDisable = true
      await this.sendEmailContactUs({
        'email': this.email,
        'fullName': this.fullname,
        'message': this.message,
        'companyName': this.company,
      })

      this.$router.go()
    },
    validate: function () {
      if (!this.validEmail(this.email)) {
        this.valid = false;
        return
      }
    },
    validEmail (email) {
      let re = /^(?=[^@]*[A-Za-z])([a-zA-Z0-9])(([a-zA-Z0-9])*([._-])?([a-zA-Z0-9]))+@(([a-zA-Z0-9]))+([.])+([a-zA-Z]{2,4})+$/;
      if(email != '' &&  !re.test(email.toLowerCase())) {
        return false;
      }

      return true
    },
  }
};
</script>

<style lang="scss" scoped>
@import "~mdb-ui-kit/css/mdb.min.css";
@import "~@/scss/_variables.scss";

label.form-label.contact {
  color: #87898e !important;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  margin-top: 1rem;
}

.position-relative {
  position: relative !important;
  margin-top: 4.5rem;
}

.from-contact {
  margin-top: 2rem;
}

.custom-submit-botton {
  display: flex;
  justify-content: end;
  margin-top: 1.5rem;
}

button.btn.submit.btn-primary {
  width: 192px;
  height: 52px;
  font-weight: bold;
  font-size: 18px;
  line-height: 36px;
  align-items: center;
  text-align: center;
  letter-spacing: -0.015em;
  color: #ffffff;
}

svg.iconify.iconify--bi.trailing {
  border: 2px solid #484c56 !important;
  border-radius: 50%;
  width: 21.5px;
  height: 21.5px;
  color: #9f9f9f !important;
}

.form-control.active ~ .form-label.contact-name,
.form-control:focus ~ .form-label.contact-name {
  transform: translateY(-1rem) translateY(0.1rem) scale(0.8);
}

label.form-label.contact-name {
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #87898e !important;
  margin-top: 1rem;
}

.form-outline.text-area {
    border: 2px solid #C8D3D7 !important;
    box-sizing: border-box;
    border-radius: 12px;
    height: 128px;
}

@media (min-width: 992px) { // Desktop
  #position-relative {
    margin-top: 6.5rem !important;
  }
}

#bg-input {
  background: #F0F1F3 !important;
  border: 2px solid #C8D3D7 !important;
  box-sizing: border-box;
  border-radius: 12px;
  color: $dark-1 !important;
  margin-bottom: 0;
}

.invalid-feedback {
  font-size: 12px !important;
  font-style: normal !important;
  font-weight: 400 !important;
  line-height: 16px !important;
  letter-spacing: 0em !important;
  margin-left: 0.9rem;
  text-align: left !important;
  color: #D73D24 !important;
}

.invalid-input-email {
  font-size: 12px !important;
  font-style: normal !important;
  font-weight: 400 !important;
  line-height: 16px !important;
  letter-spacing: 0em !important;
  margin-left: 0.9rem;
  text-align: left !important;
  color: #D73D24 !important;
}

.bg-input.fullname.form-control,
.bg-input.fullname.form-control:focus,
.bg-input.company.form-control,
.bg-input.company.form-control:focus,
.bg-input.email.form-control,
.bg-input.email.form-control:focus,
.bg-input.message.form-control,
.bg-input.message.form-control:focus {
  color: $white-bg;
}

.was-validated .form-control:invalid:focus,
.form-control.is-invalid:focus {
  border: 2px solid #EE8877 !important;
  box-shadow: 0 0 0 1.5px rgb(238 136 119) !important;
}

.was-validated .form-control:invalid,
.form-control.is-invalid {
  border: 2px solid #EE8877 !important;
  box-shadow: 0 0 0 1.5px rgb(238 136 119) !important;
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
  border: 2px solid #EE8877 !important;
}

input.bg-input::placeholder,
textarea.bg-input::placeholder {
  color: #F0F1F3 !important;
  opacity: 1;
}

label.floating-company,
label.floating-message,
label.floating-fullname,
p.input-field-block label.floating-email {
  color: #87898e !important;
  font-size: 14px;
  font-weight: 400;
}

.form-floating.fullname > label {
  left: 14px;
}

p.input-field-block #bg-input {
    border: 2px solid #C8D3D7 !important;
    max-height: 56px;
}

p.input-field-block {
  box-sizing: border-box;
  border-radius: 12px;
  margin-bottom: 0;
  display: flex;

  .form-control {
    border: none;
    background-color: transparent !important;
    width: 100%;
    font-size: 16px !important;
    font-weight: 500;
  }

  .form-control:focus {
    box-shadow: none !important;
  }

  .v-reset-input {
    cursor: pointer !important;
    position: absolute !important;
    float: right;
    top: 17px;
    right: 13px;
    padding-right: 0px;
    font-weight: normal !important;
    display: none;
    width: 21.5px;
    height: 21.5px;
    line-height: 19px;
    border-radius: 50%;
    border: solid 1px #484c56;
    text-align: center;
    color: $dark-1;
  }

  .v-reset-input-active {
    display: block;
  }

  #bg-input {
    border: 2px solid #C8D3D7 !important;
    // min-width: 417px;
    max-height: 56px;
  }
}

button.btn.btn-border.btn-preorder.btn-secondary.text-color {
    background: #F7CA38;
    border-radius: 6px;
    border: 0px;
    color: $dark-1 !important;
    font-weight: 600 !important;
    font-size: 16px;
    line-height: 16px;
}
</style>