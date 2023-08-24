<template>
  <div class="contact container">
    <div class="row">
      <div class="col-lg-6 col-md-12 col-sm-12 card-layer">
        <div class="contact-about-us">
          <div class="card-contact">
            <!-- section title -->
            <div class="contact-title">
              <h1 class="text-title">{{ $t("contact.title-contact-us") }}</h1>
              <h1 class="text-title">
                {{ $t("contact.title-contact") }}
              </h1>
              <p class="text-detail" style="justify-content: center;">
                {{ $t("contact.detail") }}
              </p>
            </div>
            <!-- section contact -->
            <div class="contact-contents">
              <div class="row">
                <div class="col-md-12 contact-us">
                  <div class="icon-circle">
                    <span class="iconify" data-icon="eva:email-outline" data-width="18" data-height="18" style="margin-left: 4.5px;"></span>
                  </div>
                  <span class="text-icon">{{
                    $t("contact.email-contact")
                  }}</span>
                </div>
                <!-- section 2 -->
                <div class="col-md-12 contact-us">
                  <div class="icon-circle">
                    <span class="iconify" data-icon="lucide:phone" data-width="18" data-height="18" style="margin-left: 4.5px;"></span>
                  </div>
                  <span class="text-icon">{{
                    $t("contact.phone-contact")
                  }}</span>
                </div>
                <!-- section 3 -->
                <div class="col-md-12 contact-us">
                  <div class="icon-circle">
                    <span class="iconify" data-icon="ep:location" data-width="19" data-height="19" style="margin-left: 3.5px !important;"></span>
                  </div>
                  <span class="text-icon">
                    <p class="text-detail-icon">
                      {{ $t("contact.address-1") }}
                    </p>
                    <p class="text-detail-icon">
                      {{ $t("contact.address-2") }}
                    </p>
                    <p class="text-detail-icon">
                      {{ $t("contact.address-3") }}
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end section card -->
      <div class="col-lg-6 col-md-12 col-sm-12 form-contact">
        <div class="row custom-form-contact">
          <p><from-contact /></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FromContact from '@/components/common/FromContact.vue';

export default {
  components: { FromContact },
  name: "contact",
  data: () => {
    return {
      show: true,
      company: "",
      name: "",
      email: "",
      emailBlured: false,
      valid: false,
      submitted: false,
      message: "",
    };
  },
  computed: {
    nameState() {
      return this.name.length > 0;
    },
    messageState() {
      return this.message.length > 0;
    },
    emailState() {
      return this.email.length > 0;
    },
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
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
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/About.scss";
@import "~@/scss/_variables.scss";

.contact {
  overflow: hidden;
  color: $dark-2;
}

.contact-about-us {
  height: 720px;
  margin-top: 3rem;
  margin-bottom: 3rem;
  background: $white-bg;
  box-shadow: 0px 2px 12px 2px rgba(0, 0, 0, 0.05);
  border-radius: 18px;
}

.contact-title {
  padding-left: 1rem;
  padding-right: 1rem;
  font-style: normal;
  font-weight: 600;
  letter-spacing: -0.015em;
}

.contact-contents {
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 77px;
}

h1.text-title {
  font-size: 54px;
  line-height: 70px;
  color: $yellow;

  @media (max-width: 390px) {
    font-size: 45px;
    line-height: 60px;
  }

  @media (max-width: 320px) {
    font-size: 38px;
    line-height: 55px;
  }
}

p.text-detail {
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    margin-top: 22px;
}

.icon-circle {
  width: 28px;
  height: 27.97px;
  border-radius: 50%;
  color: $dark-1;
  border: 1px solid $yellow;
  background: #E5E5E5;
  box-sizing: border-box;
}

i.far.fa-envelope {
  padding-top: 0%;
  padding-left: 15%;
  width: 13.5px !important;
  height: 5.25px !important;
}

span.text-icon {
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    margin-left: 1rem;
}

.col-md-12.contact-us {
  display: flex;
  margin-bottom: 2.5rem;
}

img.img-icon {
  padding-left: 10%;
  margin-bottom: 5%;
}

p.text-detail-icon {
  margin-bottom: 0;
}

.image-bg {
  display: flex;
  position: absolute;
  width: 100%;
  height: 100px;
}

.top {
  bottom: 95%;
  left: 60%;
}

.bottom {
  top: 45rem;
  left: 5%;
}

.card-contact {
  padding-top: 10%;
  padding-bottom: 10%;
  padding-left: 3rem;
  padding-right: 3rem;
}

@media (max-width: 992px) { // Desktop
  .card-contact {
    padding-top: 10%;
    padding-bottom: 10%;
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

.col-md-6.card-layer {
  display: flex;
  justify-content: center;
}

.col-md-6.form-contact {
  display: flex;
  justify-content: center;
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;
  padding-right: 2.5rem;
}

@media (min-width: 992px) {
  .row.custom-form-contact {
    width: 90%;
  }
}
@media (max-width: 768px) {
  .contact .custom-form-contact .from-contact {
    margin-top: 0;
  }

  .contact-title {
    padding-left: 0;
    padding-right: 0;
  }
}

input#input {
  padding: 1rem 1rem 1rem 1rem;
  background-color: #23262f;
  border: 2px solid #484c56;
  box-sizing: border-box;
  border-radius: 12px;
  color: #87898e;
}

textarea#textarea-state {
  padding: 1rem 1rem 1rem 1rem;
  background-color: #23262f;
  border: 2px solid #484c56;
  box-sizing: border-box;
  border-radius: 12px;
}

div#input-live-feedback {
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #ee8877;
}

.col-md-12.custom-submit-botton {
  display: flex;
  justify-content: flex-end;
  margin-top: 3rem;
}

button.btn.submit.btn-primary {
  width: 192px;
  height: 52px;
  border-radius: 6px;
  background: linear-gradient(89.66deg, #962eff 2.15%, #3106bb 99.71%);
  border-radius: 6px;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 36px;
  align-items: center;
  text-align: center;
  letter-spacing: -0.015em;
  color: #ffffff;
}

h1.text-title {
    margin-left: 0rem;
}
</style>
