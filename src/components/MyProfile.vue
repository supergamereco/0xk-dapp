<template>
    <div class="container-fluid">
        <div class="home">
            <div style="position: relative">
                <div class="row bg-image banner-profile"></div>
                <b-list-group
                    class="profile-img"
                    style="
                    min-width: 489px;
                    position: absolute;
                    bottom: -45px;
                    right: 30px;
                    z-index: 1;
                    padding-left: 2px;
                    padding-bottom: 2px;
                    padding-top: 2px;
                    "
                >
                    <b-list-group-item
                        class="d-flex align-items-center profile-border-radius-left"

                    >
                        <b-avatar
                            class="mr-3"
                            size="118px"
                            badge-variant="secondary"
                            :src="default_img_profile"
                        >
                            <div
                            slot="badge"
                            variant="outline-dark"
                            style="
                                font-size: 1px !important;
                                min-width: 30px !important;
                                min-height: 30px !important;
                                cursor: pointer;
                            "
                            @click="onClickTab(3)"
                            >

                                <span
                                class="iconify"
                                data-icon="prime:pencil"
                                data-width="12.99"
                                data-height="12.99"
                                style="vertical-align: middle; margin-top: 0.25rem"
                                >
                                </span>
                            </div>

                        </b-avatar>
                        <div class="d-flex flex-column justify-content-between mr-5 mt-2">
                            <h6 class="mr-auto font-weight-bold">
                                {{ profile_name_default }}
                            </h6>
                            <h6 style="color: #9f9f9f" class="mr-auto font-wallet">
                <span class="profile-wallet-desktop">
                    {{ wallet_address.substr(0, 11) }}.....{{ wallet_address.slice(-4) }}
                    <a href="javascript:void(0);" v-clipboard:copy="metamaskAccount">
                    <span
                        class="iconify"
                        data-icon="bx:copy"
                        style="color: #888E97; margin-left: 0.5rem"
                        data-width="24"
                        data-height="24"
                    ></span>
                    </a>
                </span>

                                <span class="profile-wallet-mobile">
                    {{ wallet_address.substr(0, 4) }}..{{ wallet_address.slice(-4) }}
                    <a href="javascript:void(0);" v-clipboard:copy="metamaskAccount">
                    <span
                        class="iconify"
                        data-icon="bx:copy"
                        style="color: #888E97; margin-left: 0.5rem"
                        data-width="24"
                        data-height="24"
                    ></span>
                    </a>
                </span>
                            </h6>
                            <h6 class="mr-auto">
                <span class="text-bold-yellow" style="font-size: 18px;" v-if="Object.keys(service_collection_preorder_list).length != 0 || Object.keys(service_collection_my_nft_list).length != 0">
                    {{ $t("my-profile.my-item", {amount: service_collection_preorder_list.total + service_collection_my_nft_list.total}) }}
                </span>
                                <small style="color: #9f9f9f">
                                    {{ $t("my-profile.items") }}
                                </small>
                            </h6>
                        </div>
                    </b-list-group-item>
                </b-list-group>
            </div>
            <div class="row profile-content">
                <b-card  no-body style="padding: 0;border: none">
                    <b-tabs v-model="tabIndex" pills card vertical style="border: none">
                        <b-tab v-on:click="onClickTab(0)">
                            <template #title>
                                <div style="margin-top: 10rem">
                                    <button class="btn btn-outline-secondary sidebar-menu">
                        <span
                            class="iconify"
                            data-width="36"
                            data-height="36"
                            data-icon="ant-design:user-outlined"
                            style="padding-right: 0.25rem !important"
                        ></span>
                                    </button>
                                    <span id="menu-1" class="profile-content__text-sidebar mx-3">{{
                                            $t("my-profile-menu.my-profile")
                                        }}</span>
                                </div>
                            </template>
                            <section-profile
                                :services_collection="service_collection_preorder_list"
                                :service_my_wish_list="service_wish_list"
                                :service_activity="service_activity"
                                :openMenu="openMenu"
                                v-if="service_collection_preorder_list.list != undefined"
                            />
                        </b-tab>
                        <b-tab v-on:click="onClickTab(1)">
                            <template #title>
                                <button class="btn btn-outline-secondary sidebar-menu">
                        <span
                            class="iconify"
                            data-width="36"
                            data-height="36"
                            data-icon="ph:ticket"
                            data-rotate="180deg"
                            style="padding-right: 0.25rem !important"
                        ></span>
                                </button>
                                <span id="menu-2" class="profile-content__text-sidebar mx-3">{{
                                        $t("my-profile-menu.redeem")
                                    }}</span>
                            </template>
                            <b-card-text>
                                <section-redeem
                                    :service_redeem_cards="service_collection_my_nft_list"
                                    :service_redeem_history_list="service_redeem_physical_list"
                                    :service_redeem_fields_physical="service_redeem_feilds_physical"
                                    :service_redeem_history_digital="service_redeem_digital_list"
                                    :service_redeem_fields_digital="service_redeem_feilds_digital"
                                    :openMenu="openMenu"
                                />
                            </b-card-text>
                        </b-tab>
                        <b-tab @click="getAddressBook">
                            <template #title>
                                <button class="btn btn-outline-secondary sidebar-menu">
                            <span
                                class="iconify"
                                data-icon="ep:location"
                                data-width="36"
                                data-height="36"
                                style="padding-right: 0.25rem !important"
                            ></span>
                                </button>
                                <span id="menu-3" class="profile-content__text-sidebar mx-3">{{
                                        $t("my-profile-menu.address-book")
                                    }}</span>
                            </template>
                            <section-profile-address-book/>
                        </b-tab>
                        <b-tab @click="getSetting">
                            <template #title>
                                <button class="btn btn-outline-secondary sidebar-menu">
                            <span
                                class="iconify"
                                data-width="36"
                                data-height="36"
                                data-icon="clarity:cog-line"
                                data-rotate="180deg"
                                style="padding-right: 0.25rem !important"
                            ></span>
                                </button>
                                <span id="menu-4" class="profile-content__text-sidebar mx-3">{{
                                        $t("my-profile-menu.setting")
                                    }}</span>
                            </template>
                            <b-card-text>
                                <section-profile-setting
                                :wallet="wallet_address"
                                :wallet_account="metamaskAccount"/>
                            </b-card-text>
                        </b-tab>
                    </b-tabs>
                </b-card>
            </div>
        </div>
        <div id="backdrop" v-if="loadStatus">
            <div class="text-center loading">
                <div class="spinner-border" role="status"></div>
            </div>
          <span class="text-center loading-text" >Loading...</span>
        </div>
    </div>
