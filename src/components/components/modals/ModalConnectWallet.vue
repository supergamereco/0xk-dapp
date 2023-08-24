<template>
  <div class="modal-connect-wallet">
    <button
        type="nav-link"
        v-if="!isMetamaskConnected"
        @click="showWalletModal()"
        class="btn btn-connect-wallet"
    >
      {{ $t("nav-bar.btn") }}
    </button>
    <button
        type="nav-link"
        v-else
        @click="showModal()"
        class="btn btn-connect-wallet"
    >
      {{ metamaskAccount.substr(0, 5) }}.....{{ metamaskAccount.slice(-4) }}
    </button>
    <b-modal
        v-model="isModalWalletVisible"
        id="modal-connect-wallet"
        hide-footer
        centered
        :title="$t('modals.wallet-connect.wallet-title')"
        @close="closeWalletModal()"
    >
      <b-container fluid>
        <b-row class="mb-1 text-center">
          <b-col cols="12" class="bg-md-wallet" @click="getConnection()" >
            <img src="~@/assets/home/Metamask.png"/>
            <p class="bg-md-wallet-metamask">Metamask</p>
          </b-col>
        </b-row>
        <hr class="line-center">
        <b-row class="mb-1 text-center">
          <p class="have-not-crypto-wallet">{{ $t('modals.wallet-connect.wallet-have-not-wallet') }}</p>
          <a class="learn-how-to-connect" href="https://metamask.io/faqs/" target="_blank"
             style="color: #1E87FF;">{{ $t('modals.wallet-connect.wallet-how-to-connect') }}</a>
        </b-row>
      </b-container>
    </b-modal>

    <b-modal
        v-model="isModalVisible"
        id="modal-connect-wallet"
        size="md"
        :title="$t('modals.wallet-connect.wallet-title-disconnect')"
        hide-footer
        centered
        @close="closeModal()"
    >
      <div class="d-block text-modal-connect">
        <label class="form-label">
          <span class="text-modal-connect-lable">{{ $t('modals.wallet-connect.wallet-address') }}</span>
        </label>
        <div class="form-outline mb-4">
          <a class="copy-clipboard" href="javascript:void(0);" @click="copyContractAddress()">
            <span
              class="iconify trailing"
              data-icon="bx:copy"
              style="color: #F7CA38; margin-left: 0.5rem"
              data-width="24"
              data-height="24"
            ></span>

          <input
              type="text"
              id="address-wallet"
              class="form-control"
              :value="wallet_address"
          />
          </a>
          <input type="hidden" id="hidden-wallet-address" :value="metamaskAccount">
        </div>
      </div>
      <b-button
          class="btn-style-original"
          block
          @click="disConnection"
      >{{ $t('modals.wallet-connect.wallet-disconnect') }}
      </b-button>
    </b-modal>

    <!-- Login Fail -->
    <b-modal
        v-model="isShowFailModal"
        id="modal-login"
        size="md"
        title="Connect Your Wallet"
        hide-footer
        centered
    >
      <center>
        <span class="iconify" data-icon="uit:exclamation-circle" style="color: #D73D24;" data-width="96" data-height="96"></span>
      </center>
      <hr/>
      <div class="d-block text-center">
        <p class="title-medium">Please Connect Wallet !!!</p>
      </div>
    </b-modal>
  </div>
</template>

<script>
import {vuexTypes} from '@/store/modules/types'
import {mapActions, mapGetters} from 'vuex'
import { getContract, validateMobile, isUseMetamask } from "@/common/core"

