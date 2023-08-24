<template>
  <div class="footer-detail">
    <footer class="footer-bg text-white text-lg-start">
      <div class="container-fluid">
        <div class="line-footer">
          <hr class="line" />
        </div>
        <div class="row logo-content">
          <!-- form input -->
          <div class="col-md-8">
            <h5 class="text-form-footer">{{ $t("footer.form-title") }}</h5>
            <div class="row form-input-footer">
              <form @submit.stop.prevent class="form-footer needs-validation" novalidate>
                <input
                  id="input-footer"
                  v-model="email"
                  :class="formValidEmail ? 'form-valid' : 'mr-sm-2 input-black'"
                  :placeholder='$t("footer.your-e-mail")'
                  required
                >
                <span class="invalid-feedback" style="top: 85px; left: 0;" :class="formValidEmail ? 'invalid-input' : ''">
                  {{ $t('validation.field-error_email-format') }}
                </span>
                  <button
                  style="
                    max-height: 40px;
                    font-size: 16px;
                    line-height: 24px;"
                    type="submit"
                    class="btn btn-sign-in text-color"
                    @click="onSubmit()"
                  >
                    {{ $t("footer.btn-submit") }}
                  </button>
              </form>
            </div>
          </div>
          <!-- contact -->
          <div class="col-md-4">
            <div class="row icon-join-us ">
              <h5 class="text-title-footer group-content-right">
                {{ $t("footer.join-us") }}
              </h5>
              <div class="col-md-12 icon-social group-content-right" style="padding-left: 10px;">
                <button type="nav-link" class="btn-top-icon mx-2" style="margin-left : 0px !important;">
                  <i
                    class="fab fa-facebook-f"
                  ></i>
                </button>
                <button type="nav-link" class="btn-top-icon mx-2">
                  <img style="margin: 0.5rem -0.5rem !important;" alt="" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzLjEyNzUgMEg0Ljg3MjQzQzIuMTg1NzMgMCAwIDIuMTg1NzMgMCA0Ljg3MjQzVjEzLjEyNzdDMCAxNS44MTQyIDIuMTg1NzMgMTggNC44NzI0MyAxOEgxMy4xMjc3QzE1LjgxNDIgMTggMTggMTUuODE0MiAxOCAxMy4xMjc3VjQuODcyNDNDMTggMi4xODU3MyAxNS44MTQyIDAgMTMuMTI3NSAwVjBaTTE2Ljk0NDcgMTMuMTI3N0MxNi45NDQ3IDE1LjIzMjQgMTUuMjMyNCAxNi45NDQ3IDEzLjEyNzUgMTYuOTQ0N0g0Ljg3MjQzQzIuNzY3NTkgMTYuOTQ0NyAxLjA1NTIzIDE1LjIzMjQgMS4wNTUyMyAxMy4xMjc3VjQuODcyNDNDMS4wNTUyMyAyLjc2NzU5IDIuNzY3NTkgMS4wNTUyMyA0Ljg3MjQzIDEuMDU1MjNIMTMuMTI3N0MxNS4yMzI0IDEuMDU1MjMgMTYuOTQ0NyAyLjc2NzU5IDE2Ljk0NDcgNC44NzI0M1YxMy4xMjc3WiIgZmlsbD0id2hpdGUiLz4KPHJlY3Qgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiByeD0iNSIgZmlsbD0iI0ZBRkFGQSIvPgo8cGF0aCBkPSJNOC45OTk4NSA0LjA3ODEyQzYuMjg1OTYgNC4wNzgxMiA0LjA3ODEyIDYuMjg1OTYgNC4wNzgxMiA4Ljk5OTg1QzQuMDc4MTIgMTEuNzEzNyA2LjI4NTk2IDEzLjkyMTYgOC45OTk4NSAxMy45MjE2QzExLjcxMzcgMTMuOTIxNiAxMy45MjE2IDExLjcxMzcgMTMuOTIxNiA4Ljk5OTg1QzEzLjkyMTYgNi4yODU5NiAxMS43MTM3IDQuMDc4MTIgOC45OTk4NSA0LjA3ODEyWk04Ljk5OTg1IDEyLjg2NjNDNi44Njc5NiAxMi44NjYzIDUuMTMzMzYgMTEuMTMxOSA1LjEzMzM2IDguOTk5ODVDNS4xMzMzNiA2Ljg2Nzk2IDYuODY3OTYgNS4xMzMzNiA4Ljk5OTg1IDUuMTMzMzZDMTEuMTMxOSA1LjEzMzM2IDEyLjg2NjMgNi44Njc5NiAxMi44NjYzIDguOTk5ODVDMTIuODY2MyAxMS4xMzE5IDExLjEzMTkgMTIuODY2MyA4Ljk5OTg1IDEyLjg2NjNaIiBmaWxsPSIjRjdDQTM4Ii8+CjxwYXRoIGQ9Ik0xNC4wMzgzIDIuMzMwMDhDMTMuMjM2MyAyLjMzMDA4IDEyLjU4NCAyLjk4MjUzIDEyLjU4NCAzLjc4NDM5QzEyLjU4NCA0LjU4NjM5IDEzLjIzNjMgNS4yMzg4NCAxNC4wMzgzIDUuMjM4ODRDMTQuODQwMyA1LjIzODg0IDE1LjQ5MjcgNC41ODYzOSAxNS40OTI3IDMuNzg0MzlDMTUuNDkyNyAyLjk4MjM5IDE0Ljg0MDMgMi4zMzAwOCAxNC4wMzgzIDIuMzMwMDhaTTE0LjAzODMgNC4xODM0N0MxMy44MTgzIDQuMTgzNDcgMTMuNjM5MiA0LjAwNDM5IDEzLjYzOTIgMy43ODQzOUMxMy42MzkyIDMuNTY0MjUgMTMuODE4MyAzLjM4NTMxIDE0LjAzODMgMy4zODUzMUMxNC4yNTg0IDMuMzg1MzEgMTQuNDM3NSAzLjU2NDI1IDE0LjQzNzUgMy43ODQzOUMxNC40Mzc1IDQuMDA0MzkgMTQuMjU4NCA0LjE4MzQ3IDE0LjAzODMgNC4xODM0N1oiIGZpbGw9IiNGN0NBMzgiLz4KPC9zdmc+Cg==" />
                </button>
                <button type="nav-link" class="btn-top-icon mx-2">
                  <i
                    class="fab fa-twitter"
                  ></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="line-footer">
          <hr class="line" />
        </div>
        <!-- link route -->
        <div class="row logo-content">
          <div class="col-md-6">
            <div class="row">
              <div class="col-6">
                <b-link href="/">
                  <img
                    src="@/assets/img/n-commerce-logo.png"
                    class="mt-1 footer-profile__logo img-fluid"
                    loading="lazy"
                  />
                </b-link>
              </div>
            </div>
            <div class="row">
              <div class="col-11">
                <p class="text-detail-footer">
                  {{ $t("footer.text-detail") }}
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="row detail-contact-footer">
              <div class="col-md-4">
                <h6 class="text-title-contact">
                  {{ $t("footer.my-account") }}
                </h6>
                <ul class="list-unstyled mb-0">
                  <li @click="goToPage('/profile')" style="cursor: pointer">
                   {{$t("nav-bar.menu-profile.profile") }}
                  </li>
                  <li @click="goToPage('/profile/wishlist')" style="cursor: pointer">
                    {{ $t("nav-bar.menu-profile.wishlist") }}
                  </li>
                  <li @click="goToPage('/profile/redeem')" style="cursor: pointer">
                      {{ $t("nav-bar.menu-profile.redeem") }}
                  </li>
                  <li @click="goToPage('/profile/setting')" style="cursor: pointer">
                         {{ $t("nav-bar.menu-profile.setting") }}
                  </li>
                </ul>
              </div>
              <div class="col-md-4">
                <h6 class="text-title-contact">
                  {{ $t("footer.resources") }}
                </h6>
                <ul class="list-unstyled mb-0">
                    <li @click="goToPage('/help')" style="cursor: pointer">
                      {{$t("nav-bar.help-center")
                    }}
                  </li>
                  <li @click="goToPage('/about/partner')" style="cursor: pointer">
                     {{ $t("nav-bar.partner") }}
                  </li>
                  <li @click="goToPage('/roadmap')" style="cursor: pointer">
                    {{$t("nav-bar.roadmap")}}
                  </li>