</template>

<script>
import {vuexTypes} from '@/store/modules/types'
import {mapActions, mapGetters} from 'vuex'
import SectionProfileSetting from "@/components/section/SectionProfileSetting.vue";
import SectionProfileAddressBook from "@/components/section/SectionProfileAddressBook.vue";
import SectionRedeem from "@/components/section/SectionRedeem.vue";
import SectionProfile from "@/components/section/SectionProfile.vue";
import {getContract} from "@/common/core"
import {callers} from '@/js/api'

//data
import ServiceProfile from "@/data/ServiceProfile.json";
import moment from "moment";

export default {
    name: "my-profile",
    components: {
        SectionProfileSetting,
        SectionProfileAddressBook,
        SectionRedeem,
        SectionProfile,
    },
    data: function () {
        return {
            loadStatus : true,
            profile_name: ServiceProfile.profile_name,
            wallet_address: "",
            my_items: ServiceProfile.my_items,
            scTimer: ServiceProfile.scTimer,
            scY: ServiceProfile.scY,
            image_profile: ServiceProfile.image_profile,
            service_collection_preorder_list: {},
            service_collection_my_nft_list: {},
            service_wish_list: [],
            service_activity: {},
            service_redeem_card: ServiceProfile.redeemable_cards,
            service_redeem_physical_list: {},
            service_redeem_feilds_physical: ServiceProfile.fields_physical,
            service_redeem_digital_list:{},
            service_redeem_feilds_digital: ServiceProfile.fields_digital,
            tabIndex: 0,
            currenttab: 1,
            action: null,
            default_img_profile: "",
            profile_name_default: "",
            preorder_current_page: 1,
            my_nft_current_page: 1,
            physical_current_page: 1,
            digital_current_page: 1,
            activity_current_page: 1,
            status: 0,
            display: 'inline',
            openMenu: true,
            myWishList: []
        };
    },

    async created() {
        try {
            await this.initLoad()

            if (this.$route.params.action) {
                switch (this.$route.params.action) {
                    case 'wishlist':
                        this.tabIndex = 0
                        this.action = this.$route.params.action
                        break;
                    case 'redeem':
                        this.tabIndex = 1
                        this.action = this.$route.params.action
                        break;
                    case 'setting':
                        this.tabIndex = 3
                        this.action = this.$route.params.action
                        break;
                }
            }
        } catch (e) {
            // ErrorHandler.process(e)
        }
    },
    computed: {
        ...mapGetters({
            metamaskAccount: vuexTypes.metamaskAccount,
            myNftList: vuexTypes.myNftList,
            userModel: vuexTypes.userModel,
            preorderList: vuexTypes.preorderList,
            // myWishList: vuexTypes.myWishList,
            physicalList: vuexTypes.physicalList,
            digitalList: vuexTypes.digitalList,
            activityList: vuexTypes.activityList,
        }),
    },
    mounted() {
        this.$root.$emit("on-click-to");
        this.$root.$on("on-click-tab-my-profile", (data) => {
            this.loadData(1,1,0)
            this.onClickTab(data)
        });
        this.$root.$on('load-profile' , async () => {
            await this.loadProfileEdit()
        })
        this.$root.$on('load-wishlist' , async (sort_by_index) => {
            this.loadStatus = true
            this.service_wish_list = []
            this.service_wish_list = await callers.getMyWishList(localStorage.getItem('metamask_account'), sort_by_index)
            this.loadStatus = false
        })
        this.$root.$on('load-activity' , async (sort_by, filter) => {
            this.loadStatus = true
            this.service_activity = []
            await this.changPageActivity( 1, filter, sort_by)
            this.loadStatus = false
        })
        this.$root.$on('load-redeemable' , async (sort_by) => {
            this.loadStatus = true
            this.service_collection_preorder_list = []
            this.service_collection_my_nft_list = []
            await this.changPage(1, 1, sort_by)
            this.loadStatus = false
        })
        this.$root.$on('load-redeem-history' , async (sort_by, filter) => {
            this.loadStatus = true
            this.service_redeem_physical_list = []
            this.service_redeem_digital_list = []
            await this.changPageHistory(1, 1, filter, sort_by)
            this.loadStatus = false
        })
        this.$root.$on("on-click-tab-my-profile-tab", (data) => {
            this.loadData(1,1,0)
            this.onClickTab(0);
            this.$root.$emit('on-click-tab-profile', data);
        });
        // this.$root.$on('filterMyCollection', (type) => {
        //     this.filterMyCollection(type);
        // });
        this.$root.$on("change-page", (pageType, page, order) => {
            this.loadStatus = true
            this.changPage(pageType, page, order)
            this.loadStatus = false
        });
        this.$root.$on("change-page-history", async (pageType, page, filter, order) => {
            this.loadStatus = true
            await this.changPageHistory(pageType, page, filter, order)
            this.loadStatus = false
        });
        this.$root.$on("change-page-activity", async (page, filter, order) => {
            this.loadStatus = true
            await this.changPageActivity(page, filter, order)
            this.loadStatus = false
        });
         this.$root.$on("filter-activity", async (filter, order) => {
            this.loadStatus = true
            await this.changPageActivity(1, filter, order)
            this.loadStatus = false
        });
        this.$root.$on("filter-history", async (filter, order) => {
            this.loadStatus = true
            await this.changPageHistory(1, 1, filter, order)
            this.loadStatus = false
        });
        this.$root.$on("update-wishlist", () => {
            this.initMyWishList();
        });

        const menu = document.querySelector('.col-auto');

        menu.addEventListener('click', () => {
            if (!window.matchMedia("(max-width: 992px)").matches) {
                var div_list = document.querySelectorAll('.col-custom');
                var div_array = [...div_list];

                this.display = ( this.status % 2 === 0) ? 'none' : 'inline'

                var colapseMenu = document.querySelectorAll("#menu-1, #menu-2, #menu-3, #menu-4")
                var menu_array = [...colapseMenu];
                menu_array.forEach(displayMenu => {
                    displayMenu.style.display = this.display;
                });

                if(this.status % 2 === 0){
                    div_array.forEach(div => {
                        div.classList.replace('col-lg-4', 'col-lg-3');
                    });
                }else {
                    this.openMenu = false
                    div_array.forEach(div => {
                        div.classList.replace('col-lg-3', 'col-lg-4');
                    });
                }
                this.status += 1

                if(this.status % 2 === 0) {
                    this.openMenu = true
                } else {
                    this.openMenu = false
                }
            }

        });
    },
    beforeDestroy () {
        this.$root.$off('on-click-tab-my-profile')
        this.$root.$off('load-profile')
        this.$root.$off('load-wishlist')
        this.$root.$off('load-activity')
        this.$root.$off('load-redeemable')
        this.$root.$off('load-redeem-history')
        this.$root.$off('on-click-tab-my-profile-tab')
        this.$root.$off('change-page')
        this.$root.$off('change-page-history')
        this.$root.$off('change-page-activity')
        this.$root.$off('filter-activity')
        this.$root.$off('filter-history')
        this.$root.$off('update-wishlist')
    },
    methods: {
        ...mapActions({
            connectMetamask: vuexTypes.CONNECT_METAMASK,
            ncmMyNFTList: vuexTypes.DETECT_MY_NFT_LIST,
            historyList: vuexTypes.DETECT_HISTORY_LIST,
            activityInitList: vuexTypes.DETECT_ACTIVITY_LIST,
            myProfile: vuexTypes.MY_PROFILE,
            disconnect: vuexTypes.DISCONNECT_METAMASK
        }),
        async initLoad() {

            let wallet = localStorage.getItem('metamask_account')
            if (wallet === null || Number(localStorage.getItem('authorization_expire')) < moment().unix()) {
                this.$root.$emit('bv::show::modal', 'modal-login')
                await this.$router.push('/');
                await this.disconnect()
                return
            } else {
                await this.getConnection();
            }


            await this.myProfile();
            await this.ncmMyNFTList({
                'pageType': 1,
                'page': 1
            })

            if (this.userModel.avatarUrl) {
                this.default_img_profile = this.userModel.avatarUrl;
            } else {
                this.default_img_profile = this.getImgUrl("Img_ProfileDefault.png");
            }

            if (this.userModel.customerName) {
                this.profile_name_default = this.userModel.customerName;
            } else {
                this.profile_name_default = "Unnamed";
            }

            this.wallet_address = getContract(this.metamaskAccount)

            this.service_collection_preorder_list = this.preorderList
            this.service_collection_my_nft_list = this.myNftList

            await this.historyList({
                'pageType': 1,
                'page': 1,
                'filter': 0
            })
            this.service_redeem_physical_list = this.physicalList
            this.service_redeem_digital_list = this.digitalList

            await this.activityInitList({
                'page': 1,
                'filter': 0,
                'order': 0
            })
            this.service_activity = this.activityList
            this.service_wish_list = await callers.getMyWishList(localStorage.getItem('metamask_account'))

            setTimeout(() => {
                this.loadStatus = false
            }, 1000);

        },
        async getConnection() {
            try {
                await this.connectMetamask()
                if (this.isMetamaskConnected) {
                    this.wallet_address = getContract(this.metamaskAccount)
                    this.isModalWalletVisible = false;
                }
            } catch (e) {
                // ErrorHandler.process(e)
            }
        },
        async onClickTab(value) {
            if (Number(localStorage.getItem('authorization_expire')) < moment().unix()) {
                this.$root.$emit('bv::show::modal', 'modal-login')
                await this.$router.push('/');
                await this.disconnect()
            }
            this.tabIndex = value
            if(value == 3){
                this.$root.$emit('setting-data')
            }
        },
        getImgUrl(name) {
            let images = require.context("@/assets/profile/", false, /\.png$/);
            return images("./" + name);
        },
        async loadProfileEdit() {
            await this.myProfile();

            if (this.userModel.avatarUrl) {
                this.default_img_profile = this.userModel.avatarUrl;
            } else {
                this.default_img_profile = this.getImgUrl("Img_ProfileDefault.png");
            }

            if (this.userModel.customerName) {
                this.profile_name_default = this.userModel.customerName;
            } else {
                this.profile_name_default = "Unnamed";
            }
        },
        async loadData(pageType, page, filter) {
            await this.myProfile();
            await this.ncmMyNFTList({
                'pageType': pageType,
                'page': page
            })
            await this.historyList({
                'pageType': pageType,
                'page': page,
                'filter': filter
            })

             await this.activityInitList({
                'page': page,
                'filter': filter
            })

            if (this.userModel.avatarUrl) {
                this.default_img_profile = this.userModel.avatarUrl;
            } else {
                this.default_img_profile = this.getImgUrl("Img_ProfileDefault.png");
            }

            if (this.userModel.customerName) {
                this.profile_name_default = this.userModel.customerName;
            } else {
                this.profile_name_default = "Unnamed";
            }

            this.service_collection_preorder_list = this.preorderList
            this.service_collection_my_nft_list = this.myNftList
            this.service_redeem_physical_list = this.physicalList
            this.service_redeem_digital_list = this.digitalList
            this.service_activity = this.activityList
        },
        async changPage(pageType, page, order) {
            await this.ncmMyNFTList({
                'pageType': pageType,
                'page': page,
                'order': order
            })

            this.service_collection_preorder_list = this.preorderList
            this.service_collection_my_nft_list = this.myNftList
            this.preorder_current_page = this.service_collection_preorder_list.current_page
            this.my_nft_current_page = this.service_collection_my_nft_list.current_page
        },
        async changPageHistory(pageType, page, filter, order) {
            await this.historyList({
                'pageType': pageType,
                'page': page,
                'filter': filter,
                'order': order
            })

            this.service_redeem_physical_list = this.physicalList
            this.service_redeem_digital_list = this.digitalList
            this.physical_current_page = this.service_redeem_physical_list.current_page
            this.digital_current_page = this.service_redeem_digital_list.current_page
        },

        async changPageActivity( page, filter, order) {
            await this.activityInitList({
                'page': page,
                'filter': filter,
                'order': order
            })

            this.service_activity = this.activityList
            this.activity_current_page = this.service_activity.current_page
        },
        getAddressBook(){
            this.$root.$emit('address-data')
        },
        getSetting(){
            this.$root.$emit('setting-data')
        },
        initMyWishList(){
            // this.service_wish_list = [];
            // const now = moment();
            // ServiceProfile.my_wishlist_list.forEach((item) => {
            //     if( this.myWishList && this.myWishList.find(element => element == item.product.id) && (now >= moment.unix(item.startData)) && (now <= moment.unix(item.closeData))){
            //         this.service_wish_list.push(item)
            //     }
            // });
        }
    },
};
</script>

