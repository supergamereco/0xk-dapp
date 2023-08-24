<template>
  <div id="nav-bar-top" class="nav-bar">
    <div class="container">
      <b-navbar toggleable="lg" type="light" class="nav-bg-dark" style="z-index:1;">
        <b-navbar-brand @click="goToPage('/')" style="cursor: pointer">
          <div class="nav-img-logo">
            <img
              src="@/assets/img/n-commerce-logo.png"
              height="20"
              loading="lazy"
              class="img-logo"
            />
          </div>
        </b-navbar-brand>

        <b-navbar-toggle id="nav-toggle" target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" v-model="visible" is-nav>
          <b-navbar-nav v-if="showNavigation">
            <b-nav-form class="nav-form"></b-nav-form>
          </b-navbar-nav>
          <b-navbar-nav v-else>
            <div class="vl">
                <span class="iconify" data-icon="ci:line-l"></span>
            </div>
            <p class="text-help">&nbsp;&nbsp;{{ $t("nav-bar.help-center") }}</p>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto" v-if="showNavigation">
            <b-nav-item
              class="text-top-menu"
              right
              no-caret
              @click="goToPage('/how-to-quick-start')"
            >
              <span class="text-nav">{{ $t("nav-bar.quick-start") }}</span>
            </b-nav-item>

            <b-nav-item @click="goToPage('/auth')" class="text-top-menu" right no-caret>
              <span class="text-nav">{{ $t("nav-bar.authenticator") }}</span>
            </b-nav-item>

            <b-nav-item-dropdown :text='$t("nav-bar.resources")' style="margin-top: 0.5rem;" right no-caret>
              <b-dropdown-item @click="goToPage('/help')">{{
                $t("nav-bar.help-center")
              }}</b-dropdown-item>
              <b-dropdown-item @click="goToPage('/about/partner')">{{
                $t("nav-bar.partner")
              }}</b-dropdown-item>
              <b-dropdown-item @click="goToPage('/roadmap')" >{{
                $t("nav-bar.roadmap")
              }}</b-dropdown-item>
              <b-dropdown-item @click="goToPage('/about/news')">{{
                $t("nav-bar.news")
                }}</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown right no-caret>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <button class="btn-top-border">
                  <span
                    class="iconify icon"
                    data-icon="akar-icons:globe"
                    style="width: 24px !important; height: 24px; margin: -0.25rem"
                  ></span>
                </button>
              </template>
              <b-dropdown-item @click="changeLang('en')">{{ $t("nav-bar.eng") }}</b-dropdown-item>
              <b-dropdown-item @click="changeLang('th')">{{ $t("nav-bar.thai") }}</b-dropdown-item>
            </b-nav-item-dropdown>

            <!-- notification -->
            <b-nav-dropdown v-if="isMetamaskConnected" right no-caret disabled>
              <template #button-content>
                <button class="btn-top-border" style="width: 40px; height: 40px">
                  <span
                    class="iconify"
                    data-icon="ph:bell"
                    style="width: 24px !important; height: 24px; margin: -0.25rem"
                  ></span>
                </button>
              </template>
            </b-nav-dropdown>

            <!-- profile -->
            <b-nav-item-dropdown right no-caret>
              <template #button-content>
                <button class="btn-top-border">
                  <span
                    class="iconify"
                    data-icon="ant-design:user-outlined"
                    style="width: 24px !important; height: 24px; margin: -0.25rem"
                  ></span>
                </button>
              </template>
              <b-dropdown-item @click="goToPage('/profile')">{{
                $t("nav-bar.menu-profile.profile")
              }}</b-dropdown-item>
              <b-dropdown-item @click="goToPage('/profile/wishlist')">{{
                $t("nav-bar.menu-profile.wishlist")
              }}</b-dropdown-item>
              <b-dropdown-item @click="goToPage('/profile/redeem')">{{
                $t("nav-bar.menu-profile.redeem")
              }}</b-dropdown-item>
              <b-dropdown-item @click="goToPage('/profile/setting')">{{
                $t("nav-bar.menu-profile.setting")
              }}</b-dropdown-item>
            </b-nav-item-dropdown>

            <modal-connect-wallet/>

          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

  </div>
</template>

<script>
import { vuexTypes } from "@/store/modules/types";
import { mapGetters, mapActions } from "vuex";
import ModalConnectWallet from "@/components/modals/ModalConnectWallet.vue";
import { i18n } from "@/i18n";
import moment from "moment";

