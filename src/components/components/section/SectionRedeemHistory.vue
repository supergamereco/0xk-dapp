<template>
  <div class="section-redeem-history">
    <!-- section list-->
    <div class="row">
        <div class="col-6">
            <div class="row filter-my-profile">
                <div class="col-12">
                    {{ $t("redeem.history.filter-by") }}
                </div>
            </div>
             <div id="filter-top" class="row justify-content-end">
                <div class="col-12">
                    <a :class="isFilterAll ? 'btn-filter-active' : 'btn-filter'" @click="filterData(0)">
                        <span
                        style="width: 84px; height: 38px; cursor: pointer;">{{ $t("redeem.history.filter.all") }}</span></a>
                    <a :class="isFilterShip ? 'btn-filter-active' : 'btn-filter'" @click="filterData(1)">
                        <span style="min-width: 84px; height: 38px; cursor: pointer;">{{ $t("redeem.history.filter.ship") }}</span></a>
                    <a :class="isFilterReceive ? 'btn-filter-active' : 'btn-filter'" @click="filterData(2)">
                        <span style="width: 134px; height: 38px; cursor: pointer;">{{ $t("redeem.history.filter.recive") }}</span></a>
                    <a :class="isFilterCompleted ? 'btn-filter-active' : 'btn-filter'" @click="filterData(3)">
                        <span style="width: 134px; height: 38px; cursor: pointer;">{{ $t("redeem.history.filter.completed") }}</span></a>
                </div>
            </div>
             <div class="row custom-dropdown-filter">
                <div class="col-12">
                    <div class="dropdown">
                        <a
                            class="btn btn-dark dropdown-toggle dropdownMenuLink filter"
                            role="button"
                            id="dropdownMenuFilter"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                        >
                            {{ $t("redeem.history.filter-text") }}
                        </a>

                        <ul
                            class="dropdown-menu"
                            aria-labelledby="dropdownMenuFilter"
                        >
                            <li><a class="dropdown-item dropdown-filter" @click="filterData(0)">
                                {{ $t("redeem.history.filter.all") }}</a></li>
                            <li><a class="dropdown-item dropdown-filter" @click="filterData(1)">
                                {{ $t("redeem.history.filter.ship") }}</a></li>
                            <li><a class="dropdown-item dropdown-filter" @click="filterData(2)">
                                {{ $t("redeem.history.filter.recive") }}</a></li>
                            <li><a class="dropdown-item dropdown-filter" @click="filterData(3)">
                                {{ $t("redeem.history.filter.completed") }}</a></li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
        <div class="col-6 text-right">
            <div class="row filter-my-profile">
                <div class="col-12">{{ $t("redeem.sort") }}</div>
            </div>
            <div class="row justify-content-end">
                <div class="col-12" style="display: inline-table;">
                    <div class="dropdown">
                        <b-button class="btn btn-dark dropdown-toggle dropdownMenuLink"
                            v-b-toggle.redeem-history-sort-collapse>
                            {{ redeem_history_sort_by_list[redeem_history_sort_by].name }}
                        </b-button>
                        <b-collapse id="redeem-history-sort-collapse" class="sort-collapse">
                            <b-list-group>
                                <b-list-group-item v-for="(value, index) in redeem_history_sort_by_list" :key="index"
                                    @click="doRedeemHistorySortBy(index)">
                                    {{value.name}}
                                </b-list-group-item>
                            </b-list-group>
                        </b-collapse>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 sub-filter"  v-if='physical'>
            <div class="row redeemhistory-row">
                <div class="col-12 custom-table" style="overflow-x: auto;width: 500px !important;">
                    <div class="row redeemable-item flex-nowrap" v-for="(row, index) in redeem_his_list.list" :key="index" >
                        <div class="col-12">
                            <div class="row flex-nowrap line">
                                <div class="col line " style="width: 100px; !important;">
                                    <!-- <p><img class="img-fluid img-table" :src="row.image" alt="..." /></p> -->
                                    <p class="img-table" :style="'background-image: url('+row.image+')'"></p>
                                </div>
                                <div class="col-5 line no-pd" style="min-width: 490px !important;">
                                    <p>
                                        <span class="text-default" style="font-weight:700;"> {{ row.order_name.toUpperCase() }}</span><br>
                                        <span class="text-default-dark"> {{ row.publisher }}</span>&nbsp;
                                    </p>
                                </div>