<style lang="scss" scoped>
@import "~@/scss/_variables.scss";

.text-center__align {
  text-align: center;
  top: 30%;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
}

.spinner-border {
    display: block;
    width: 100px;
    height: 100px;
    position: fixed;
    border-width: 15px;
    top: calc(50% - (58px / 2));
    right: calc(50% - (58px / 2));
    color: $yellow;
}

.loading-text{
  display: block;
  position: fixed;
  font-size: 30px;
  font-weight: bold;
  color: #4A525F;
  top: calc(68% - (58px / 2));
  right: calc(48.5% - (58px / 2));
}

#backdrop {
  position:fixed;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: rgb(0,0,0,0.2);
}

.text-grey {
    color: #9f9f9f;
    font-size: 14px;
}

.profile-img .profile-wallet-desktop {
    display: block;
}

.profile-img .profile-wallet-mobile {
    display: none;
}

@media only screen and (max-width: 576px) {
    .profile-img .profile-wallet-desktop {
        display: none;
    }

    .profile-img .profile-wallet-mobile {
        display: block;
    }
}

.banner-profile {
    height: 400px;
    //background-color: $light-1;
     background-image: url("~@/assets/profile/profile-banner.png");

    // background-position: center;
    // background-repeat: no-repeat;
    // background-size: cover;
}