export default {
  name: "modal-connect-wallet",
  data: () => {
    return {
      isModalVisible: false,
      isModalWalletVisible: false,
      wallet_address: "",
      isShowFailModal: false,
      isMobile: validateMobile()
    };
  },
  async created() {
    try {
      await this.initLoad()
    } catch (e) {
      // ErrorHandler.process(e)
    }

    this.isUseMetamask = isUseMetamask()

  },
  computed: {
    ...mapGetters({
      isMetamaskConnected: vuexTypes.isMetamaskConnected,
      metamaskAccount: vuexTypes.metamaskAccount,
    }),
  },
  methods: {
    ...mapActions({
      connectMetamask: vuexTypes.CONNECT_METAMASK,
      disconnectMetamask: vuexTypes.DISCONNECT_METAMASK,
    }),
    async initLoad() {
      let wallet = localStorage.getItem('metamask_account')
        if(wallet){
          this.getConnection();
        }
    },
    async getConnection() {
      try {
        if (this.isMobile && !this.isUseMetamask) {
          window.open(this.$parent.deep_linl_dapp)
        } else {
          await this.connectMetamask()            
          if (this.isMetamaskConnected) {
            this.wallet_address = getContract(this.metamaskAccount)
            this.isModalWalletVisible = false;
          }
        }
      } catch (e) {
        // ErrorHandler.process(e)
      }
    },
    // async connectWallet(redirect) {
    //   /* eslint-disable no-console */
    //   if (this.isMobile && !this.isUseMetamask) {
    //       window.open(this.$parent.deep_linl_dapp)
    //   } else {
    //       var account = await window.ethereum.request({method: 'eth_requestAccounts'})
    //       var chain_id = await window.ethereum.request({ method: 'eth_chainId' })
    //       // var account = await provider.request({method: 'eth_requestAccounts'})
    //       // var chain_id = await provider.request({method: 'eth_chainId'})
    //       // account[0] = '0xe0a9e5b59701a776575fdd6257c3f89ae362629a'; // TODO hardcode test
          
    //       if (this.contract_chain_id !== chain_id) {
    //           Swal.fire({
    //               icon: 'error',
    //               title: "Please connect to BNB Chain network."
    //           })
    //       } else {
    //           this.$parent.account = account
    //           this.$parent.chain_id = chain_id

    //           this.$bvModal.hide('modal-connect-wallet')

    //           if (this.$parent.account.length > 0) {
    //               window.userWalletAddress = this.$parent.account
    //               localStorage.setItem('account', this.$parent.account[0])
    //               await this.getData()
    //               if (redirect == true) {
    //                   this.goToProfile()
    //               }
    //           }
    //       }

    //       await window.ethereum.on('chainChanged', this.CallBack.updateChainId.bind(this))
    //       await window.ethereum.on("accountsChanged", this.CallBack.updateAccounts.bind(this))
    //   }
    //   /* eslint-enable no-console */
    // },

    
    async disConnection() {
      try {
        await this.disconnectMetamask()
        this.isModalVisible = false;
        await this.$router.push('/');
        await this.$router.go();
      } catch (e) {
        // ErrorHandler.process(e)
      }
    },
    showWalletModal() {
      this.isModalWalletVisible = true;
    },
    closeWalletModal() {
      this.isModalWalletVisible = false;
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    getImgUrl(name) {
      let images = require.context('@/assets/home/', false, /\.png$/)
      return images('./' + name)
    },
    copyContractAddress() {
        let hiddenToCopy = document.querySelector('#hidden-wallet-address')
        hiddenToCopy.setAttribute('type', 'text')
        hiddenToCopy.select()
        document.execCommand('copy')
        hiddenToCopy.setAttribute('type', 'hidden')
        window.getSelection().removeAllRanges()
    },
  }
};
</script>

<style lang="scss" scoped>
@import "~@/scss/_variables.scss";

.modal-connect-wallet {
  width: 100%;
  display: contents;
}

.btn-connect-wallet {
  min-width: 174px;
  min-height: 40px;
  background: $app-theme-color;
  border-radius: 6px !important;
  color: $app-font-color !important;
  margin: auto;
  font-weight: 600 !important;
  font-size: 16px;
  margin-left: 0.5rem;
  letter-spacing: -0.015em;
  box-shadow: unset;

  @media (max-width: 992px) {
    width: 100%;
    margin-left: 0rem;
  }
}
 .form-outline .trailing{
    pointer-events: auto !important;
    cursor: pointer;
    color:$app-theme-color;
}
div#modal-connect-wallet___BV_modal_content_ {
  font-family: 'Inter';
  font-style: normal;
}

h5#modal-connect-wallet___BV_modal_title_ {
  font-weight: bold;
  font-size: 24px;
  line-height: 36px;
  letter-spacing: -0.015em;
  color: #FFFFFF;
}

span.text-modal-connect-lable {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: $app-font-color;
}

input#address-wallet {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */
  /* Dark1 */
  color: $app-font-color;
}

input#address-wallet {
  background: #F0F1F3 !important;
  border-radius: 6px;
  min-height: 50px;
}

footer.modal-footer {
  background-color: #1B1B21 !important;
}

.bg-md-wallet {
  height: 120px;
  background: $app-background-color;
  border-radius: 6px;
  padding: 10px;
  cursor: pointer;
}

.bg-md-wallet > img {
  margin-top: 13px;
  margin-bottom: 10px;
}

.bg-md-wallet-empty {
  width: 170px;
  height: 100px;
  border-radius: 6px;
  margin: 8px;
}

div#modal-connect-wallet___BV_modal_content_.modal-content {
  background-color: #1B1B21 !important;
}

#modal-connect-wallet___BV_modal_header_ button.close {
  opacity: 1 !important;
}

hr.line-center {
    margin: 1rem 0rem;
}

p.bg-md-wallet-metamask {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  /* identical to box height, or 100% */
  color: $app-font-color;
}

p.have-not-crypto-wallet {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  /* or 100% */
  /* Dark2 */
  color: $dark-2;
}

a.learn-how-to-connect {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  /* or 150% */
  text-align: center;
  /* Link */
  color: #2D7CFC;
}
</style>