<!--                                <div class="col-2 line no-pd" style="min-width: 186px !important;">-->
<!--                                    <p>-->
<!--                                        <span class="text-default order-id" > {{ getOrderId(row.order_id) }}-->
<!--                                            <a href="javascript:void(0);" @click="clipboard(row.order_id)">-->
<!--                                                <span-->
<!--                                                    class="iconify"-->
<!--                                                    data-icon="bx:copy"-->
<!--                                                    style="color: #4A525F"-->
<!--                                                    data-width="24"-->
<!--                                                    data-height="24"-->
<!--                                                >-->
<!--                                                </span>-->
<!--                                            </a>-->
<!--                                        </span>-->
<!--                                        <br>-->
<!--                                        <span class="text-default-dark"> {{ $t("redeem.history.order-id") }} </span> -->
<!--                                    </p>-->
<!--                                </div>-->
                                <div class="col-1 line no-pd" style="min-width: 152px !important;">
                                    <p>
                                        <span :class="{'text-completed':row.status == 'Completed','text-to-ship':row.status == 'To Ship', 'text-to-receive':row.status == 'To Receive'}" > {{ row.status }}</span><br>
                                        <b class="text-default-dark"> {{ $t("redeem.history.status") }} </b>
                                    </p>
                                </div>
                                <div class="col line no-pd" style="min-width: 130px !important;">
                                    <p>
                                        <span class="text-default date" > {{ getTimeDiff(row.date) }}</span><br>
                                        <span class="text-default-dark"> {{ $t("redeem.history.date") }} </span>
                                    </p>
                                </div>
                                <div class="col line no-pd text-right" style="min-width: 10px !important;padding-right:30px;">
                                    <p>
                                        <a data-toggle="collapse" :data-target="'#collapse-'+index" style="cursor: pointer">
                                            <span class="iconify shipping-arrow" v-if='!row.detailsShowing' data-icon="ri:arrow-drop-down-line"></span>
                                        </a>
                                    </p>
                                </div>
                            </div>

                            <div class="row flex-nowrap">
                                <div class="col-12" style="min-width: 1040px !important;">
                                    <div class="collapse shipping-info" :id="'collapse-'+index">
                                        <div class="row">
                                            <div class="col-8 text-default-info">{{ $t("redeem.history.shipping-info") }}</div>
                                            <div class="col-2 text-right text-default-dark" style="padding:1px">{{ $t("redeem.history.tracking") }}</div>
                                            <div class="col-2 text-default track-no" style="padding:1px;font-size:14px;"> {{row.tracking_number}}
                                            <a href="javascript:void(0);" @click="clipboard(row.tracking_number)">
                                                    <span
                                                        class="iconify"
                                                        data-icon="bx:copy"
                                                        style="color: #4A525F"
                                                        data-width="24"
                                                        data-height="24"
                                                    >
                                                    </span>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-2">
                                                <div class="text-default-sm shipping" style="padding-top: 16px;">
                                                    <span>{{ $t("redeem.history.logistic") }} </span></div>
                                                <div class="text-default-dark shipping">
                                                    <p> {{row.delivery.send_by}}</p> </div>
                                                <div class="text-default-sm shipping">{{ $t("redeem.history.delivery-address") }}</div>
                                                <div class="text-default-dark shipping delivery">{{row.delivery.address}}</div>
                                            </div>
                                            <div class="col-1" style="top: 18px;">
                                                    <div class="wrapper">
                                                        <ul class="StepProgress">
                                                            <li class="StepProgress-item is-done"></li>
                                                            <!-- <li class="StepProgress-item"></li>
                                                            <li class="StepProgress-item"></li>
                                                            <li class="StepProgress-item"></li>
                                                            <li class="StepProgress-item"></li> -->
                                                        </ul>
                                                    </div>
                                            </div>
                                            <div class="col-8 timeline-shipping">
                                                <div class="text-default-sm detail">{{getMomentCustom(row.date)}} {{row.tracking_history}}</div>
                                                <!-- <div class="text-default-dark detail">{{row.tracking_history}} </div>
                                                <div class="text-default-dark detail">{{row.tracking_history}}</div>
                                                <div class="text-default-dark detail">{{row.tracking_history}}</div>
                                                <div class="text-default-dark detail">{{row.tracking_history}}</div> -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
             <div class="row text-center pagination" v-if="Object.keys(redeem_his_list).length != 0">
                <p class="mt-3">
                    <i
                        class="fas fa-arrow-left"
                        style="cursor:pointer;"
                        :class="redeem_his_list.current_page == 1 || redeem_his_list.current_page == 0 ? 'disable_prev_page': 'arrow-enable'"
                        @click="prevPage"
                    ></i>
                    <span style="color:#4A525F; margin-left:29px; margin-right:29px">Page {{redeem_his_list.current_page}} of {{redeem_his_list.total_page}}</span>
                    <i
                        class="fas fa-arrow-right"
                        style="cursor:pointer;"
                        :class="redeem_his_list.current_page == redeem_his_list.total_page ? 'disable_next_page': 'arrow-enable'"
                        @click="nextPage"
                    >
                    </i>
                </p>
              </div>
        </div>

        <div class="col-12 sub-filter"  v-else>
            <div class="row redeemhistory-row">
                <div class="col-12 custom-table" style="overflow-x: auto;width: 500px !important;">
                    <div class="row redeemable-item flex-nowrap" v-for="(row, index) in redeem_digital_list" :key="index">
                        <div class="col-12">
                            <div class="row flex-nowrap">
                                <div class="col" style="min-width: 100px !important;padding-left: 30px;">
                                    <img class="text-default img-fluid" style="min-height:64px;min-width:63.7px;" :src="row.image" alt="..." />
                                </div>
                                <div class="col line no-pd" style="min-width: 300px !important;">
                                    <p>
                                        <span class="text-default" style="font-weight:600;"> {{ row.order_name.toUpperCase() }}</span><br>
                                        <span class="text-default-dark"> {{ $t("redeem.history.token",{id:`${row.token_id.substr(0, 11)}...${row.token_id.slice(-4)}`}) }}</span>&nbsp;
                                        <a href="javascript:void(0);" v-clipboard:copy='row.token_id'>
                                            <span class="iconify" data-icon="bx:copy" style="color: white" data-width="24" data-height="24"></span>
                                        </a>
                                    </p>
                                </div>
                                <div class="col line no-pd" style="min-width: 150px !important;">
                                    <p>
                                        <span class="text-default" > {{ row.type }}</span><br><br>
                                        <span class="text-default-dark"> {{ $t("redeem.history.order-id") }}  </span>
                                    </p>
                                </div>
                                 <div class="col line no-pd" style="min-width: 150px !important;">
                                    <p>
                                        <span class="text-default" > {{ getPlatform(row.platform) }}</span><br><br>
                                        <span class="text-default-dark"> {{ $t("redeem.history.platform") }}  </span>
                                    </p>
                                </div>
                                <div class="col line no-pd" style="min-width: 150px !important;">
                                    <p>
                                        <span :class="{'text-completed':row.status == 'Completed','text-to-ship':row.status == 'To Ship', 'text-to-receive':row.status == 'To Receive'}" > {{ row.status }}</span><br><br>
                                        <b class="text-default-dark"> {{ $t("redeem.history.status") }} </b>
                                    </p>
                                </div>
                                <div class="col line no-pd" style="min-width: 150px !important;">
                                    <p>
                                        <span class="text-default" > {{ row.date }}</span><br><br>
                                        <span class="text-default-dark"> {{ $t("redeem.history.date") }}  </span>
                                    </p>
                                </div>
                                <div class="col line no-pd" style="min-width: 150px !important;padding-right: 20px;">
                                    <p>
                                        <br>
                                        <button id="show-btn" @click="$bvModal.show('modal-get-physical')"
                                            class="btn btn-preorder mx-2 my-sm-2"
                                            style="min-width: 100px;min-height: 40px;"
                                        > Get Key
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <b-modal id="modal-get-physical" centered size="sm" hide-footer>
                    <template #modal-header="{ close }">
                        <h5 id="modal-get-physical___BV_modal_title_" class="modal-title">Get Key</h5>
                        <button type="button" class="close" @click="close()" aria-label="Close"
                            style="font-weight:normal;">X</button>
                    </template>
                    <template #default="{ hide }">
                        <div class="d-block">
                            <div class="row">
                                <div class="col-md-4">
                                    <!-- <img src="~@/assets/game_detail/icon_img.png" style="min-width:70px;min-height:70.2px;" /> -->
                                </div>
                                <div class="col-md-8">
                                    <p class="text-modal-key">{{$t('modals.redeem-detail.game')}}</p>
                                    <p class="text-modal-key-detail">{{$t('modals.redeem-detail.detail-game')}}</p>
                                </div>
                            </div>
                            <div class="row text-center">
                                <p class="text-lg" style="font-size:36px;" id="order">{{order}}</p>
                            </div>
                        </div>
                        <hr />

                        <a href="javascript:void(0);" v-clipboard:copy='order'>
                            <button type="button"
                                class="btn btn-outline-secondary btn-block btn-border text-color btn-margin-r"
                                data-mdb-ripple-color="dark" @click="hide()" style="width:100%; box-shadow: 2px 1000px 1px #2b2b3e inset;"
                            >{{$t('modals.physical-key.copy-key')}}</button>
                        </a>
                        <div class="row text-center"><a href="#" class="text-link">{{$t('modals.physical-key.guide')}}</a></div>
                    </template>
                </b-modal>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {timeDifference, convertPlatform, getConvertOrderId} from "@/common/core"