// .profile-radius-left {
//     background-color: #2b2b3e;
//     border-top-left-radius: 50rem !important;
//     border-bottom-left-radius: 50rem !important;
//     padding: 10px 10px;
//     color: white;
//     border: solid 4px transparent;
//     background-image: linear-gradient(#962eff, #3106bb),
//     linear-gradient(101deg, #962eff, #3106bb) !important;
//     background-origin: border-box;
//     background-clip: content-box, border-box;
//     box-shadow: 0px 1000px 0px #2b2b3e inset;
// }

.list-group-item {
    position: relative;
    display: block;
    padding: 0.75rem 1.25rem;
    background-color: #fff;
    // border: 4px solid rgba(0, 0, 0, 0.125);
}

@media only screen and (max-width: 768px) {
    div.list-group {
        min-width: auto !important;
    }
    div.list-group .list-group-item div.flex-column {
        margin-right: 0px !important;
    }
    .row.bg-image.banner-profile {
        height: 240px !important;
    }
}


.btn-link:hover {
    color: #0056b3;
    background-color: transparent !important;
    text-decoration: none;
}

.btn-link:focus,
.btn-link.focus {
    background-color: transparent !important;
    text-decoration: none;
}

.font-color-linear-gradient {
    background-image: $button-color-hilight;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
}

