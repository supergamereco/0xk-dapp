<template>
  <div class="data-table-selection">
    <div class="row" v-show="isClaim">
        <div class="col text-right">
            <div class="row filter-my-profile">
                <div class="col-12">
                    {{ $t("my-profile.sort") }}
                </div>
            </div>
            <div class="row justify-content-end">
                <div class="col-12" style="display: inline-table;">
                    <div class="dropdown">
                        <a
                            class="btn btn-dark dropdown-toggle dropdownMenuLink"
                            href="#"
                            role="button"
                            data-mdb-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {{ $t("my-profile.recently-listed") }}
                        </a>

                <ul
                class="dropdown-menu"
                aria-labelledby="dropdownMenuLink"
                >
                <li><a class="dropdown-item" href="#"> {{ $t("my-profile.recently-listed")}}</a></li>
                </ul>
            </div>
            </div>
        </div>
        </div>
    </div>
    <div class="redeemable-list">
      <!-- section selection header -->
      <div class="span-selection-header">
        <div class="row redeemable-row">
          <div class="col-lg-4 col-md-4 col-sm-12 checkbox-content">
              <!-- <b-form-checkbox
                  type="checkbox"
                  v-model="selectAll"
                  class="checkbox"
              >
                <span class="text-checkbox">
                    {{ $t("datatable-selection.check-box-selection-all") }}
                </span>
            </b-form-checkbox> -->
          </div>
          <div class="col-lg-8 col-md-8 col-sm-12 datatable-for-desktop align-items-center justify-content-end"
           style="display: flex;">
              <a v-if="is_redeem" v-b-popover.hover.top="'Once redeemed, the NFT will be burnt from the supply.'">
                <span
                    class="iconify icon_information align-text-top"
                    data-icon="akar-icons:info"
                    data-width="20"
                    data-height="20"
                    style="color: #2D7CFC; margin:0.2rem !important"
                ></span>
              </a>
              <span class="text-detail">
                {{ $t("datatable-selection.total-time-redeem", {minutes: totalDataTable()}) }}
              </span>
            <b-button
                style="border: 0px; width: 133px !important; margin-left : 12px; height: 40px;"
                class="button-hilight btn-preorder"
                block
                @click="openModal(btn)"
            >
              {{ btn == 'Claim' ? $t('my-profile.claim-btn') : $t('my-profile.redeem-btn') }}
            </b-button>
          </div>
          <div class="col-12 align-items-center datatable-for-mobile">
            <div class="text-detail">
              <a v-b-popover.hover.top="'Once redeemed, the NFT will be burnt from the supply.'">
                <span
                    class="iconify icon_information align-text-top"
                    data-icon="akar-icons:info"
                    data-width="20"
                    data-height="20"
                    style="color: #2D7CFC"
                ></span>
              </a>
              <span class="text-detail">
                {{ $t("datatable-selection.total-time-redeem", {minutes: totalDataTable()}) }}
              </span>
            </div>
          </div>
          <div class="col-12 align-items-center datatable-for-mobile">
            <b-button
                style="border: 0px; width: 100% !important; height: 40px;"
                class="button-hilight btn-preorder"
                block
                @click="openModal(btn)"
            >
              {{ btn == 'Claim' ? $t('my-profile.claim-btn') : $t('my-profile.redeem-btn') }}
            </b-button>
          </div>
        </div>
      </div>
      <!-- section selection table -->
      <div class="datatables-list">
        <div
            class="row datatables-row"
            v-for="(item, idx) in dataList.list"
            :key="item.id"
            :class="idx === dataList.list.length - 1 ? 'datatables-no-border' : ''"
        >

          <!-- check box-->
          <div class="col-1 checkbox-table-list">
            <!-- <div class="container"> -->
              <b-form-checkbox
                  class="checkbox"
                  type="checkbox"
                  v-model="selected"
                  :value="item.id"
                  number
                  :disabled="selected.length > 0 && selected.indexOf(item.id) === -1"
              >
              </b-form-checkbox>
            <!-- </div> -->
          </div>
          <!-- MOBILE -->
          <!-- <div class="datatable-row-mobile"> -->
            <!-- image -->
            <div class="col-3 image-table-list datatable-row-mobile" align-v="center">
              <div class="d-flex justify-content-start">
                <b-img :src="getImgUrl(item.image)" class="img-table"></b-img>
              </div>
            </div>
            <!-- Title -->
            <div class="col-8 special-content datatable-row-mobile" style="padding-top : 6px;">
              <span class="detail-title"> {{ item.title }}</span>

              <p class="detail-order">
                {{ item.publisher }}
              </p>
            </div>

            <!-- standard -->
            <div class="col-4 offset-4 special-content datatable-row-mobile">
              <span v-if="item.is_claim === false">
                <span class="title-medium">
                {{ item.token_id }}
                  <a href="javascript:void(0);" @click="clipboard(item.token_id)">
                    <span
                        class="iconify"
                        data-icon="bx:copy"
                        style="color: #4A525F"
                        data-width="20"
                        data-height="20"
                    >
                    </span>
                  </a>
                </span>

                <p class="detail-order">
                  {{ $t("datatable-selection.token-id") }}
                </p>
              </span>
              <span v-else>
                <span class="title-medium">
                 {{ getOrderId(item.order_id) }}
                  <a href="javascript:void(0);" @click="clipboard(item.order_id)">
                    <span
                        class="iconify"
                        data-icon="bx:copy"
                        style="color: #4A525F"
                        data-width="20"
                        data-height="20"
                    >
                    </span>
                  </a>
                </span>
                <p class="detail-order">
                  {{ $t("datatable-selection.order-id") }}
                </p>
              </span>
            </div>

            <!-- digital -->
            <div class="col-4 special-content datatable-row-mobile content-custom">
              <span class="title-medium">
                  {{ digital_content }}
              </span>
              <p class="detail-order">
                {{ $t("datatable-selection.status") }}
              </p>
            </div>
          <!-- </div> -->

          <!-- DESKTOP -->
          <!-- image -->
          <div
            class="datatable-row-desktop image-table-list"
            align-v="center"
            :class="item.is_claim === true ? 'col-lg-1 col-md-12 col-sm-12 claim' : 'col-lg-1 col-md-12 col-sm-12 redeem'"
          >
            <!-- <div class="d-flex justify-content-start">
              <b-img :src="getImgUrl(item.image)" class="img-table"></b-img>
            </div> -->

            <!-- <div class="col line " style="width: 100px; !important;"> -->
                <p><img class="img-fluid img-table" :src="getImgUrl(item.image)" alt="..." /></p>
            <!-- </div> -->
          </div>

          <div
            class="datatable-row-desktop image-table-list"
            align-v="center"
            :class="item.is_claim === true ? 'col-lg-5 col-md-12 col-sm-12 claim' : 'col-lg-5 col-md-12 col-sm-12 redeem'"
          >

                <span class="detail-title"> {{ item.title }}</span>
                <p class="detail-order">
                  {{ item.publisher }}
                </p>

          </div>

          <!-- TOKEN ID OR ODER ID -->
          <div
            class="datatable-row-desktop special-content"
            :class="item.is_claim === true ?  'col-lg-3 col-md-6 col-sm-12' :  'col-lg-3 col-md-6 col-sm-12'"
          >
            <span v-if="item.is_claim === false">
              <span class="title-medium">
              {{ item.token_id }}
                <a href="javascript:void(0);" @click="clipboard(item.token_id)">
                  <span
                      class="iconify"
                      data-icon="bx:copy"
                      style="color: #4A525F"
                      data-width="24"
                      data-height="24"
                  >
                  </span>
                </a>
              </span>

              <p class="detail-order">
                {{ $t("datatable-selection.token-id") }}
              </p>
            </span>
            <span v-else>
              <span class="title-medium">
              {{ getOrderId(item.order_id) }}
                <a href="javascript:void(0);" @click="clipboard(item.order_id)">
                  <span
                      class="iconify"
                      data-icon="bx:copy"
                      style="color: #4A525F"
                      data-width="24"
                      data-height="24"
                  >
                  </span>
                </a>
              </span>
              <!-- <span class="title-medium">
                  {{ item.order_id }}
              </span> -->
              <p class="detail-order">
                {{ $t("datatable-selection.order-id") }}
              </p>
            </span>
          </div>
          <div class="datatable-row-desktop col-lg col-md-6 col-sm-12 special-content">
            <span class="title-medium">
                {{ digital_content }}
            </span>
            <p class="detail-order">
              {{ $t("datatable-selection.status") }}
            </p>
          </div>

        </div>
      </div>
      <!-- end activity list-->
    </div>

    <div class="row text-center pagination">
      <p class="mt-3">
        <i class="fas fa-arrow-left" style="cursor:pointer;" :class="dataList.current_page == 1 ? 'disable_prev_page': 'arrow-enable'" @click="prevPage"></i>
        <span class="text-bold-yellow" style="color: #4A525F; margin-left:29px; margin-right:29px">Page {{dataList.current_page}} of {{dataList.total_page}}</span>
        <i class="fas fa-arrow-right" style="cursor:pointer;"  :class="dataList.current_page == dataList.total_page ? 'disable_next_page': 'arrow-enable'" @click="nextPage"></i>
      </p>
    </div>

    <!-- start Process Redeem -->
    <b-modal
        v-model="isOpenRedeemModal"
        id="modal-redeem-detail"
        size="xl"
        :title="$t('modals.redeem-detail.title-modal')"
        hide-footer
        centered
    >
      <div class="row">
        <div class="col-lg-7 col-md-12 col-sm-12">
          <p class="title-medium">{{ $t("modals.redeem-detail.title") }}</p>
          <form
              @submit.stop.prevent
              class="address-book needs-validation"
              novalidate
          >
            <div class="row">
              <div class="col-md-12">
                <p class="input-field-block form-floating">
                  <input
                    class="bg-input fullname form-control"
                    v-model="fullName"
                    type="text"
                    :placeholder="$t('profile-address.full-name')"
                    required
                    id="floatingFullname"
                  />

                  <label
                      class="floating-fullname"
                      for="floatingFullname"
                  >{{ $t('profile-address.full-name') }}</label>
                </p>

                <span :class="validName(fullName) ? 'invalid-feedback': 'invalid-input'" >
                  {{ ( !validAddress(fullName) && !(fullName.length > 0) ) ? $t("modals.redeem-detail.validate-empty") : $t("modals.redeem-detail.validate-email") }}</span>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 mt-4">
                <p class="input-field-block form-floating">
                  <input
                      type="tel"
                      v-model="phoneNumber"
                      :placeholder="$t('profile-address.phone-number')"
                      class="bg-input phone-number form-control"
                      :state="validatePhoneNumber"
                      pattern="^\d{3}-\d{7}$"
                      required
                      id="floatingInputPhoneNumber"
                  />
                  <label
                      class="floating-number"
                      for="floatingInputPhoneNumber"
                  >{{ $t('profile-address.phone-number') }}</label>
                  <span class="v-reset-input" :class="phoneNumber.length > 0 ? 'v-reset-input-active': ''" @click="phoneNumber = ''">
                    <span class="iconify-inline" data-icon="heroicons-solid:x" style="color: #4A525F; vertical-align: -0.3em;" data-width="15" data-height="15"></span>
                  </span>
                </p>

                <span :class="validPhone(phoneNumber) ? 'invalid-feedback': 'invalid-input'" >{{ $t("modals.redeem-detail.validate-phone") }}</span>
              </div>
              <div class="col-md-6 mt-4">
                <p class="input-field-block form-floating">
                  <input
                      type="text"
                      v-model="email"
                      :placeholder="$t('profile-address.email')"
                      class="bg-input email form-control"
                      id="floatingEmail"
                      required
                  />
                  <label
                      class="floating-email"
                      for="floatingEmail"
                  >{{ $t('profile-address.email') }}</label
                  >
                  <span class="v-reset-input" :class="email.length > 0 ? 'v-reset-input-active' : ''" @click="email = ''">
                    <span class="iconify-inline" data-icon="heroicons-solid:x" style="color: #4A525F; vertical-align: -0.3em;" data-width="15" data-height="15"></span>
                  </span>
                </p>
                <span v-if="email.length > 0" :class="validEmail(email) ? 'invalid-feedback': 'invalid-input'" >{{ $t("modals.redeem-detail.validate-email") }}</span>
                <span class="invalid-input" >{{ ( email.length == 0 ) ? $t("modals.redeem-detail.validate-empty") : '' }}</span>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4 mt-4">
                <div class="form-floating province">
                  <select
                      class="bg-select province form-select"
                      :class="province !== null ? 'active' : ''"
                      id="floatingSelectProvince"
                      v-model="province"
                      :style="getStyleFont(province)"
                      aria-label="Floating label select"
                      @change="selectProvince"
                      required
                  >
                    <option
                        v-for="(value, idx) in provinceList"
                        :key="idx"
                        :value="value"
                    >{{ value }}
                    </option>
                  </select>
                  <label
                      class="label-select-province"
                      for="floatingSelectProvince"
                  >{{ $t('profile-address.province') }}</label>
                  <div class="clearfix"/>
                  <div :class="(province !== null ) ? 'invalid-feedback': 'invalid-input'" >{{$t("modals.redeem-detail.validate-select-option") }}</div>
                </div>
              </div>
              <div class="col-md-4 mt-4">
                <div class="form-floating district">

                  <select
                      class="bg-select district form-select"
                      :class="district != null ? 'active' : ''"
                      id="floatingSelectDistrict"
                      v-model="district"
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
                  >{{ $t('profile-address.district') }}</label
                  >
                  <div class="clearfix"/>
                  <div :class="(district !== null ) ? 'invalid-feedback': 'invalid-input'" >{{$t("modals.redeem-detail.validate-select-option") }}</div>
                </div>
              </div>
              <div class="col-md-4 mt-4">
                <div class="form-floating postcode">
                  <select
                      class="bg-select postcode form-select"
                      :class="postcode !== null ? 'active' : ''"
                      id="floatingSelectPostcode"
                      v-model="postcode"
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
                  >{{ $t('profile-address.postcode') }}</label>
                  <div class="clearfix"/>
                  <div :class="( postcode !== null) ? 'invalid-feedback': 'invalid-input'" >{{$t("modals.redeem-detail.validate-select-option") }}</div>
                </div>
              </div>
            </div>

            <div class="row mt-4">
              <div class="col-md-12">
                <div class="form-floating">
                                <textarea
                                    class="bg-input address form-control"
                                    placeholder="Address*"
                                    id="floatingTextareaAddress"
                                    v-model="address"
                                    :maxlength="maxCharacterAddress"
                                    rows="4"
                                    wrap="soft"
                                    style="resize: none; min-height: 80px"
                                    required
                                ></textarea>
                  <label
                      class="floating-address"
                      for="floatingTextareaAddress"
                  >{{ $t('profile-address.address') }}</label
                  >
                  <div class="clearfix"/>
                  <div :class="validAddress(address) ? 'invalid-feedback': 'invalid-input'" style="position: absolute;" >
                    {{ ( !validAddress(address) && !(address.length > 0) ) ? $t("modals.redeem-detail.validate-empty") : $t("modals.redeem-detail.validate-email") }}</div>
                  </div>
                  <div class="char-count">
                    <span>{{address.length}}/{{maxCharacterAddress}}</span>
                  </div>
              </div>
            </div>

            <div class="row mt-2">
              <div class="col-6 mt-2">
                <p class="title-medium">
                  {{ $t("modals.redeem-detail.notification-email") }}
                </p>
              </div>
              <div class="col-6 text-right">
                <b-form-checkbox
                    v-model="checked"
                    name="check-button"
                    size="lg"
                    switch
                ></b-form-checkbox>
              </div>
            </div>
          </form>

        </div>
        <div class="col-lg-5 col-md-12 col-sm-12 ">
          <div class="col bg-redeem-summary">
            <p class="title-medium">{{ $t("modals.redeem-detail.summary") }}</p>
            <div class="col bg-img" style="padding : 1px !important;">
              <div class="d-flex justify-content-center " style=" padding: 2.5rem;">
                <img :src="getImgUrlByIndex()" class="img-game-redeem img-fluid" />
              </div>
            </div>

            <div class="row" style="margin-top : 14.16px;">
              <span class="detail-title"> {{ this.selected.length > 0 ? dataList.list[0].title : '' }}</span>
              <p class="title-medium" style="margin-bottom: 0.3rem;">{{ $t("modals.redeem-detail.detail-game") }}</p>
              <p class="subtitle-medium" style="margin-bottom: unset;">Limited Chinese Zodiac Series</p>
            </div>

            <hr/>

            <div class="row" style="margin-top : 14.16px;">
              <div class="col-6">
                <p class="title-medium" style="color: #888E97; margin-bottom: unset;">{{ $t("modals.redeem-detail.type") }}</p>
              </div>
              <div class="col-6 text-right">
                <p class="title-medium" style="color: #888E97; margin-bottom: unset;">
                  {{ $t("modals.redeem-detail.amount", {amount: this.selected.length > 0 ? this.selected.length : 0}) }}
                </p>
              </div>
            </div>
          </div>
          <div class="detail-info">
            <div class="icon-info-modal my-auto">
              <b-icon id="collector-info" icon="exclamation-circle" style="color: #FFFFFF; margin: 0.5rem;"></b-icon>
            </div>
            <p class="title-medium" style="margin: 0.2rem; color: #FAFAFA; opacity: 0.9; word-break: break-word;">
              {{ $t('modals.redeem-detail.icon-text') }}
            </p>
          </div>
          <b-button @click="confirmShippingModal()" class="mt-3 btn-style-original" block>
            {{ $t("modals.redeem-detail.ok-btn") }}
          </b-button>
        </div>
      </div>
    </b-modal>

    <!-- redeem Confirm Shipping -->
    <b-modal
        v-model="isConfirmShippingModal"
        id="modal-confirm-shipping"
        size="lg"
        :title='$t("modals.redeem-confirm-shipping.title")'
        hide-footer
        centered
        :hide-header-close="redeemInprogress == 1"
    >
      <div class="row">
        <div class="col-lg-7 col-md-12 col-sm-12">
          <p class="title-medium">{{ $t("modals.redeem-detail.transaction-confirmation") }}</p>
            <div class="row bg-block-light">
              <span class="title-detail-redeem">{{ $t('modal-checkout.title-approve') }}</span>

              <div class="col-lg-12 col-md-12 col-sm-12">
                <div class="row" style="margin-top: 9px;">
                  <div class="col-12">
                    <span class="title-detail-game">{{ this.selected.length > 0 ? dataList.list[0].title : '' }}</span>
                  </div>
                </div>

                <div class="row" >
                  <div class="col-8" >
                    <span class="title-detail-text">{{ $t('card-presale.quantity-lbl')}}</span>
                  </div>
                  <div class="col-4 text-right">
                    <span class="title-detail-text">{{ $t("modals.redeem-detail.amount", {amount: this.selected.length > 0 ? this.selected.length : 0}) }} </span>
                  </div>
                </div>

              </div>
            </div>
            <div class="row bg-block-border bottom" style="margin: 10px 0 !important;">
              <div class="col-6">
                <span class="title-detail-text">Transaction Status</span>
              </div>
              <div class="col-6 text-right" v-show="approveStatus == 0">
                <span class="title-detail-text"  style="float: right; margin-top: 5px; margin-left: 5px;"> - </span>
              </div>
              <div class="col-6 text-right" v-show="approveStatus == 1">
                <span class="title-detail-text text-color-yellow text-weight" style="float: right; margin-top: 5px; margin-left: 5px;">In Progress</span>
                <div class="small-loader"></div>
              </div>
              <div class="col-6 text-right" v-show="approveStatus == 2" >
                <span class="title-detail-text text-color-green text-weight" style="float: right; margin-top: 5px; margin-left: 5px;">Success</span>
              </div>
              <div class="col-6 text-right" v-show="approveStatus == 3" >
                <span class="title-detail-text text-color-red text-weight" style="float: right; margin-top: 5px; margin-left: 5px;">Failed</span>
              </div>
            </div>

            <div class="row bg-block-light">
              <span class="title-detail-redeem">{{ $t('modals.redeem-detail.title-burn') }}</span>
              <div class="col-lg-12 col-md-12 col-sm-12">
                <div class="row" style="margin-top: 9px;">
                  <div class="col-12">
                    <span class="title-detail-game">{{ this.selected.length > 0 ? dataList.list[0].title : '' }}</span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-8" >
                    <span class="title-detail-text">{{ $t('card-presale.quantity-lbl')}}</span>
                  </div>
                  <div class="col-4 text-right">
                    <span class="title-detail-text">{{ $t("modals.redeem-detail.amount", {amount: this.selected.length > 0 ? this.selected.length : 0}) }} </span>
                  </div>
                  <div class="col-6">
                    <span class="title-detail-text"> {{ $t('modals.redeem-detail.shipping-fee') }}</span>
                  </div>
                  <div class="col-6 text-right">
                    <span class="title-detail-text"> {{ fee }} {{ currency }}</span>
                  </div>
                  <div class="col-6">
                    <span class="title-detail-text"> {{ $t('modals.redeem-detail.vat', {percent: percent_vat}) }}</span>
                  </div>
                  <div class="col-6 text-right">
                    <span class="title-detail-text"> {{ vat.toFixed(5) }} {{ currency }}</span>
                  </div>
                </div>
                <div class="row" style="margin-top: 9px;">
                  <div class="col-6">
                    <span class="title-detail-text text-color-black text-weight "> {{ $t("modals.redeem-detail.total-payment") }}</span>
                  </div>
                  <div class="col-6 text-right">
                    <span class="title-detail-text text-color-yellow text-weight text-total" > {{ total }} {{ currency }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="row bg-block-border bottom" style="margin: 10px 0 !important;">
              <div class="col-6">
                <span class="title-detail-text">Burn Status</span>
              </div>
              <div class="col-6 text-right" v-show="burnStatus == 0">
                <span class="title-detail-text"  style="float: right; margin-top: 5px; margin-left: 5px;"> - </span>
              </div>
              <div class="col-6 text-right" v-show="burnStatus == 1">
                <span class="title-detail-text text-color-yellow text-weight"  style="float: right; margin-top: 5px; margin-left: 5px;">In Progress</span>
                <div class="small-loader"></div>
              </div>
              <div class="col-6 text-right" v-show="burnStatus == 2" >
                <span class="title-detail-text text-color-green text-weight" style="float: right; margin-top: 5px; margin-left: 5px;">Success</span>
              </div>
              <div class="col-6 text-right" v-show="burnStatus == 3" >
                <span class="title-detail-text text-color-red text-weight" style="float: right; margin-top: 5px; margin-left: 5px;">Failed</span>
              </div>
            </div>

        </div>
        <div class="col-lg-5 col-md-12 col-sm-12 ">
          <div class="col bg-redeem-summary">
            <p class="title-medium">{{ $t("modals.redeem-detail.summary") }}</p>
            <div class="col bg-img" style="padding : 1px !important;">
              <div class="d-flex justify-content-center " style=" padding: 2.5rem;">
                <img :src="getImgUrlByIndex()" class="img-game-redeem img-fluid" />
              </div>
            </div>

            <div class="row" style="margin-top : 14.16px;">
              <span class="detail-title"> {{ this.selected.length > 0 ? dataList.list[0].title : '' }}</span>
              <p class="subtitle-medium" style="margin-bottom: unset;">Keyboards</p>
            </div>

            <hr/>

            <div class="row" style="margin-top : 14.16px;">
              <div class="col-6">
                <p class="title-medium" style="color: #888E97; margin-bottom: unset;">{{ $t("modals.redeem-detail.type") }}</p>
              </div>
              <div class="col-6 text-right">
                <p class="title-medium" style="color: #888E97; margin-bottom: unset;">
                  {{ $t("modals.redeem-detail.amount", {amount: this.selected.length > 0 ? this.selected.length : 0}) }}
                </p>
              </div>
            </div>
          </div>
          <div class="detail-info">
            <div class="col bg-img" style="padding: 14px;">
              <p class="text-title__shipping">{{ $t('modals.redeem-detail.title') }}</p>
              <template variant="outline-dark">
                <div class="icon-banner" @click="editAddress()">
                  <span class="iconify" data-icon="prime:pencil" data-width="29" data-height="25"></span>
                </div>
              </template>

              <div class="text-subtitle__shipping">{{ fullName }} {{ phoneNumber }}</div>
              <div class="text-subtitle__shipping" style="word-break: break-word;">{{ address }} {{ district }} {{ province }} {{ postcode }}</div>
              <div class="text-subtitle__shipping">{{ email }}</div>
            </div>
          </div>
          <b-button
              v-if="redeemInprogress == 0"
              class="mt-3 btn-style-original"
              block
              @click="redeemNFT()"
          >{{ $t('modals.redeem-detail.redeem') }}
          </b-button>
          <b-button
              v-if="redeemInprogress == 1"
              class="mt-3 btn-style-original"
              block
              disabled
          >{{ $t('modals.redeem-detail.inprogress') }}
          </b-button>
          <b-button
              v-if="redeemInprogress == 2"
              class="mt-3 btn-style-original"
              block
              @click="goToActivety()"
          >{{ $t('modals.redeem-detail.btn-view-detail') }}
          </b-button>
          <b-button
              v-if="redeemInprogress == 3"
              class="mt-3 btn-style-original"
              block
              @click="redeemaAgain()"
          >{{ $t('modals.redeem-detail.btn-close-try') }}
          </b-button>
        </div>
      </div>
    </b-modal>

    <!-- redeem Success Physical -->
    <b-modal
        v-model="isShowSuccessPhysicalModal"
        id="modal-success-physical"
        size="sm"
        :title='$t("modals.redeem-success.modal-title")'
        hide-footer
        centered
    >
      <div class="d-block">
        <span class="text-title__redeem_physical_success" v-if="redeemCollector > 0">
          <b>{{$t('modals.redeem-success.title')}}</b>
        </span>
        <p v-if="redeemCollector > 0">{{ $t('modals.redeem-success.detail-title')}}</p>
        <p class="subtitle-medium" style="color: #888E97; opacity: 0.9;">{{ $t('modals.redeem-success.order-no', {order: order_no}) }}</p>
        <div class="row mt-4">
          <div class="col-12" style="color: #f0b90b; line-height: 30px;" v-if="redeemCollector > 0">
            {{ $t('modals.redeem-success.collector')}}
            <span
              class="iconify"
              data-icon="bi:gift"
              style="color: #f0b90b"
              data-width="15"
              data-height="15"
            ></span>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <p class="title-medium" style="color: #888E97; margin-bottom: unset;">{{ $t("modals.redeem-detail.type") }}</p>
          </div>
          <div class="col-6 text-right">
            <p class="title-medium" style="color: #4A525F; margin-bottom: unset;">
              {{ $t("modals.redeem-detail.amount", {amount: this.redeemStandard}) }}
            </p>
          </div>
        </div>
      </div>
      <hr/>
      <b-button
          class="mt-3 btn-style-original"
          style="border: none;"
          block
          @click="goToActivety()"
      >{{ $t('modals.redeem-success.view-detail') }}
      </b-button
      >
    </b-modal>

    <!-- redeem Fail Physical -->
    <b-modal
        v-model="isShowFailPhysicalModal"
        id="modal-fail-physical"
        size="md"
        :title="$t('modals.redeem-fail.title')"
        hide-footer
        centered
    >
      <div class="d-block">
        <div class="d-block text-center">
        <span class="iconify" data-icon="uit:exclamation-circle" style="color: #D73D24;" data-width="96"
              data-height="96"></span>
          <p class="mt-4 title-medium" text-center>{{ $t('modals.redeem-fail.confirm-shipping-fail') }}</p>
        </div>
      </div>
      <hr/>
      <b-button class="mt-3 btn-style-original" block v-b-modal.modal-checkout @click="redeemaAgain()">
        {{ $t('modals.redeem-fail.redeem-again') }}
      </b-button>
    </b-modal>

    <!-- start Process Claim -->
    <b-modal
        id="modal-checkout-inprogress"
        v-model="claimInprogress"
        size="md"
        :title="$t('modals.claim-nft.title-modal')"
        hide-footer
        ok-only
        no-stacking
        hide-header-close
        no-close-on-esc
        centered
    >
      <div class="d-block text-center">
        <div class="loader"></div>
        <p class="mt-4 title-medium" text-center>
          {{ $t('modals.claim-nft.title') }}
        </p>
      </div>
      <hr/>
      <div class="btn-wrapper-checkout">
        <b-button class="mt-3" block disabled v-b-modal.modal-checkout-success> {{ $t('modals.claim-nft.btn') }}</b-button>
      </div>
    </b-modal>

    <!-- Claim Success A -->
    <b-modal
        id="modal-success-claim"
        v-model="isOpenClaimSuccessCanRedeem"
        size="md"
        title="Claim Success"
        hide-footer
        centered
    >
      <div class="d-block text-center text-content">
        <p text-center class="title-medium">{{ $t("modals.profile-claim.title") }}</p>
      </div>
      <hr/>
      <b-button class="btn-style-original" block @click="goToRedeemTab">
        {{ $t("modals.profile-claim.btn") }}
      </b-button>
    </b-modal>

    <!-- claim Success B -->
    <b-modal
        v-model="isShowClaimSuccessModal"
        id="modal-success-claim-2"
        size="md"
        title="Claim Success"
        hide-footer
        centered
    >
      <div class="d-block text-center">
        <p class="title-medium">{{ $t("modals.claim-success.title") }}</p>
        <p class="claim-success__time-redeem">
          <countdown :time="getTimeEnd(redeemableDate)">
            <template slot-scope="props">{{ props.days }}D {{ props.hours }}H : {{ props.minutes }}M : {{
                props.seconds
              }}S
            </template>
          </countdown>
        </p>
      </div>
      <hr/>
      <b-button class="mt-3 btn-style-original" block @click="goToRedeemTab">
        {{ $t("modals.claim-success.btn") }}
      </b-button>
    </b-modal>

    <!-- claim Fail -->
    <b-modal
        v-model="isShowClaimFailModal"
        id="modal-success-claim-2"
        size="md"
        :title="$t('modals.claim-fail.title-modal')"
        hide-footer
        centered
    >
      <div class="d-block text-center">
        <span class="iconify" data-icon="uit:exclamation-circle" style="color: #D73D24;" data-width="96" data-height="96"></span>
        <p class="title-medium">{{ $t("modals.claim-fail.title") }}</p>
      </div>
      <hr/>
        <b-button class="mt-3 btn-style-original" block @click="claimAgain()">
          {{ $t("modals.claim-fail.btn") }}
        </b-button>
    </b-modal>

    <!-- platform -->
    <b-modal v-model="isShowCheckPlatformModal" id="modal-select-platform-redeem" size="sm" itle="Redeem" hide-footer ok-only centered>
      <div class="d-block text-center">
        <span class="iconify" data-icon="uit:exclamation-circle" style="color: #ff7f3f;" data-width="96"
              data-height="96"></span>
        <p class="mt-4" text-center>{{ $t('modal-checkout.select-platform') }}</p>
      </div>
    </b-modal>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import store from "@/store";
import {vuexTypes} from "@/store/modules/types";
import ServiceModals from "@/data/ServiceModals.json";
import moment from "moment";
import { getAllPostcode, getAllDistrict, getAllProvince, getDistrictByProvince, getPostcodeByDistrict, convertPlatform, getConvertOrderId } from "@/common/core"
import ServiceGameDetail from "@/data/ServiceGameDetail.json";

export default {
  name: "datatable-selection",
  components: {},
  props: {
    btn: {type: String, required: true},
    digital_content: {type: String, required: true},
    type: {type: String, required: false},
    claim: {type: Boolean, required: true},
    dataList: {required: true},
    is_redeem: {type: Boolean, required: true},
  },
  data: () => {
    return {
      selected: [],
      totalData: 0,
      order_no: 0,
      isOpenModal: false,
      isOpenClaimModal: false,
      isOpenRedeemModal: false,
      isConfirmShippingModal: false,
      isShowSuccessPhysicalModal: false,
      isShowFailPhysicalModal: false,
      isShowClaimSuccessModal: false,
      isOpenClaimSuccessCanRedeem: false,
      isShowClaimFailModal: false,
      isShowCheckPlatformModal:false,
      claimInprogress: false,
      redeemInprogress: 0,
      indexSelectedRedeem: -1,
      show: true,
      tooltipCollectorEdition: "Free upgrade to Collector's Edition to the lucky winner. Choose your preferred platform to receive if you are the winner.",
      isShowModal: true,
      fullName: "",
      phoneNumber: "",
      province: null,
      district: null,
      postcode: null,
      address: "",
      email: "",
      emailBlured: false,
      checked: false,
      isOpenNextModal: false,
      claimableData: 1646900255,
      redeemableDate: 1646900255,
      postcodeList: '',
      districtList: '',
      provinceList: getAllProvince(),
      amount: ServiceModals.modals_redeem_detail.amount,
      typeRedeem: ServiceModals.modals_redeem_detail.type,
      percent_vat: ServiceModals.modals_confirm_shipping.percent_vat,
      vat: 0,
      fee: ServiceModals.modals_confirm_shipping.fee,
      total: 0,
      typeProduct: ServiceModals.modals_confirm_shipping.type,
      valid: true,
      isClaim: false,
      amountRedeemSuccess : 1,
      pageType: 1,
      currency: ServiceGameDetail.card_presale.currency,
      redeemCollector: 0,
      redeemStandard: 0,
      maxCharacterAddress: 100
    };
  },
  created: async function () {
    this.isClaim = this.claim;
    this.pageType = this.isClaim ? 2 : 3
  },
  computed: {
    ...mapGetters({
        responseRedeemOrder: vuexTypes.responseRedeemOrder,
        responseMintOrder: vuexTypes.responseMintOrder,
        userAddress: vuexTypes.userAddress,
        approveStatus: vuexTypes.approveStatus,
        burnStatus: vuexTypes.burnStatus,
    }
    ),
    selectAll: {
      get: function () {
        return this.dataList.list ? this.selected.length === this.dataList.list.length : false;
      },
      set: function (value) {
        let selected = [];
        if (value) {
          if(this.isClaim){
            this.dataList.list.forEach(function (item) {
              if(item.is_claim){
                selected.push(item.id);
              }
            });
          } else {
            this.dataList.list.forEach(function (item) {
              if(!item.is_claim){
                selected.push(item.id);
              }
            });
          }
        }
        this.selected = selected;
      },
    },
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
  beforeUpdate(){
    this.districtList = getAllDistrict(this.province)
    this.postcodeList = getAllPostcode(this.district)
  },
  methods: {
    ...mapActions({
      ncmRedeem: vuexTypes.NCM_API_REDEEM_MY_NFT,
      ncmClaim: vuexTypes.NCM_API_MINT_MY_PRE_ORDER
    }),
    onSubmit(event) {
      event.preventDefault();
    },
    editAddress() {
        this.openModal('Redeem')
    },
    getPlatform(value){
      return convertPlatform(value)
    },
    openModal(value) {
      if (this.selected.length === 0) {
        // TODO Alert Please Select
        return
      }
      if (value === "Redeem") {
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
        this.redeemInprogress = 0;
        store.commit(vuexTypes.SET_APPROVE_STATUS, 0);
        store.commit(vuexTypes.SET_BURN_STATUS, 0);
        this.isOpenClaimModal = false;
        this.isOpenRedeemModal = true;
      } else {
        this.isOpenRedeemModal = false;
        this.claimOrder();
      }
    },
    getOrderId(orderId) {
       return  getConvertOrderId(orderId)
    },
    async confirmShippingModal() {
      this.validate();
      if (this.valid && this.email.length > 0) {
        this.isOpenRedeemModal = false;
        this.isConfirmShippingModal = true;
        let price = 0;
        for (let index in this.selected) {
          let selectIndex = this.selected[index];
          let selectIndexData = selectIndex -1;
          price += this.dataList.list[selectIndexData].price;
        }
        this.vat = (price * this.percent_vat) / 100;
        this.total = this.vat + this.fee

      } else {
        this.isOpenRedeemModal = true;
      }
    },
    async redeemNFT() {
      this.redeemInprogress = 1;
      this.redeemCollector = 0
      this.redeemStandard = 0
      let shiping = this.total
      for (let index in this.selected) {
        if (index > 0) {
          shiping = false;
        }
        let selectIndex = this.selected[index];
        let selectIndexData = selectIndex -1;
        await this.ncmRedeem({
          'tokenId': this.dataList.list[selectIndexData].token_id,
          'fullName': this.fullName,
          'phoneNumber': this.phoneNumber,
          'email': this.email,
          'address': this.address,
          'province': this.province,
          'district': this.district,
          'postcode': this.postcode,
          'platform': 'ps4',
          'saveAddress': this.checked,
          'shipping': shiping,
          'product_price_id': this.dataList.list[selectIndexData].product_price_id,
          'total_price': this.total,
          'currency': this.currency
        });

        // if(this.responseRedeemOrder.success){
        //   let redeemDetail = JSON.parse(JSON.stringify(this.responseRedeemOrder.data.redeem));
        //   if(redeemDetail.lucky_draw){
        //     this.redeemCollector = this.redeemCollector + 1
        //   } else {
        //     this.redeemStandard = this.redeemStandard + 1
        //   }
        // }
      }

      if (this.responseRedeemOrder.success) {
        this.redeemInprogress = 2;
        this.amountRedeemSuccess = this.selected.length
      } else {
          this.redeemInprogress = 3;
      }

      this.$root.$emit('change-page', 1, 1);
      this.$root.$emit('change-page-history', 1, 1, 0);
    },
    async claimOrder() {
      this.claimInprogress = true;

      for (let index in this.selected) {
        let orderList = []
        let selectIndex = this.selected[index];
        let selectIndexData = selectIndex -1;
        orderList.push(this.dataList.list[selectIndexData].order_id);
        await this.ncmClaim({'orderList': orderList});
      }

      this.isOpenClaimModal = false;
      this.claimInprogress = false;

      if (this.responseMintOrder.success) {
        this.selected = [];
        this.isOpenClaimSuccessCanRedeem = true;
      } else {
        this.isShowClaimFailModal = true;
      }

      this.$root.$emit('change-page', 1, 1);
    },

    validate: function () {
      this.emailBlured = true;
      if ((!this.validEmail(this.email) && this.email > 0)) {
        this.valid = false;
        return
      }
      if (!this.validName(this.fullName)) {
        this.valid = false;
        return
      }
      if (!this.validPhone(this.phoneNumber)) {
        this.valid = false;
        return
      }
      if (!this.validAddress(this.address)) {
        this.valid = false;
        return
      }
      if (!this.province > 0) {
        this.valid = false;
        return
      }
      if (!this.district > 0) {
        this.valid = false;
        return
      }
      if (!this.postcode > 0) {
        this.valid = false;
        return
      }
      if (!this.address.length > 0) {
        this.valid = false;
        return
      }

      this.valid = true;
    },
    validName: function (name) {
      let re = /^[a-zA-Zก-๎ ]+$/
      return re.test(name);
    },
    validPhone: function (phone) {
      let re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})([0-9]{4})$/
      return re.test(phone);
    },
    validEmail: function (email) {
     let re = /^(?=[^@]*[A-Za-z])([a-zA-Z0-9])(([a-zA-Z0-9])*([._-])?([a-zA-Z0-9]))+@(([a-zA-Z0-9]))+([.])+([a-zA-Z]{2,4})+$/;
      return re.test(email.toLowerCase());
    },
    validAddress: function (address) {
      let re = /^[a-zA-Zก-๎0-9 .,'/-]+$/
      return re.test(address);
    },
    getImgUrl(name) {
      return name
    },
    getImgUrlByIndex() {
      if (this.selected.length > 0) {
        return this.dataList.list[0].image
      }
      return ''
    },
    totalDataTable() {
      return this.selected.length;
    },
    getStyleFont(value) {
      return value !== null ? "color: #E3E3E3;" : "color: #87898E;";
    },
    getValueFormSelect(value) {
      return value !== null ? value : "";
    },
    changeFormatTime(time) {
      return moment.unix(time).format("DD/MM/YY");
    },
    getTimeEnd(time) {
      const fromTime = moment();
      const toTime = moment.unix(time);
      if(fromTime < toTime){
        const ms = toTime.diff(fromTime);
        const d = moment.duration(ms);
        return d.asMilliseconds();
      }
      return 0;
    },
    goToRedeemTab() {
      this.isShowClaimSuccessModal = false;
      this.isOpenClaimSuccessCanRedeem = false;
      this.$root.$emit("on-click-tab-my-profile", 1);
    },
    resetModalRedeemDetail() {
      this.fullName = ""
      this.phoneNumber = ""
      this.province = null
      this.district = null
      this.postcode = null
      this.address = ""
      this.email = ""
    },
    redeemaAgain(){
      this.isConfirmShippingModal = false;
      this.resetModalRedeemDetail();
    },
    claimAgain(){
      this.isShowClaimFailModal = false;
    },
    goToActivety(){
      this.isConfirmShippingModal = false;
      this.selected = [];
      this.$root.$emit("on-click-tab-my-profile-tab", 1);
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
    selectProvince(){
      this.districtList = getDistrictByProvince(this.province);
      this.district = null
      this.postcode = null
    },
    selectDistrict(){
      if(this.district == null){return}
      this.postcodeList = getPostcodeByDistrict(this.district);
      this.postcode = null
    },
    prevPage() {
      if(this.dataList.current_page ==  1) return;
      this.$root.$emit('change-page', this.pageType, this.dataList.current_page - 1);
    },
    nextPage() {
      if(this.dataList.current_page ==  this.dataList.total_page) return;
      this.$root.$emit('change-page', this.pageType, this.dataList.current_page + 1);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/scss/_variables.scss";

.claim-success__time-redeem {
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  /* identical to box height, or 133% */
  text-align: center;
  /* Yellowe */
  color: $app-theme-color;
  opacity: 0.9;
}
.invalid-input {
  color: #D73D24;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  padding-left: 5px;
}

.bg-input,
.bg-select {
  background: #F0F1F3 !important;
  border: 2px solid #C8D3D7 !important;
  box-sizing: border-box;
  border-radius: 12px;
  color: $app-font-color !important;
  margin-bottom: 0;
}

svg.iconify.iconify--akar-icons.icon_information.align-text-top {
  margin: 0.2rem !important;
}

.row.redeemable-row {
  background: $light-1;
  border-radius: 16px;
  margin-top: 2rem;
  padding: 0.75rem;
  width: 100%;
}

.title-summary-confirm {
  font-weight: 700;
  margin-bottom: 6px;
}

span.text-detail {
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: $dark-1;
}

.text-detail {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.15rem;
}

svg.iconify.iconify--akar-icons.icon_information.align-text-top {
  margin-top: 0.5rem;
  margin-right: 0.5rem;
}

span.text-checkbox {
  font-weight: 600;
  font-size: 16px;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: $dark-1;
  margin-left: 0.5rem;
}

.custom-checkbox .custom-control-input:checked ~ .custom-control-label::after {
  background-color: $yellow;
  border-radius: 3px !important;
}

.custom-control {
  margin-left: 0.5rem;
  margin-top: 1.3rem;
}

span.detail-title {
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -0.015em;
  color: $dark-1;
}

.text-detail {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.15rem;
}

svg.iconify.iconify--akar-icons.icon_information.align-text-top {
  margin-top: 0.5rem;
  margin-right: 0.5rem;
}

img.img-table {
    background-color: #FAFAFA;
    max-width: 64px;
    -o-object-fit: scale-down;
    object-fit: scale-down;
    box-shadow: 0px 2px 12px 2px rgb(0 0 0 / 5%);
    padding: 20px 5px;
    border-radius: 10%;
}

.datatables-row {
  border-bottom: 1px solid $light-2;
  padding: 10px 5px 5px;
}

.datatables-no-border {
  border-bottom: none !important;
}

.col-auto {
  background-color: #2b2b3e !important;
}

.datatables-list {
  color: #ffffff;
  border-radius: 16px;
  padding: 0 15px;
  margin-top: 20px;
  background-color: $light-1 !important;
}

.col-md-12.datatables-row {
  margin-top: 3rem;
}

input.custom-checkbox {
  margin: 1rem 1rem 1rem 1rem;
}

.span-selection-header {
  display: flex;
  justify-content: center;
}

span.special-content-title {
  font-weight: 500;
  font-size: 16px;
  line-height: 30px;
  letter-spacing: -0.015em;
  color: #e3e3e3;
}

p.special-content-detail {
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.015em;
  color: #9f9f9f;
}

.mt-3.pagination-container {
  display: flex;
  justify-content: center;
}

.icon-arrow {
  padding: 0rem 1rem 0rem 1rem;
}

.col-md-1.checkbox-table-list {
  margin-top: 1rem;
}

.col-1.checkbox-table-list {
  max-width: 4%;
}

.btn:focus {
  box-shadow: none !important;
}

/**  END DataTable  **/

/** Start ModalRedeemDetail **/
div#modal-redeem-detail___BV_modal_content_ {
  // min-width: 894px !important;
  // min-height: 616px !important;

  @media (max-width: $tablet) {
    width: 100%;
  }
}

@media (min-width: 768px) {
  div#modal-redeem-detail___BV_modal_content_ {
    min-width: 894px !important;
    min-height: 616px !important;
  }
}

select.custom-select {
  display: inline-block !important;
  width: 100% !important;
  height: calc(1.5em + 0.75rem + 2px) !important;
  padding: 0.375rem 1.75rem 0.375rem 0.75rem !important;
  font-size: 1rem !important;
  font-weight: 400 !important;
  line-height: 1.5 !important;
  color: #E3E3E3 !important;
  vertical-align: middle !important;
  background: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 4 5'><path fill='%2387898E' d='M2 0L0 2h4zm0 5L0 3h4z'/></svg>") right 0.75rem center/8px 10px no-repeat !important;
  border: 2px solid #484c56 !important;
  box-sizing: border-box;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  appearance: none !important;
}

.bg-input-dark {
  border: 2px solid #484c56 !important;
  box-sizing: border-box;
  border-radius: 12px;
  color: #E3E3E3 !important;
  caret-color: #87898E !important;
}

div.input-bg-dark input.form-control {
  background: #23262F !important;
}

div.input-bg-dark input.form-control::placeholder {
  color: #87898E !important;
}

.custom-switch .custom-control-input:checked ~ .custom-control-label::after {
  background-color: #23262F !important;
  transform: translateX(0.75rem);
}

.custom-radio .custom-control-input:checked ~ .custom-control-label::after {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%232B2B3E'/%3e%3c/svg%3e") !important;
  //background: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3e%3cpath fill='white' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e") no-repeat right .75rem center/8px 10px !important;
}

.img-game-redeem {
  min-width: 241px;
  // height: 70.31px;

  @media (min-width: 576px) {
    min-width: 150px;
  }
}

h5#modal-redeem-detail___BV_modal_title_ {
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
  letter-spacing: -0.015em;
}

p.text-title-redeem {
  font-weight: 600;
  font-size: 16px;
  line-height: 30px;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: #e3e3e3;
}

span.text-redeem-detail {
  font-weight: 500;
  font-size: 12px;
  line-height: 30px;
  letter-spacing: 0.175em;
  text-transform: uppercase;
  color: #e3e3e3;
}

p.text-card-redeem {
  font-weight: 600;
  font-size: 16px;
  line-height: 30px;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: #e3e3e3;
  /* margin-top: 0rem; */
}

.detail-info {
  border-radius: 12px;
  margin-top: 1rem;
  display: flex;

}

#collector-info {
  width: 21px !important;
  height: 21px !important;
}

svg.iconify.iconify--akar-icons.icon_information.align-text-top.redeem_i {
  margin-top: 0px !important;
}

/** END ModalRedeemDetail **/

/** START ModalRedeemComfirmShipping **/
div#modal-confirm-shipping___BV_modal_content_ {
  font-family: Montserrat;
  font-style: normal;
}

