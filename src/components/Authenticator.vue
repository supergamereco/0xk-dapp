<template>
  <div class="container-fluid">
    <div class="authenicator">
      <div class="container mt-5 mb-10">
        <div class="row authenticator__bg-verify">
          <div class="col-lg-6 col-md-12 col-sm-12 banner_contents">
            <div class="row">
              <div class="col-md-4 col-sm-4" style="margin: auto">
                <img
                  class="authenticator__img"
                  src="~@/assets/safe_security_protect.png"
                />
              </div>
              <div class="col-md-8 col-sm-8 text-contents">
                <span class="text-title">{{
                  $t("authen.title-lbl-1")
                }}</span>
                <span class="text-title">{{
                  $t("authen.title-lbl-2")
                }}</span>
                <span class="authenticator__body">{{
                  $t("authen.sub-title-lbl")
                }}</span>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-md-12 col-sm-12 banner_contents input-area">
              <!-- <div class="row"> -->
                  <b-form class="form-authen" @submit.prevent="onSubmit">
                      <!-- <div class="col-12"> -->
                          <b-form-input
                              class="bg-input mb-3 form-control"
                              v-model="inputContactAddress"
                              placeholder="Contract Address*"
                          ></b-form-input>
                          <b-form-input
                              class="bg-input form-control"
                              v-model="inputTokenId"
                              placeholder="Token ID*"
                          ></b-form-input>
                          <button
                              type="submit"
                              class="btn btn-md btn-verify-nft"
                              >
                              {{ $t("authen.btn-verify-nft-lbl") }}
                          </button>
                      <!-- </div> -->
                  </b-form>
              <!-- </div> -->
          </div>
        </div>
        <hr style="margin-top: 2rem; margin-bottom: 2rem" />
      </div>
      <!-- section verify -->
      <div class="row authenticator__bg-verifyticator__info" v-if="isVerify">
        <div class="col-md-12 text-center">
          <span class="text-content-authen">
            {{ $t("authen.verified-status-lbl") }}
          </span>
        </div>
        <div class="col-md-8 offset-md-2 mt-3">
          <div class="row authenticator__bg-info">
            <div class="col-md-6">
              <span class="text-title__auth">
                {{ $t("authen.token-id-lbl") }}:
              </span>
            </div>
            <div class="col-md-6">
              <span class="text-detail__auth">
                {{ tokenId }}
              </span>
            </div>

            <div class="col-md-6">
              <span class="text-title__auth">
                {{ $t("authen.nft-lbl") }}:
              </span>
            </div>
            <div class="col-md-6">
              <a href="javascript:void(0);" class="text-detail__auth" style="cursor: pointer; color: #2D7CFC !important" @click="goToPage('/product')">
                {{ nft }}
              </a>
            </div>
            <div class="col-md-6">
              <span class="text-title__auth">{{
                $t("authen.redemption-lbl")
              }}:</span>
            </div>
            <div class="col-md-6" v-if="!isRedemption">
              <span class="text-detail__auth" style="color: #D73D24 !important">
                {{ $t("authen.redeemed-lbl") }}
              </span>
            </div>
            <div class="col-md-6" v-else>
              <span class="text-detail__auth" style="color: #54AAAE !important">
                {{ $t("authen.available-lbl") }}
              </span>
            </div>
            <div class="col-md-6">
              <span class="text-title__auth">
                {{ $t("authen.owner-wallet-address") }}:
              </span>
            </div>
            <div class="col-md-6" style="color: #2D7CFC !important">
              <a :href="contractAddressURL + walletAddress" target="_blank" class="text-detail__auth" style="color: #2D7CFC !important">
                {{ walletAddress }}
              </a>
            </div>
            <div class="col-md-12">
              <span class="auth-desc">
               {{ $t("authen.wallet-address-lbl") }}
              </span>
            </div>

          </div>
        </div>
      </div>

      <!-- section verify -->
      <div class="row authenticator__bg-verifyticator__info" v-if="isNotVerify">
        <div class="col-md-12 text-center">
          <span class="text-content-authen">
            {{ $t("authen.incorrect-token-id-status-lbl") }}
          </span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {vuexTypes} from '@/store/modules/types'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "authenicator",
  data() {
    return {
      inputTokenId: "",
      inputContactAddress: "",
      isVerify: false,
      isNotVerify: false,
      isRedemption: false,
      tokenId: '',
      nft: '',
      walletAddress: '',
      contractAddressURL: process.env.VUE_APP_CONTRACT_ADDRESS_URL

    };
  },
  computed: {
    ...mapGetters({
      isMetamaskConnected: vuexTypes.isMetamaskConnected,
      responseAuthenticator: vuexTypes.responseAuthenticatorNft,
    }),
  },
  methods: {
    ...mapActions({
      authenticatorNft: vuexTypes.AUTHENTICATOR_NFT,
    }),
    async onSubmit() {
      this.isVerify = false;
      this.isNotVerify = false;

      if(this.inputContactAddress.length > 0 && this.inputTokenId.length > 0){

        await this.authenticatorNft({
          'contract': this.inputContactAddress,
          'tokenId': this.inputTokenId
        });

        if (this.responseAuthenticator.authenticator) {
          this.isNotVerify = false;
          this.isVerify = true;
          this.tokenId = this.inputTokenId;
          this.nft = this.responseAuthenticator.name;
          this.walletAddress = this.responseAuthenticator.owner;
          this.isRedemption = process.env.VUE_APP_OWNER_WALLET_ADDRESS !== this.walletAddress

        } else {
          this.isVerify = false;
          this.isNotVerify = true;
        }
      }
    },
    goToPage(path) {
      if (path !== this.$route.path) {
        this.$router.push(path);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@/scss/_variables.scss";

.auth-desc{
  font-size: 16px;
}

.authenicator {
  padding-bottom: 5rem;
}

.authenticator__bg-verify {
  background: $white-bg;
  box-shadow: 0px 2px 12px 2px rgb(0 0 0 / 5%);
  border-radius: 24px;
  padding: 25px;
}

.text-title {
  display: flex;
  align-items: center;
  color: $yellow;

  @media (min-width: 768px) and (max-width: 992px) {
    font-size: 28px;
  }

   @media (max-width: $small) {
    font-size: 28px;
  }
}

.authenticator__body {
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    display: flex;
    align-items: center;
    color: $dark-2;
    margin-top: 22px;

  @media (min-width: 768px) and (max-width: 992px) {
    font-size: 18px;
  }
}

.authenticator__img {
  min-width: 167px;
  min-height: 167px;

  @media (max-width: $tablet) {
    text-align: center !important;
    width: 100% !important;
    height: 100% !important;
    margin-top: 2rem;
  }
}

.col-md-6.banner_contents {
  display: flex;
  justify-content: center;
}

input.bg-input {
  width: 450px;
  height: 56px;
  -webkit-text-fill-color: $dark-2;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  color: $dark-2 !important;

  @media (max-width: $tablet) {
    width: 100% !important;
  }
}

button.btn.btn-md.btn-preorder.btn-border.text-color.mt-3 {
  min-width: 450px;
  min-height: 56px;
  border-radius: 6px !important;
  font-weight: bold !important;
  font-size: 18px;
  line-height: 36px;
  align-items: center;
  text-align: center;
  letter-spacing: -0.015em;
  color: $white !important;

  @media (max-width: $tablet) {
    min-width: 100% !important;
  }
}

form.form-authen {
  min-width: 100%;

  @media (max-width: $small) {
    margin-top: 1.5rem;
  }

    @media (min-width: 768px) and (max-width: 992px) {
      display: flex;
      align-items: center;
      flex-direction: column;
  }
}

span.text-content-authen {
  font-weight: 700;
  font-size: 32px;
  line-height: 44px;
  display: flex;
  align-items: center;
  color: $dark-1;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.row.authenticator__bg-info {
    min-width: 637px;
    min-height: 288px;
    background: $white-bg !important;
    box-shadow: 0px 2px 12px 2px rgb(0 0 0 / 5%);
    border: 1px solid #F0F1F3;
    border-radius: 12px !important;
    padding: 20px !important;
    margin-top: 1.5rem;

  @media (max-width: $tablet) {
    min-width: 100% !important;
  }
}

span.text-title__auth {
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    color: $dark-1;
}

.text-detail__auth {
    font-size: 18px !important;
    line-height: 24px !important;
    font-weight: 500 !important;
    color: $dark-1;
}

.form-control {
    background-color: #F0F1F3 !important;
    border-radius: 12px;
}

button.btn.btn-md.btn-verify-nft {
    margin-top: 36px;
    min-width: 450px;
    min-height: 52px;
    border-radius: 6px;
    background: $yellow;
    color: $app-font-color;

  @media (max-width: $tablet) {
    min-width: 100% !important;
  }
}

p.mt-4.auth-desc {
    color: $dark-2;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    margin-top: 28px;
}

.input-area {
  margin: auto;

  @media (min-width: 768px) and (max-width: 992px) {
      margin-top: 2rem !important;
  }
}
</style>