export default {
  name: "nav-bar",
  components: { ModalConnectWallet },
  data() {
    return {
      showNavigation: this.getRoutes(),
      visible:false
    };
  },
  computed: {
    ...mapGetters({
      isMetamaskConnected: vuexTypes.isMetamaskConnected,
    }),
  },
  async created() {
    await this.checkLogin()
  },
  mounted(){
    this.showNavigation = this.getRoutes()
    this.$root.$on("on-click-to", () => {
       this.showNavigation =
          this.$route.path === "/how-to-redeem" ||
          this.$route.path === "/help" ||
          this.$route.path === "/how-to-buy" ||
          this.$route.path === "/how-to-quick-start"
          ? false
          : true;
    });
  },
  watch:{
    '$route' () {
      this.visible = false
    },
  },
  methods: {
    ...mapActions({
        disconnect: vuexTypes.DISCONNECT_METAMASK
    }),
    getRoutes() {
        return this.$route.path === "/how-to-redeem" ||
          this.$route.path === "/help" ||
          this.$route.path === "/how-to-buy" ||
          this.$route.path === "/how-to-quick-start"
          ? false
          : true;
      },
    goToPage(path) {
      this.showNavigation = true
      this.visible = false
      if(path !== this.$route.path){
        this.$router.push(path);
      }

      switch (path) {
        case '/profile':
          this.$root.$emit("on-click-tab-my-profile-tab", 0);
          break;
        case '/profile/wishlist':
          this.$root.$emit("on-click-tab-my-profile-tab", 0);
          break;
        case '/profile/redeem':
          this.$root.$emit("on-click-tab-my-profile", 1);
          break;
        case '/profile/setting':
          this.$root.$emit("on-click-tab-my-profile", 3);
          break;
      }
      this.slidePage();
    },
    slidePage() {
      let top = document.getElementById("nav-bar-top");
      if(this.$route.params.action === "partner") {
        top =  document.getElementById("section-partner");
      }
      if(this.$route.params.action === "news") {
        top =  document.getElementById("section-news");
      }
      if(top !== null) {
            setTimeout(() => {
               window.scrollTo(0, top.offsetTop);
            }, 400);
      }
    },
    changeLang(lang) {
      i18n.locale = lang;
    },
    showContactAddress(contact_address) {
        if (contact_address) {
            return contact_address.substring(0, 6) + '...' + contact_address.substring((contact_address.length - 4))
        }
        return ''
    },
    async checkLogin() {
      if( Number(localStorage.getItem('authorization_expire')) < moment().unix()) {
        await this.disconnect();
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@/scss/_variables.scss";

.dropdown-menu>li a .dropdown-item.disabled {
  color : #999999 !important;
}


.navbar-light .navbar-nav .nav-link {
  color: $app-font-color !important;
  align-items: center;
  letter-spacing: -0.015em;
  font-weight: 500;
  font-size: 16px;
  line-height: 30px;
  margin-top: 0.25rem;

  &:hover,
  &:focus {
    color: $app-font-hover-color !important;
  }
}

::v-deep .nav-link {
   color: $app-font-color !important;

  &:hover,
  &:focus {
    color: $app-font-hover-color !important;
  }
}

.navbar-brand img {
  width: 192px;
  height: 33px;
}

.navbar {
    padding: 0;
}

.navbar .nav-form form {
  width: 100%;
}

input#input-nav {
    min-width: 380px;
    height: 40px;
    background: #2C2C2C !important;
    border-radius: 6px;
    font-weight: 500;
    font-size: 16px;
    line-height: 30px;
    display: flex;
    align-items: center;
    letter-spacing: -0.015em;
    color: #949494;
}

input#input-nav::placeholder {
    min-width: 380px;
    height: 40px;
    background: #2C2C2C !important;
    border-radius: 6px;
    font-weight: 500;
    font-size: 16px;
    line-height: 30px;
    display: flex;
    align-items: center;
    letter-spacing: -0.015em;
    color: #949494 !important;
}

@media only screen and (max-width: 768px) {
  input#input-nav {
    min-width: 100%;
  }
}

p.text-help {
    margin-top: 1rem;
    font-weight: 500;
    font-size: 24px;
    line-height: 50px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: -0.015em;
    color: $app-font-color;
}

svg.iconify.iconify--ci {
    width: 52px;
    height: 0px;
    left: 292px;
    top: 14px;
    border: 2px solid #E3E3E3;
    transform: rotate(90deg);
    margin-top: 2.5rem;
}

.vl {
    margin-left: -1.5rem;
    margin-right: -1.5rem;

    @media (max-width: $tablet) {
        display: none;
    }
}
</style>