#modal-confirm-shipping___BV_modal_header_ button.close {
  opacity: 1 !important;
}

.col-md-6.text-right.text-detail-redeem__physical {
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.175em;
  text-transform: uppercase;
  color: #E3E3E3;
}

.icon-banner {
  display: flex;
  color: #FAFAFA;
  background: #888E97;
  opacity: 0.64;
  border: 1px solid #C8D3D7;
  box-sizing: border-box;
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  border-radius: 50%;
  float: right;
  min-width: 30px;
  min-height: 30px;
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
}

/** END ModalRedeemComfirmShipping **/

/** START ModalRedeemSuccessPhysiclaConfirm **/
div#modal-success-physical___BV_modal_content_ {
  max-width: 400px;
  min-height: 276px;
  font-family: Montserrat;
  font-style: normal;
  line-height: 36px;

  @media (max-width: $tablet) {
    width: 100%;
  }
}

@media (min-width: $tablet) {
  div.modal-dialog.modal-md.modal-dialog-centered {
    max-width: 400px !important;
    margin: 1.75rem auto;
  }
}

#modal-success-physical___BV_modal_header_ button.close {
  opacity: 1 !important;
}

/** END ModalRedeemSuccessPhysiclaConfirm **/

/**  Start ModalProfileClaim  **/
div#modal-success-claim___BV_modal_content_ {
  font-family: Montserrat;
  font-style: normal;
  min-width: 400px;
  min-height: 238px;
}