import moment from "moment";
import ServiceFilter from "@/data/ServiceFilter.json";

export default {
  name: "section-redeem-history",
  props: {
      redeem_his_list: { required: true },
      redeem_fields_physical: { type: Array, required: false },
      redeem_digital_list: { required: false },
      redeem_fields_digital: { type:Array, required: false },
      order_no: { type: String, required: false }
  },
  data: () => {
    return {
        isShow: true,
        selected: null,
        physical: true,
        digital:false,
        isFilterAll: false,
        isFilterShip: false,
        isFilterReceive: false,
        isFilterCompleted: false,
        typeFilter: 0,
        toggle: false,
        sortBy: 'age',
        sortDesc: false,
        order: '',
        text: '',
        redeem_history_sort_by_list: ServiceFilter.redeem_history_sort_by_list,
        redeem_history_sort_by: '',
    };
  },
  created(){
      this.isFilterAll = true;

      for (let i = 0; i < this.redeem_history_sort_by_list.length; i++) {
        if (this.redeem_history_sort_by == '' && this.redeem_history_sort_by_list[i].checked) {
            this.redeem_history_sort_by = i
        }
    }
  },
   mounted() {
      let text = " ";
      let count = 0;
      for (let i = 0; i <= 3; i++) {
          text +=  this.order_no.substr(count, 4) + " ";
          count += 4;
      }
      this.order = text;
      return this.order;
   },
  methods: {
        filterPhysical() {
            this.physical = true;
            this.digital = false;
        },
        filterDigital() {
            this.physical = false;
            this.digital = true;
        },
        filterData(type) {
            this.$root.$emit("filter-history", type);
            this.isFilterAll = false;
            this.isFilterShip = false;
            this.isFilterReceive = false;
            this.isFilterCompleted = false;
            this.typeFilter = type

            switch (type) {
                case 1:
                    this.isFilterShip = true;
                    break;
                case 2:
                    this.isFilterReceive = true;
                    break;
                case 3:
                    this.isFilterCompleted = true;
                    break;
                default :
                    this.isFilterAll = true;
            }
        },
        getPlatform(value){
           return convertPlatform(value)
        },
        getOrderId(orderId) {
            return  getConvertOrderId(orderId)
        },
        copyContractAddress() {
            let hiddenToCopy = document.querySelector('#redeem-history-token')
            hiddenToCopy.select()
            document.execCommand('copy')
            hiddenToCopy.setAttribute('type', 'hidden')
            window.getSelection().removeAllRanges()
        },
        prevPage() {
            if(this.redeem_his_list.current_page ==  1) return;
            this.$root.$emit('change-page-history', 1, this.redeem_his_list.current_page - 1, this.typeFilter, this.redeem_history_sort_by);
            },
        nextPage() {
            if(this.redeem_his_list.current_page ==  this.redeem_his_list.total_page) return;
            this.$root.$emit('change-page-history', 1, this.redeem_his_list.current_page + 1, this.typeFilter, this.redeem_history_sort_by);
        },
        getTimeDiff(previous){
            return timeDifference(previous)
        },
        getMomentCustom(value){
            return moment.unix(value).format('DD-MM-YYYY HH:mm')
        },
        clipboard (str) {
            const el = document.createElement('textarea');
            el.addEventListener('focusin', e => e.stopPropagation());
            el.value = str;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
        },
        doRedeemHistorySortBy(index) {
            this.redeem_history_sort_by = index
            this.$root.$emit('bv::toggle::collapse', 'redeem-history-sort-collapse')
            this.$root.$emit("load-redeem-history", index, this.typeFilter)
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~@/scss/_variables.scss";

.hidden_header {
    display: none;
}
.dropdown-filter {
    cursor: pointer;
}
span.text-link.active {
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: -0.015em;
  color: #ffffff;
}

span.text-link {
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: -0.015em;
  color: #e3e3e3;
}

span.dot {
  font-size: 3rem;
  margin-left: 0.75rem;
  margin-right: 0.75rem;
}

.row.justify-content-end.button {
  margin-top: 0.5rem;
}

.switch-filter-left-active {
    color: #FFFFFF;
    background-image: $button-color-hilight;
    top: 5px;
    border-radius: 40px;
    box-sizing: border-box;
	display: inline-block;
	letter-spacing: 1px;
	padding: 1px;
	position: relative;
    text-decoration: none;
	z-index: 2;
    cursor: pointer;
}
.switch-filter-left-active:hover {
    text-decoration: none;
	color: #fff;
}
.switch-filter-left-active span {
    padding: 0.575rem 1.25rem;
	align-items: center;
	border-radius: 40px;
	display: flex;
	justify-content: center;
	height: 100%;
	transition: background .5s ease;
	width: 100%;
    background: transparent;
    font-size: 12px !important;
    font-weight: 700;
}

.switch-filter-left {
    color: #FFFFFF;
    background-image: $button-color-hilight;
    top: 5px;
    border-top-left-radius : 50rem !important;
    border-bottom-left-radius : 50rem !important;
    box-sizing: border-box;
	display: inline-block;
	letter-spacing: 1px;
	padding: 1px;
	position: relative;
    text-decoration: none;
    cursor: pointer;
}
.switch-filter-left.disabled {
    pointer-events: none;
    cursor: default;
    color: #9F9F9F;
    background: #9F9F9F;
}
.switch-filter-left:hover {
    text-decoration: none;
	color: #fff;
}
.switch-filter-left span {
    padding: 0.575rem 1.25rem;
	align-items: center;
	border-top-left-radius : 50rem !important;
    border-bottom-left-radius : 50rem !important;
	display: flex;
	justify-content: center;
	height: 100%;
	transition: background .5s ease;
	width: 100%;
    background: #1B1B20;;
    font-size: 12px !important;
    font-weight: 700;
}

.switch-filter-right-active {
    color: #FFFFFF;
    background-image: $button-color-hilight;
    top: 5px;
    border-radius: 40px;
    box-sizing: border-box;
	display: inline-block;
	letter-spacing: 1px;
	padding: 1px;
	position: relative;
    text-decoration: none;
	z-index: 2;
    margin-left: -14px;
    cursor: pointer;
}
.switch-filter-right-active:hover {
    text-decoration: none;
	color: #fff;
}
.switch-filter-right-active span {
    padding: 0.575rem 1.25rem;
	align-items: center;
	border-radius: 40px;
	display: flex;
	justify-content: center;
	height: 100%;
	transition: background .5s ease;
	width: 100%;
    background: transparent;
    font-size: 12px !important;
    font-weight: 700;
}

.switch-filter-right {
    color: #FFFFFF;
    background-image: $button-color-hilight;
    top: 5px;
    border-top-right-radius : 50rem !important;
    border-bottom-right-radius : 50rem !important;
    box-sizing: border-box;
	display: inline-block;
	letter-spacing: 1px;
	padding: 1px;
	position: relative;
    text-decoration: none;
    margin-left: -16px;
    cursor: pointer;
}
.switch-filter-right:hover {
    text-decoration: none;
	color: #fff;
}
.switch-filter-right.disabled {
    pointer-events: none;
    cursor: default;
    color: #9F9F9F;
    background: #9F9F9F;
}
.switch-filter-right span {
    padding: 0.575rem 1.25rem;
	align-items: center;
	background: #1B1B20;
	border-top-right-radius : 50rem !important;
    border-bottom-right-radius : 50rem !important;
	display: flex;
	justify-content: center;
	height: 100%;
	transition: background .5s ease;
	width: 100%;
    font-size: 12px !important;
    font-weight: 700;
}

.sub-filter {
  border-radius: 16px;
  padding: 0 15px;
}

.text-default {
    color: $dark-1;
    font-weight: 700;
    font-size: 16px;
    line-height: 30px;

    &.track-no {
        color: $yellow;
    }
    &.date,
    &.order-id {
        font-weight: 500;
    }
}

.text-default-info {
    color: $dark-2;
    font-weight: 700;
    font-size: 16px;
    line-height: 30px;
}

.text-default-sm {
    color: $dark-2;
    font-size: 12px;
    font-weight: 700;
    line-height: 16px;

    &.shipping {
        padding-bottom: 4px;
    }

    &.detail {
        padding-bottom: 15px;
        font-weight: 400;
        font-size: 14px;
        line-height: 8px;
        color:$light-green;
    }
}

.text-default-dark {
    color: $light-grey-2;
    font-size: 14px;
    font-weight: 400;
    line-height: 30px;
    &.shipping {
        color: $dark-1;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;

         &.delivery {
            color: $dark-1;
         }
    }
    &.detail {
        padding-bottom: 2.5px;
        font-weight: 400;
        font-size: 14px;
        line-height: 31px;
        color:$dark-2;
    }
}

.text-yellow {
    font-size: 15px;
    color: #F0B90B;
    font-weight: 500;
    line-height: 30px;
}

.table th, .table td {
    border-top: none !important;
    border-block-end-color :#333333 !important;
}

.text-completed {
    font-size: 16px;
    color: $light-green;
    font-weight: 600;
    line-height: 30px;
}

.text-to-ship {
    font-size: 16px;
    color: #51BCBC;
    font-weight: 600;
    line-height: 30px;
}

.text-to-receive {
    font-size: 16px;
    color: #F9BB3D;
    font-weight: 600;
    line-height: 30px;
}

.table.b-table > tbody > tr.b-table-details > td {
    border-top: none !important;
    background: #23262F;
    border-block-end: none;
}

.wrapper {
  width: 30px;
}

.StepProgress {
  padding-left: 45px;
  list-style: none;

  &::before {
    display: inline-block;
    content: '';
    position: absolute;
    left: 15px;
    width: 10px;
    height: auto;
    border-left: 2px solid $light-2;
  }

  &-item {
    position: relative;
    counter-increment: list;

    &:not(:last-child) {
      padding-bottom: 34px;
    }
    &:last-child {
      padding-bottom: 20px;
    }

    &::before {
      display: inline-block;
      content: '';
      position: absolute;
      left: -41.5px;;
      height: 100%;
      width: 10px;
      border-left: 2px solid $light-2;
    }
    &:last-child::before {
      height: 0;
    }

    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      top: 0;
      left: -45px;
      width: 9px;
      height: 9px;
      border: 2px solid $light-2;
      border-radius: 50%;
      background-color: $light-2;
    }

    &.is-done {
      &::after {
        font-size: 10px;
        color: #FFF;
        text-align: center;
        border: 2px solid $light-green;
        background-color: $light-green;
      }
    }
  }

  strong {
    display: block;
  }
}

div#modal-get-physical___BV_modal_content_ {
    font-family: Montserrat;
    font-style: normal;
    width: 400px;

    @media (max-width: $tablet) {
        width: 100%;
    }
}

a.text-link {
    font-weight: 500;
    font-size: 16px;
    line-height: 30px;
    letter-spacing: -0.015em;
    color: #1E87FF;
    margin-top: 1rem;
}

span.text-lg {
    font-weight: 600;
    font-size: 30px;
    line-height: 50px;
    letter-spacing: -0.015em;
    color: #E3E3E3;
    opacity: 0.9;
}

p.text-modal-key {
    font-weight: 600;
    font-size: 16px;
    line-height: 30px;
    display: flex;
    align-items: center;
    letter-spacing: -0.015em;
    color: #E3E3E3;
}

p.text-modal-key-detail {
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: -0.015em;
    text-transform: uppercase;
    color: #9F9F9F;
}

h5#modal-get-physical___BV_modal_title_ {
    font-weight: bold;
    font-size: 24px;
    line-height: 36px;
    letter-spacing: -0.015em;
    color: #FFFFFF;
}