.nav-pills .nav-link {
    border-radius: 0.25rem;
    font-size: 12px;
    text-transform: uppercase;
    padding: 0px 5px 0px;
    line-height: 1;
    background-color: #f5f5f5;
    font-weight: 500;
    color: #9f9f9f;
    margin: 0.5rem;
}

.icon_information {
    color: $green;
    margin-left: 2px;
    font-weight: 700 !important;
    -webkit-text-stroke: 2px;
}

.tag_inside_img_right {
    border-top-left-radius: 0.25rem !important;
    border-bottom-left-radius: 0.25rem !important;
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    background-color: $purple !important;
    color: $white !important;
}

.tag_inside_img_left {
    border-top-left-radius: 0rem !important;
    border-bottom-left-radius: 0rem !important;
    border-top-right-radius: 0.25rem !important;
    border-bottom-right-radius: 0.25rem !important;
    background-color: #f0b90b !important;
    color: $white !important;
}

.profile-border-radius-left {
    border-top-left-radius: 50rem !important;
    border-bottom-left-radius: 50rem !important;
    // background-color: transparent;
    padding: 5px 5px;
    color: white;
    border: solid 4px transparent;
    /* White */

background: #FAFAFA;
/* White */

border: 4px solid #FAFAFA;
/* Drop Shadow1 */

box-shadow: 0px 2px 12px 2px rgba(0, 0, 0, 0.05);
border-radius: 75px 6px 6px 75px;
}