<!--                  <li>-->
<!--                    <a href="/auth" class="text-white">{{-->
<!--                      $t("footer.authenticator")-->
<!--                    }}</a>-->
<!--                  </li>-->
                  <li @click="goToPage('/about/news')" style="cursor: pointer">
                    {{ $t("footer.newsletter") }}
                  </li>
                </ul>
              </div>
              <div class="col-md-4">
                <h6 class="text-title-contact">{{ $t("footer.company") }}</h6>
                <ul class="list-unstyled mb-0">
                  <li @click="goToPage('/about')" style="cursor: pointer">
                     {{ $t('footer.about-us')}}
                  </li>
                  <li @click="goToPage('/contact')" style="cursor: pointer">
                    {{ $t('footer.contact-us')}}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- end page -->
        <footer-policy />
      </div>
    </footer>
    <!-- Footer -->
      <!-- metamask -->
    <b-modal id="modal-success" size="sm" itle="Purchase" hide-footer ok-only no-stacking centered>
      <div class="d-block text-center sign-in">
        <span class="iconify" data-icon="emojione:white-heavy-check-mark" data-width="96"
              data-height="96" style="color:red"></span>
        <p class="mt-4" text-center>Thanks for signing up!</p>
      </div>
    </b-modal>

  </div>
</template>