@media (min-width: 576px) {
  .modal-sm {
    max-width: 400px !important;
  }
}

@media only screen and (max-width: 576px) {
  div#modal-success-claim .modal-dialog.modal-sm {
    max-width: 400px !important;
  }
}

h5#modal-success-claim___BV_modal_title_ {
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  letter-spacing: -0.015em;
}

div.btn-wrapper {
  display: grid;
  align-items: center;
  justify-content: center;
}

#modal-success-claim___BV_modal_header_.modal-header {
  position: relative;
  top: 6px;
}

#modal-success-claim___BV_modal_header_.modal-header .close {
  padding-top: 1.35rem !important;
  padding-right: 1.4em !important;
}

#modal-success-claim___BV_modal_body_.modal-body {
  position: relative;
  top: 6px;
}

#modal-success-claim___BV_modal_header_ button.close {
  opacity: 1 !important;
}

/**  END ModalProfileClaim  **/

/** Clam Inprogress **/
h5#modal-checkout-inprogress___BV_modal_title_ {
  font-size: 24px;
  font-style: normal;
  font-weight: bold;
}

.btn-preorder-inprogress {
  font-family: Montserrat !important;
  background-color: #525252 !important;
  border-radius: 6px !important;
  color: #9F9F9F !important;
  background-repeat: no-repeat;
  border: none !important;
  font-weight: bold !important;
  font-size: 18px !important;
  line-height: 36px !important;
  align-items: center;
  text-align: center !important;
  letter-spacing: -0.015em;
  max-width: 352px;
  min-height: 52px;

}