.profile-content__text-sidebar {
    text-transform: capitalize;
    vertical-align: middle;
    font-family: 'Inter';
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
    color: $dark-1;
}

span.b-avatar-badge.badge-secondary {
    background: #1b1b21 !important;
    opacity: 0.64;
    border: 1px solid #9f9f9f;
    box-sizing: border-box;
    backdrop-filter: blur(4px);
    display: flex;
    justify-content: center;
    width: 30px !important;
    height: 30px !important;
    font-size: 10px !important;
}

h6.mr-auto.font-weight-bold {
    font-weight: 700;
    font-size: 24px;
    line-height: 36px;
    letter-spacing: -0.015em;
    color: $dark-1;
}

h6.mr-auto {
    font-weight: normal;
    font-size: 18px;
    line-height: 30px;
    letter-spacing: -0.015em;
    color: #9f9f9f;
}

small,
.small {
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
}

@media only screen and (max-width: 992px) {
    .profile-content__text-sidebar {
        display: none !important;
    }
}

@media only screen and (max-width: 528px) {
    .profile-content__text-sidebar {
        display: inline !important;
    }
    .col-auto {
        width: 100% !important;
    }
}

.card {
    background-color: $white-bg !important;
}

.scrollToTopBtn.showBtn {
    display: block !important;
}

@media (max-width: 576px) {
    .profile-img {
        right: 0 !important;
        bottom: 0 !important;
        top: 120px !important;
    }
    .b-avatar {
        width: 98px !important;
        height: 98px !important;
    }
}
</style>