.section-redeem-history .row.redeemhistory-row {
    padding: 0 !important;
}
.section-redeem-history .row.redeemhistory-row > div {
    padding-top: 0.75rem;
    padding-bottom: 0;
}

.section-redeem-history .row.redeemhistory-row .redeemable-item .line {
    padding-top: 10px;
}

.section-redeem-history .row.redeemhistory-row .redeemable-item .no-pd {
    padding-left: 0;
    padding-right: 0;
}
.section-redeem-history .row.redeemhistory-row .redeemable-item .shipping-info {
    background-color: $white-bg;
    padding: 10px 30px;
    width: 100%;
    min-width: 1116px;
    right: 15px;
    position: relative;
}
.section-redeem-history .switch-filter-left span,
.section-redeem-history .switch-filter-left-active span,
.section-redeem-history .switch-filter-right span,
.section-redeem-history .switch-filter-right-active span {
    font-size: 16px !important;
}
.timeline-shipping {
    top: 18px;
    padding:1px;
    margin-left: -52px;
}

.timeline-shipping .text-default-dark {
    color: $light-2;
}

@media (max-width: 576px) {
    .profile-redeem-sort {
        text-align: left !important;
    }
    .profile-redeem-sort,
    .profile-redeem-filter {
        padding-bottom: 15px;
    }
}
@media (min-width: 576px) {
    .profile-redeem-sort {
        text-align: right !important;
    }
}

@media (min-width: 1470px) {
    .custom-table::-webkit-scrollbar {
    width: 0;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
    }
}

.shipping-arrow {
  color: $dark-1;
  font-size: 30px;
}

//redeemable color
.row.redeemhistory-row {
    background: $light-1;
    border-radius: 16px;
    margin-top: 2rem;
    width: 100%;
    left: 15px;
    position: relative;
}

.flex-nowrap.line {
    border-bottom: 1px solid $light-2;
}

.img-table{
    background-color: $white-bg;
    min-width: 64px;
    height: auto !important;
    border-radius: 6px !important;
    object-fit: scale-down;
    box-shadow: 0px 2px 12px 2px rgb(0 0 0 / 5%);
    padding: 32% 6%;
    background-repeat: no-repeat !important;
    background-position: center !important;
    background-size: contain !important;
}

.sort-collapse {
    position: absolute;
    z-index: 10;
    right: 0;
    text-align: left;
    font-weight: 600;
    font-size: 16px;
    line-height: 16px;
}

.sort-collapse .list-group-item {
    cursor: pointer;
}
</style>