div#modal-checkout-inprogress___BV_modal_content_.modal-content {
  font-family: Montserrat;
  font-style: normal;
  max-width: 400px;
  padding-left: 10px;
  padding-right: 10px;

  @media (max-width: $tablet) {
    width: 100%;
  }
}

/****/
@media (max-width: 768px) { // Mobile

  .col-1.checkbox-table-list {
    max-width: 8%;
  }

  .detail-order {
    font-size: 12px;
  }

  span.title-medium {
    font-size: 14px;
  }

  .datatable-row-desktop {
    display: none !important;
  }

  .datatable-row-mobile {
    display: block !important;
  }

  .col-3.datatable-row-mobile {
    flex: 0 0 18%;
    max-width: 18%;
  }

  .offset-4.datatable-row-mobile {
    margin-left: 26% !important;
  }

  .datatable-row-mobile > div > .img-table {
      max-width: 10vw !important;
  }

  .col-4.offset-4.datatable-row-mobile {
    padding-right: 0 !important;
    flex: 0 0 44%;
    max-width: 44%;
  }

  .col-4.special-content.datatable-row-mobile.content-custom {
    padding-left: 0 !important;
    max-width: 30%
  }
}

@media (max-width: 530px) {

  span.title-medium {
    font-size: 3vw;
  }

  .datatable-row-mobile > div > .img-table {
    max-width: 12vw !important;
    top: 6px;
    position: relative;
    padding: 19px 5px;
  }
}