<script>
import FooterPolicy from '@/components/common/FooterPolicy.vue';
import {vuexTypes} from '@/store/modules/types'
import {mapActions} from 'vuex'

export default {
  components: { FooterPolicy },
  name: "footer-detail",
  data: () => {
    return {
      email: "",
      formValidEmail: false
    };
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
  },
  methods: {
    ...mapActions({
      subscribeProduct: vuexTypes.SUBSCRIBE_PRODUCT,
    }),
    validEmail(email) {
      let re = /(.+)@(.+){2,}\.(.+){2,}/;
      return re.test(email.toLowerCase());
    },
    onSubmit() {
      let validEmail = this.validEmail(this.email)
      if (!validEmail) {
        this.formValidEmail = true

      } else {
        this.formValidEmail = false
        this.subscribeProduct({
          'email': this.email,
        })

        this.$bvModal.show("modal-success");
      }
    },
    goToPage(path) {
      let nowPath = this.$route.path;
      if(nowPath !== path) {
        this.$router.push(path);
        nowPath = this.$route.path;
      }
      this.slidePage(nowPath);
    },
    slidePage(value) {
      let top = document.getElementById("nav-bar-top");
      if(value.search('/about') == 0 && this.$route.params.action === "partner") {
        top =  document.getElementById("section-partner");
      }
      if(value.search('/about') == 0 && this.$route.params.action === "news") {
        top =  document.getElementById("section-news");
      }
      if(top !== null) {
          setTimeout(() => {
               window.scrollTo(0, top.offsetTop);
            }, window.matchMedia("(max-width: 991px)").matches === true ? 400 : 300);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/scss/_variables.scss";

h5.text-form-footer {
  font-weight: bold;
  font-size: 18px;
  line-height: 36px;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: $dark-1;

  @media (max-width: 992px) {
    font-size: 16px;
  }
}

form.form-footer {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
}

// button.btn.btn.btn-top-color.btn-preorder.me-2.my-sm-2.btn-secondary {
//   width: 17%;
//   padding: 0.5rem;
//   background-color: #3106bb !important;
//   border-color: #3106bb !important;
//   line-height: 22px;

//   @media (max-width: 992px) {
//     width: 36%;
//   }
// }

input#input-footer {
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: -0.015em;
    color: #949494 !important;
    width: 333px;
    height: 40px;
    background: #F0F1F3;
    border-radius: 6px;
    padding: 0rem 1rem;

    @media (max-width: $medium) {
      width: 100%;
    }
}

input#input-footer.form-valid {
  background-image: none !important;
  border-color: #EE8877 !important;
}

.invalid-input {
  display: block !important;
}

a.text-white.disabled {
  color : #999999 !important;
  text-decoration: none !important;
}

input#input-footer::placeholder {
    color: #949494 !important;
}

// h5.text-title-footer {
//   font-weight: bold;
//   font-size: 18px;
//   line-height: 36px;
//   display: flex;
//   align-items: center;
//   letter-spacing: -0.015em;
//   justify-content: end;
//   color: $dark-1;
// }

// @media only screen and (max-width: 768px) {
//   h5.text-title-footer {
//     justify-content: start;
//   }
// }

.col-md-12.icon-social {
  display: inline-flex;
  justify-content: center;
}

p.text-detail-footer {
  margin-top: 1rem;
  font-weight: normal;
  font-size: 16px;
  line-height: 30px;
  letter-spacing: -0.015em;
  color: $dark-2;

  @media (max-width: 992px) {
    margin-right: 0rem;
  }
}

h6.text-title-contact {
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.015em;
  color: $dark-1;
  margin-bottom: 1rem;

  @media (max-width: 992px) {
    margin-top: 1rem;
  }
}

.list-unstyled {
  color: $dark-2;
}

a.text-white {
  font-weight: normal;
  font-size: 16px;
  line-height: 30px;
  letter-spacing: -0.015em;
  color: #E3E3E3 !important;
}

.form-input-footer input#input-footer {
  @media (max-width: 992px) {
    max-width: 60%;
  }
}

.form-input-footer input#input-footer {
  @media (max-width: 768px) {
    max-width: 60%;
  }
}

div.sign-in svg circle {
    fill: rgb(150, 46, 255);
}

.group-content-right {
  justify-content: flex-end !important;

  @media (max-width: 768px) {
    justify-content: flex-start !important;
  }
}

.footer-profile__logo {
  max-width: 192px;
  // min-height: 33px;
}
</style>