@media (max-width: 340px) {
  .offset-4.datatable-row-mobile {
    margin-left: 12% !important;
  }
}

@media (max-width: 320px) {

  span.title-medium {
    font-size: 3.5vw !important;
  }

  .datatable-row-mobile > div > .img-table {
    max-width: 14vw !important;
    padding: 19px 5px;
    position: relative;
    top: 8px;
  }

  .col-8.datatable-row-mobile {
    flex: 0 0 63%;
    max-width: 63%;
  }

  .col-4.datatable-row-mobile {
    flex: 0 0 44% !important;
    max-width: 44% !important;
  }

  .col-3.datatable-row-mobile {
    flex: 0 0 24%;
    max-width: 24%;
  }

  .col-4.special-content.datatable-row-mobile.content-custom {
    max-width: 35%;
  }
}

@media (min-width: 768px) { // Desktop
  .datatable-row-desktop {
    display: block !important;
  }
  .datatable-row-mobile {
    display: none !important;
  }
}

@media (max-width: 576px) { // Mobile
  .text-detail {
    justify-content: flex-start;
  }
  .datatable-for-desktop {
    display: none !important;
  }
  .datatable-for-mobile {
    display: block !important;
  }
}

@media (max-width: 1199px) {
  .image-table-list{
    // min-width: 212px !important;
  }
  .img-table {
    max-width: 4.5vw !important;
  }
}

@media (max-width: 991px) {
  .claim.col-md-12,
  .redeem.col-md-12 {
    flex: 0 0 45%;
    max-width: 45%;
  }

  .img-table {
    max-width: 64px !important;
  }
}

@media (min-width: 576px) { // Desktop

  .datatable-for-mobile {
    display: none !important;
  }
}

div.modal-body>hr{
  margin: 1rem 0 !important;
}

.disable_prev_page {
  cursor: default !important;
}

.disable_next_page {
  cursor: default !important;
}

.bg-redeem-summary {
  /* White */
  background: #FAFAFA;
  /* Light1 */
  border: 1px solid #F0F1F3;
  border-radius: 12px;
  padding: 14px;
}

.bg-img {
  /* Light1 */
  background: #F0F1F3;
  border-radius: 6px;
  min-height: 160px;
  min-width: auto;

  @media (min-width: 576px) {
    min-height: 135px;
  }
}

p.subtitle-medium {
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  /* identical to box height, or 114% */
  /* Light Grey 2 */
  color: #9F9F9F;
}

p.text-title__shipping,
div.text-title__shipping {
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  /* or 133% */
  /* Dark2 */
  color: #888E97;
}

div.text-subtitle__shipping {
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  /* or 133% */
  /* Light Grey 2 */
  color: #9F9F9F;
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

p.input-field-block .v-reset-input {
  line-height: 18px;
}

.was-validated .form-control:invalid:focus,
.form-control.is-invalid:focus {
  border: 2px solid #D73D24;
  box-shadow: 0 0 0 1.5px #D73D24 !important;
}


.bg-block-border {
  background-color: $app-background-color;
  border-radius: 6px;
  padding: 12px;
  margin: auto !important;
}

.bg-block-yellow {
  background-color: $app-background-color;
  border: 1px solid $app-theme-color;
  border-radius: 6px;
  padding: 12px;
  margin: auto !important;
}

.bg-block-yellow.bottom {
  min-height: 62.18px;
}

.bg-block-light {
  background-color: $app-background-color;
  border: 1px solid $app-theme-color-light;
  border-radius: 6px;
  padding: 12px;
  margin: auto !important;
}

.text-color-black {
  color: $dark-1 !important;
}

.text-color-yellow {
  color: $yellow !important;
}

.text-color-green {
  color: $green !important;
}

.text-color-red {
  color: $red !important;
}

.text-weight {
  font-weight: 700;
}

span.title-detail-redeem {
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 5px;
  margin-left: -10px;
}

.bg-block-light {
  background-color: $app-background-color;
  border: 1px solid $app-theme-color-light;
  border-radius: 6px;
  padding: 12px;
  margin: auto !important;
}

span.title-detail-text {
  font-size: 14px;
  line-height: 16px;
  color: $dark-2;
}

.bg-block-border {
  background-color: $app-background-color;
  border-radius: 6px;
  padding: 12px;
  margin: auto !important;
}

span.title-detail-game {
  font-size: 16px;
  line-height: 24px;
}

.text-total {
  font-size: 18px !important;
}

</style>
