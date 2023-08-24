<template>
  <div class="card-presale">
    <div class="card-body">
      <span class="card-presale-title__title">{{ mainTitle }}</span>
      <p class="card-presale-title__sub-title">{{ subTitle }}</p>
      <div class="row mt-2">
        <div class="col-md-4" v-if="discount > 0">
          <b-badge class="tag_purple_left">{{ $t('card-presale.discount-lbl', {discount: discount}) }}</b-badge>
        </div>
        <div class="col-md-8 text-right">
          <p class="date-times" :hidden="statusBtn === 1">{{ $t('card-presale.open-pre-date-lbl', {openData: getTimeOpen(closeData)}) }}</p>
          </div>
      </div>
      <div class="row mt-2">
        <div class="col-md-6">
          <span
              class="card-presale-content__hilight-txt card-presale-content__font-purple"
          >{{ $t('card-presale.price-lbl') }}
          </span>
          <span class="card-presale-content__font-purple">{{ $t('card-presale.prp-lbl') }}&nbsp;</span>
          <span class="card-presale-content__font-purple" v-if="discount > 0"><del>{{ price }}&nbsp;{{ currency }}</del></span>
        </div>
        <div class="col-md-6 text-right d-flex align-items-center justify-content-end">
          <span
              class="card-presale-content__hilight-txt card-presale-content__font-purple"
          >{{ salePrice }} {{ currency }}
          </span>
          <img :src="getImgUrl(currency)" style="margin-left : 5px; vertical-align:middle; min-width: 40px; min-height: 49px;"/>

        </div>
      </div>
      <hr/>
      <div class="row mt-2" :hidden="statusBtn === 1">
        <div class="col-6"><p class="text-detail-left">{{ $t('card-presale.closes-lbl') }}</p></div>
        <div v-if="!isOpenPreOrder(closeData)" class="col-6 close-in-duration">
          <countdown :time="getTimeEnd(closeData)">
            <template slot-scope="props">{{ props.days }}D {{ props.hours }}H : {{ props.minutes }}M : {{
                props.seconds
              }}S
            </template>
          </countdown>
        </div>
        <div v-else class="col-6 close-in-duration">
          <p class="text-detail-left font-weight-bold">0d 00 : 00 : 00</p>
        </div>

      </div>
      <div class="row mt-2">
        <div class="col-6"><p class="text-detail-left">{{ $t('card-presale.total-lbl') }}</p></div>
        <div class="col-6 text-right">
               <p class="text-detail-left">
              {{
                     $t('card-presale.current-total-unit-lbl', {
                     current: currentUnit,
                     total: totalUnit
                     })
              }}
               </p>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-md-12">
          <div class="progress">
            <div
                class="progress-bar card-presale-content__progress-bar"
                role="progressbar"
                :style="getStyleProgress()"
                :aria-valuenow="getProgress()"
                aria-valuemin="0"
                aria-valuemax="100"
            ></div>
          </div>
          <div class="row">
              <div class="col-lg-12 col-md-12 col-sm-12">
                <p class="text-dropdown">{{ $t('card-presale.quantity-lbl')}}</p>
                <b-input-group>
                  <b-input-group-prepend>
                    <b-btn class="spin-button__style spin__style-left" @click="decrement()" style="border-radius: 12px 0px 0px 12px;">
                      <span class="iconify" data-icon="akar-icons:circle-minus" style="color: #F7CA38;" data-width="20" data-height="20"></span>
                    </b-btn>
                  </b-input-group-prepend>
                <b-form-input class="spin-button__quantity" :value="inputQuantity"></b-form-input>
                <b-input-group-append>
                  <b-btn class="spin-button__style spin__style-right" @click="increment()" style="border-radius: 0px 12px 12px 0px;">
                    <span class="iconify" data-icon="ant-design:plus-circle-outlined" style="color: #F7CA38;" data-width="20" data-height="20"></span>
                  </b-btn>
                </b-input-group-append>
              </b-input-group>

            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="row mt-4">
            <div class="col-md-12">
              <Vcode
                  :sliderSize="45"
                  :canvasWidth="298"
                  :canvasHeight="184"
                  :show="isShowCheckOutModal"
                  :successText="success"
                  :failText="fail"
                  :sliderText="text"
                  :titleText="'Security Verification'"
                  @success="onSuccess"
                  @close="onClose"
              />
              <button
                  type="button"
                  class="col-md-12 btn btn-preorder text-color btn-card-presale__full-width"
                  @click="buyOrderNow()"
              >
                {{ statusBtn === 1 ? $t('card-presale.btn-buy-lbl') : $t('card-presale.btn-pre-lbl') }}
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="row mt-2">
            <div class="col-md-12">
              <button
                  type="button"
                  class="col-md-12 btn btn-outline-secondary btn-border text-color game-details btn-card-presale__full-width"
                  data-mdb-ripple-color="dark"
                  @click="addWishList(productId,productPriceId)"
              >
                  <i class="fas fa-heart" v-if="isWishList(productId)" style="color: #F7CA38"></i>
                  <i class="far fa-heart" v-else ></i>
                  &nbsp;&nbsp;{{ $t('card-presale.btn-wishlist-lbl') }}
              </button>
            </div>
          </div>
      </div>
    </div>

    <!-- checkout -->
    <b-modal id="modal-checkout-presale" size="md" :title="$t('modal-checkout.checkout-title')" hide-footer ok-only no-stacking centered>
            <div class="d-block">
                <div class="row">
                  <div class="col-lg-3 col-md-3 col-sm-12" id="img-pre-game" >
                    <div class="col bg-img" :style="'background-image: url('+productImageUrl+')'">
                    </div>
                  </div>

                  <div class="col-lg-9 col-md-9 col-sm-12">
                    <div class="row">
                        <div class="col-8">
                          <span class="title-detail-game">{{ mainTitle}}</span>
                        </div>
                        <div class="col-4 text-right">
                        <span class="sale-price">{{ salePrice }} </span>
                        <img :src="currencyImageUrl" style="width: 18px; height: auto;" />
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-12 title-detail-game">
                        <p class="subtitle-detail-game">{{ subTitle }}</p>
                      </div>
                    </div>
                    <div class="row">
                      <b-input-group class="check-out-group">
                        <b-input-group-prepend>
                          <b-btn class="spin-button__style left-check-out" @click="decrement()">
                            <span class="iconify" data-icon="akar-icons:circle-minus" style="color: #F7CA38;" data-width="20" data-height="20"></span>
                          </b-btn>
                        </b-input-group-prepend>
                        <b-form-input class="spin-button__quantity check-out" :value="inputQuantity"></b-form-input>
                        <b-input-group-append>
                          <b-btn class="spin-button__style right-check-out" @click="increment()">
                            <span class="iconify" data-icon="ant-design:plus-circle-outlined" style="color: #F7CA38;" data-width="20" data-height="20"></span>
                          </b-btn>
                        </b-input-group-append>
                      </b-input-group>
                    </div>
                  </div>
                </div>
                <hr />
                <div class="row bg-block-yellow bottom">
                    <div class="col-6 modal-checkout__title-total-payment">
                      {{ $t("modals.redeem-detail.total-payment") }}
                    </div>
                    <div class="col-6 modal-checkout__total-payment">
                      {{ salePrice * inputQuantity }}
                      <img :src="currencyImageUrl" style=" width: 26.32px; height: auto;"/>
                    </div>
                </div>
                <div class="row" style="margin-top: 12px">
                  <div id="checkbox-term" class="col-1">
                      <b-form-checkbox
                          id="accept_terms"
                          class="accept-terms"
                          v-model="selected"
                          name="accept_terms"
                          value="true"
                          style="margin-top: 0px"
                      >
                      </b-form-checkbox>
                  </div>
                  <div id="checkbox-text-accept" class="col-11">
                    <span class="text-accept">{{ $t("modal-checkout.accept-terms") }}</span>
                  </div>
                </div>
            </div>
            <div class="btn-wrapper-checkout">
                <b-button
                    @click="checkOutBuyAndMintOrder()"
                    v-bind:class="selected ? 'mt-3 btn-preorder' : 'mt-3 disabled'"
                    block
                    >{{ $t("modal-checkout.checkout-btn") }}</b-button
                >
            </div>
        </b-modal>

    <!-- checkout inprogress -->
    <b-modal
        id="modal-checkout-inprogress"
        size="md"
        title="Purchase"
        hide-footer
        ok-only
        centered
    >
      <div class="d-block text-center">
        <div class="loader"></div>
        <p class="mt-4 title-medium text-center">{{ $t('modal-checkout.detail-process') }}</p>
      </div>
      <hr/>
      <div class="btn-wrapper-checkout">
        <b-button class="mt-3" block disabled>{{ $t('modal-checkout.inprogress') }}</b-button>
      </div>
    </b-modal>

    <!-- checkout success -->
    <b-modal id="modal-checkout-success" size="md" :title='$t("modal-checkout.success-title")' hide-footer ok-only centered>
      <div class="d-block">
        <div class="row text-center justify-content-center">
          <div class="col-10 bg-img success-img">
            <img src="~@/assets/game_detail/image 91.svg" style="width: 100%; "/>
          </div>
          <p class="title-medium mt-3">{{ $t('modal-checkout.purchase-success') }}</p>
        </div>
        <div class="row justify-content-center">
          <div class="col-10 bg-drop-shadow1">
            <div class="row justify-content-md-center" style="padding: 1rem;">
              <div class="col-6">
                <p class="checkout__title-detail">{{ $t('modal-checkout.status') }}</p>
                <p class="checkout__text-status" style="margin-bottom: 0;">{{ status }}</p>
              </div>
              <div class="col-6">
                <p class="checkout__title-detail">{{ $t('modal-checkout.transaction-hash') }}</p>
                <p class="checkout__text-order-id" style="margin-bottom: 0;">{{ hash }}</p>
              </div>
            </div>
          </div>
        </div>
        <hr/>

        <div class="row text-center justify-content-center">
          <p class="checkout__social-txt">{{ $t('modal-checkout.share') }}</p>
          <button type="nav-link" class="btn-top-icon mx-2">
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
    </b-modal>

    <!-- checkout fail -->
    <b-modal id="modal-checkout-fail" size="md" title="Purchase Failed" hide-footer ok-only centered>
      <div class="d-block text-center">
        <span class="iconify" data-icon="uit:exclamation-circle" style="color: #D73D24;" data-width="96" data-height="96"></span>
        <p class="mt-4 text-center title-medium">{{ $t('modal-checkout.purchase-falied') }}</p>
      </div>
      <hr/>
      <b-button
          class="mt-3 btn-style-original"
          block
          @click="closeAgain()"
      >{{ $t('modal-checkout.checkout-again') }}
      </b-button>
    </b-modal>

    <!-- checkout buy and mint -->
    <b-modal id="modal-checkout-buy-mint" size="md" :title="$t('modal-checkout.checkout-title')" hide-footer ok-only no-stacking centered :hide-header-close="buyInprogress == 1">

      <div class="d-block">
        <div class="row bg-block-light">
          <span class="title-detail-checkout">{{ $t('modal-checkout.title-approve') }}</span>
          <div class="col-lg-3 col-md-3 col-sm-12" id="img-pre-game" >
            <div class="col bg-img">
              <img class="img-fluid" id="img-game-first" :src="productImageUrl" />
            </div>
          </div>

          <div class="col-lg-9 col-md-9 col-sm-12">
            <div class="row" style="margin-top: 9px;">
              <div class="col-12">
                <span class="title-detail-game">{{ mainTitle}}</span>
              </div>
            </div>

            <div class="row" style="margin-top: 9px;">
              <div class="col-8" >
                <span class="title-detail-text">{{ $t('card-presale.quantity-lbl')}}</span>
              </div>
              <div class="col-4 text-right">
                <span class="title-detail-text">x{{ inputQuantity }} </span>
              </div>
            </div>

          </div>
        </div>
        <div class="row bg-block-border bottom" style="margin: 10px 0 !important;">
          <div class="col-6">
            <span class="title-detail-text">Transaction Status</span>
          </div>
          <div class="col-6 text-right" v-show="approveStatus == 0" >
            <span class="title-detail-text"  style="float: right; margin-top: 5px; margin-left: 5px;"> - </span>
          </div>
          <div class="col-6 text-right" v-show="approveStatus == 1">
            <span class="title-detail-text text-color-yellow text-weight" style="float: right; margin-top: 5px; margin-left: 5px;">In Progress</span>
            <div class="small-loader"></div>
          </div>
          <div class="col-6 text-right"  v-show="approveStatus == 2" >
            <span class="title-detail-text text-color-green text-weight" style="float: right; margin-top: 5px; margin-left: 5px;">Success</span>
          </div>
          <div class="col-6 text-right"  v-show="approveStatus == 3" >
            <span class="title-detail-text text-color-red text-weight" style="float: right; margin-top: 5px; margin-left: 5px;">Failed</span>
          </div>
        </div>

        <div class="row bg-block-light">
          <span class="title-detail-checkout">{{ $t('modal-checkout.title-mint') }}</span>
          <div class="col-lg-3 col-md-3 col-sm-12" id="img-pre-game" >
            <div class="col bg-img">
              <img class="img-fluid" id="img-game-first" :src="productImageUrl" />
            </div>
          </div>
          <div class="col-lg-9 col-md-9 col-sm-12">
            <div class="row" style="margin-top: 9px;">
              <div class="col-7">
                <span class="title-detail-game">{{ mainTitle}}</span>
              </div>
              <div class="col-5 text-right">
                <span class="title-detail-text text-color-black"> {{ salePrice }} {{ currency }}</span>
              </div>
            </div>

            <div class="row">
              <div class="col-8" >
                <span class="title-detail-text">{{ $t('card-presale.quantity-lbl')}}</span>
              </div>
              <div class="col-4 text-right">
                <span class="title-detail-text">x{{ inputQuantity }} </span>
              </div>
              <div class="col-6">
                <span class="title-detail-text text-color-black text-weight "> {{ $t("modals.redeem-detail.total-payment") }}</span>
              </div>
              <div class="col-6 text-right">
                <span class="title-detail-text text-color-yellow text-weight "> {{ salePrice * inputQuantity }} {{ currency }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="row bg-block-border bottom" style="margin: 10px 0 !important;">
          <div class="col-6">
            <span class="title-detail-text">Mint Status</span>
          </div>
          <div class="col-6 text-right" v-show="mintStatus == 0">
            <span class="title-detail-text"  style="float: right; margin-top: 5px; margin-left: 5px;"> - </span>
          </div>
          <div class="col-6 text-right" v-show="mintStatus == 1">
            <span class="title-detail-text text-color-yellow text-weight"  style="float: right; margin-top: 5px; margin-left: 5px;">In Progress</span>
            <div class="small-loader"></div>
          </div>
          <div class="col-6 text-right" v-show="mintStatus == 2" >
            <span class="title-detail-text text-color-green text-weight" style="float: right; margin-top: 5px; margin-left: 5px;">Success</span>
          </div>
          <div class="col-6 text-right" v-show="mintStatus == 3" >
            <span class="title-detail-text text-color-red text-weight" style="float: right; margin-top: 5px; margin-left: 5px;">Failed</span>
          </div>
        </div>

        <div class="row" style="margin-top: 12px">
          <div id="checkbox-term" class="col-1">
            <b-form-checkbox
                id="accept_terms"
                class="accept-terms"
                v-model="selected"
                name="accept_terms"
                value="true"
                style="margin-top: 0px"
                :disabled="!buyInprogress == 0"
            >
            </b-form-checkbox>
          </div>
          <div id="checkbox-text-accept" class="col-11">
            <span class="text-accept">{{ $t("modal-checkout.accept-terms") }}</span>
          </div>
        </div>
      </div>
      <div class="btn-wrapper-checkout">
        <b-button
            v-if="buyInprogress == 0"
            class="mt-3 btn-style-original"
            block
            @click="checkOutBuyAndMintOrder()"
            :disabled="!selected"
        >{{ $t('modal-checkout.checkout-btn') }}
        </b-button>
        <b-button
            v-if="buyInprogress == 1"
            class="mt-3 btn-style-original"
            block
            disabled
        >{{ $t('modal-checkout.inprogress') }}
        </b-button>
        <b-button
            v-if="buyInprogress == 2"
            class="mt-3 btn-style-original"
            block
            @click="goToPageRedeem('/profile/redeem')"
        >{{ $t('modal-checkout.checkout-redeem') }}
        </b-button>
        <b-button
            v-if="buyInprogress == 3"
            class="mt-3 btn-style-original"
            block
            @click="closeAgain()"
        >{{ $t('modal-checkout.checkout-close-try') }}
        </b-button>
      </div>
    </b-modal>

    </div>
  </div>
</template>

<script>
import Vcode from "@/utils/PuzzleVcode/main.js";
import store from '@/store'
import { vuexTypes } from "@/store/modules/types";
import { mapActions, mapGetters } from "vuex";
import moment from "moment";

//data
import ServiceCheckout from "@/data/ServiceCheckout.json";
import ServiceFormatFrom from "@/data/ServiceFormatFrom.json";

const EVENTS = {
    click: "click",
};

export default {
    name: "card-presale",

    components: {
        Vcode
    },

    props: {
        price: { type: Number, required: true },
        salePrice: { type: Number, required: true },
        currency: { type: String, required: true },
        mainTitle: { type: String, required: true },
        subTitle: { type: String, required: true },
        discount: { type: Number, required: true },
        startData: { type: Number, required: true },
        closeData: { type: Number, required: true },
        productId: { type: String, required: true },
        productPriceId: { type: String, required: true },
        statusBtn: { type: Number, required: true },
        currencyImageUrl: { type: String, required: true },
        productImageUrl: { type: String, required: true },
    },
    data: () => ({
        EVENTS,
        selected: null,
        status: "Success",
        hash: "",
        currentUnit: ServiceCheckout.currencyUnit,
        totalUnit: ServiceCheckout.totalUnit,
        progressUnit: ServiceCheckout.progressUnit,
        options: ServiceFormatFrom.from_selected_platform,
        isShowCheckOutModal: false,
        success: "Verified",
        fail: "Verified fail",
        text: "Slide to complete the puzzle",
        inputQuantity: 1,
        buyInprogress: 0,
    }),
    computed: {
        ...mapGetters({
            responseBuyOrder: vuexTypes.responseBuyOrder,
            metamaskAccount: vuexTypes.metamaskAccount,
            myWishList: vuexTypes.myWishList,
            approveStatus: vuexTypes.approveStatus,
            mintStatus: vuexTypes.mintStatus,
        }),
    },
    methods: {
        ...mapActions({
            ncmBuyOrder: vuexTypes.NCM_API_BUY_ORDER,
            ncmMyWishList: vuexTypes.NCM_API_PRODUCT_WISHLIST,
            disconnect: vuexTypes.DISCONNECT_METAMASK
        }),
        buyOrderNow() {
            if (this.metamaskAccount === "" || this.metamaskAccount === null || Number(localStorage.getItem('authorization_expire')) < moment().unix()) {
                this.disconnect();
                this.$root.$emit("alert-login-metamask-gamedetail");
            } else {
                this.selected = false;
                this.buyInprogress = 0;
                store.commit(vuexTypes.SET_APPROVE_STATUS, 0);
                store.commit(vuexTypes.SET_MINT_STATUS, 0);
                this.isShowCheckOutModal = true;
            }
        },
        async addWishList(productId, productPriceId) {
          if (this.metamaskAccount === "" || this.metamaskAccount === null || Number(localStorage.getItem('authorization_expire')) < moment().unix()) {
                this.disconnect();
                this.$root.$emit("alert-login-metamask-gamedetail");
          } else {
            await this.ncmMyWishList({
                'productId': productId,
                'productPriceId': productPriceId,
                'remove': false
            })
          }
        },
        isWishList(productId) {
            if(this.myWishList && this.myWishList.find(element => element == productId)) {
                return true;
            }
            return false;
        },
        async checkOutBuyAndMintOrder() {

          this.buyInprogress = 1;
          this.$bvModal.show("modal-checkout-buy-mint-inprogress");
          await this.ncmBuyOrder({
            productId: this.productId,
            productPriceId: this.productPriceId,
            quantity: this.inputQuantity
          });

          if (!this.responseBuyOrder.success) {
            this.$bvModal.hide("modal-checkout-inprogress");
            this.$bvModal.show("modal-checkout-fail");
            this.buyInprogress = 3;
          } {
            this.buyInprogress = 2;
          }

        },
        increment() {
            this.inputQuantity++;
        },
        decrement() {
            if (this.inputQuantity === 1) {
                this.inputQuantity = 1;
            } else {
                this.inputQuantity--;
            }
        },
        getImgUrl(name) {
            let images = require.context(
                "@/assets/game_detail/",
                false,
                /\.png$/
            );
            return images("./" + name + ".png");
        },
        getProgress() {
            return (this.currentUnit / this.totalUnit) * 100;
        },
        getStyleProgress() {
            return "width: " + this.getProgress() + "%";
        },
        onSuccess() {
            this.$bvModal.show("modal-checkout-buy-mint");
            this.isShowCheckOutModal = false;
        },
        onClose() {
            this.isShowCheckOutModal = false;
        },
        closeAgain() {
          this.$bvModal.hide("modal-checkout-fail");
        },
        goToPageRedeem(path) {
          this.showNavigation = true
          this.visible = false
          if(path !== this.$route.path){
            this.$router.push(path);
          }
          this.$root.$emit("on-click-tab-my-profile", 1);
        },
        getTimeOpen(time) {
            return moment.unix(time).format("DD/MM/YY");
        },
        isOpenPreOrder(time) {
          return moment() >= moment.unix(time);
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
        }
    },
};
</script>

<style lang="scss" scoped>
@import "~@/scss/_variables.scss";
.card-presale {
  font-family: Inter;
  font-style: normal;
  background: $white-bg;
  box-shadow: 0px 2px 12px 2px rgba(0, 0, 0, 0.05);
  border-radius: 18px;
  max-width: 100%;
  min-height: auto;
  max-width: 561px;
  padding: 20px;
}

.card-presale > .card-body > .card-presale-title__title {
    font-weight: 700;
    font-size: 32px;
    line-height: 44px;
    color: $dark-1;
}
.card-presale-title__sub-title {
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    color: $dark-2;
    margin-top: 5px;
}
.card-presale-content {
    width: 100%;
    height: 100%;
    padding: 0 40px;
}
.card-presale-content__background-txt {
    background-color: $font-color-hilight;
    font-size: 1.8vh;
    font-weight: 700;
}
.card-presale-content__hilight-txt {
    font-size: 36px;
    font-weight: 600;
    line-height: 50px;
    letter-spacing: -0.015rem;
}
.card-presale-content__font-purple {
  color: $yellow;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 44px;
}

.tag_purple_left {
    border-top-left-radius: 0px !important;
    border-bottom-left-radius: 0px !important;
    border-top-right-radius: 6px !important;
    border-bottom-right-radius: 6px !important;
    background-color: $yellow !important;
    color: $white !important;
    font-size: 24px !important;
    line-height: 32px !important;
    font-weight: 700;
    font-style: normal;
    min-width: 208px;
    height: 42px;
}

.card-presale > .card-body > div.row > div > div.progress {
    background-color: $light-2 !important;
    min-height: 13.85px;
    border-radius: 6.92716px !important;

    .card-presale-content__progress-bar {
        border-radius: 2rem !important;
        background-color: $yellow;
    }
}
.card-presale>.card-body {
  padding: 0;
}
.card-presale > .card-body > div.row > div > select.custom-select {
    background: #23262f;
    /* Color/Dark/Dark 3 */
    border: 2px solid #484c56;
    box-sizing: border-box;
    border-radius: 5px;
}
.text-right {
    text-align: right;

    @media (max-width: 390px) {
      padding: 0 !important;
    }
}

#demo-sb,
.b-icon.bi {
    color: #fff;
}
.spin-button__style {
    min-width: 56px;
    min-height: 30px;
    border-radius: 6px;
    background: $light-1 !important;
    box-sizing: border-box !important;
    border: none;
}

.spin-button__style.btn {
    box-shadow: none;
}

.spin-button__style.left-check-out {
    min-width: 40px;
    min-height: 40px;
    background: $light-1 !important;
    border-left: 1px solid $light-1 !important;
    border-top: 1px solid $light-1 !important;
    border-bottom: 1px solid $light-1 !important;
    border-right: 0 !important;
    border-right-width: 0px !important;
    box-sizing: border-box !important;
}

.spin-button__style.right-check-out {
    min-width: 40px;
    min-height: 40px;
    background: $light-1 !important;
    border-right: 1px solid $light-1 !important;
    border-top: 1px solid $light-1 !important;
    border-bottom: 1px solid $light-1 !important;
    border-left: 0 !important;
    border-left-width: 0px !important;
    box-sizing: border-box !important;
}

.spin-button__quantity.check-out {
  font-weight: 500 !important;
  font-size: 18px !important;
  line-height: 24px;
  min-height: 40px !important;
  text-align: center !important;
  color: $app-font-color !important;
  background: $light-1 !important;
  border-right: 0 !important;
  border-left: 0 !important;
  border-top: 1px solid $light-1 !important;
  border-bottom: 1px solid $light-1 !important;
  box-sizing: border-box !important;
}

.spin-button__quantity.check-out.form-control {
    padding: 0;
    font-size: 12px;
    font-weight: 400;
}
.form-select.select-platform {
    line-height: 39px;
    border: 2px solid #484c56;
    box-sizing: border-box;
    border-radius: 12px;
    -webkit-text-fill-color: #87898E !important;
    background: $dark-dark
        url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3e%3cpath fill='white' d='M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z'/%3e%3c/svg%3e")
        no-repeat right 0.75rem center/25px 12px !important;
       font-weight: 400;
       font-size: 14px;
}
.spin-button__quantity {
    min-height: 56px !important;
    text-align: center !important;
    color: $dark-1 !important;
    background: $light-1 !important;
    border-radius: 6px;
    box-sizing: border-box !important;
    border-right: transparent !important;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
}
.btn-card-presale__full-width {
    width: 100% !important;
}

/** END CardPreSale **/
div#modal-checkout___BV_modal_content_,
div#modal-checkout-inprogress___BV_modal_content_,
div#modal-checkout-success___BV_modal_content_,
div#modal-checkout-fail___BV_modal_content_ {
  font-family: Inter;
  font-style: normal;
}

#modal-checkout-inprogress___BV_modal_content_.modal-content {
  width: 80% !important;
}

.modal-checkout__title-total-payment {
    font-weight: 600;
    font-size: 16px;
    line-height: 36px;
    /* or 187% */
    /* Light Grey 1 */
    color: $app-font-color;
    opacity: 0.9;
}
.modal-checkout__total-payment {
    font-weight: 700;
    font-size: 18px;
    line-height: 36px;
    /* or 200% */
    text-align: right;
    /* Purple */
    color: $app-font-hover-color;
}

p.checkout__text-status,
p.checkout__text-order-id {
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  /* identical to box height, or 133% */
}

p.checkout__text-status {
  /* Yellowe */
  color: $app-theme-color;
}

p.checkout__text-order-id {
  /* Link */
  color: $link;
}

p.checkout__title-detail {
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  /* identical to box height, or 133% */
  /* Dark1 */
  color: $app-font-color;
  opacity: 0.9;
}

.checkout__social-txt {
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */
  text-align: center;
  /* Dark2 */
  color: $dark-2;
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

#modal-checkout___BV_modal_header_.modal-header .close {
    margin-right: 0.2rem !important;
 }

#modal-checkout___BV_modal_header_ button.close {
    opacity: 1 !important;
}

#modal-checkout-success___BV_modal_header_.modal-header .close {
    margin-right: 0 !important;
 }

 #modal-checkout-success___BV_modal_header_.modal-header {
    padding-bottom: 0px;
    padding-top: 22px;
 }

#modal-checkout-success___BV_modal_header_ button.close {
    opacity: 1 !important;
}

#modal-checkout___BV_modal_header_.modal-header {
  position: relative;
  top: 6px;
  left: 10px;
}

h5#modal-checkout___BV_modal_title_ {
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  letter-spacing: -0.015em;
}

.input-group.check-out-group .input-group-prepend .btn {
    box-shadow: none;
}

div.btn-wrapper-checkout {
    align-items: center;
    justify-content: center;
}

.btn-wrapper-checkout .btn.btn-secondary.btn-block.mt-3.btn-preorder {
  color: $app-font-color !important;
}

.btn.spin-button__style.right-check-out {
    max-width: 35px !important;
    padding: 0;
    font-size: 0;
    border-radius: 0px 12px 12px 0px;
}

.btn.spin-button__style.left-check-out {
    max-width: 35px !important;
    padding: 0;
    font-size: 0;
    border-radius: 12px 0px 0px 12px;
}

.input-group.check-out-group {
    max-height: 40px;
    float: right;
}
#modal-checkout-success___BV_modal_header_.modal-header .close {
  margin-right: 0 !important;
}
#modal-checkout-success___BV_modal_header_.modal-header {
  padding-bottom: 0px;
  padding-top: 22px;
}
#modal-checkout-success___BV_modal_header_ button.close {
  opacity: 1 !important;
}
#modal-checkout___BV_modal_header_.modal-header {
  position: relative;
  top: 6px;
  left: 10px;
}

img.check-out-game {
  margin: auto;
  display: block;
}

@media (min-width: 768px) {
  div#modal-checkout div.modal-dialog.modal-md.modal-dialog-centered {
    max-width: 480px !important;
  }
  img#img-game-second.check-out-game {
    display: none;
  }
  div#img-pre-game {
    bottom: 0;
  }
}
@media (max-width: 768px) {

  .card-presale {
    width: 100%;
    height: auto;
    margin-right: 0px;
  }
  .btn-wrapper-checkout .btn.btn-secondary.btn-block.mt-3.btn-preorder,
  .btn-wrapper-checkout .btn.btn-secondary.btn-block.mt-3.disabled  {
    margin-left: 0 !important;
    margin-right: 0 !important;
    margin-top: 10px !important;
    max-width: unset !important;
  }
  .bg-block-yellow {
    max-width: unset !important;
  }
  .input-group.check-out-group {
    min-width: 100%;
    max-height: 40px;
    float: unset;
  }
  img.check-out-game {
    min-width: 70%;
    margin-left: auto;
    margin-right: auto;
    display: block;
  }

  img#img-game-first.check-out-game {
    display: none;
  }
  img#img-game-second.check-out-game {
    display: block;
    width: 70%;
  }
  div#img-pre-game {
    bottom: 12px;
  }
}
@media (max-width: 380px) {
  div#checkbox-text-accept.col-11 {
    max-width: 88%;
  }
  @media (max-width: 362px) {
    div div.modal-checkout__title-total-payment {
      font-size: 12px !important;
    }
    div div.modal-checkout__total-payment {
      font-size: 14px !important;
    }
  }

}
h5#modal-checkout___BV_modal_title_ {
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  letter-spacing: -0.015em;
}

span.title-detail-game {
  font-size: 14px;
  line-height: 24px;
}

span.title-detail-text {
  font-size: 14px;
  line-height: 16px;
  color: $dark-2;
}

p.subtitle-detail-game {
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  /* identical to box height, or 114% */
  /* Dark2 */
  color: $dark-2;
}

span.sale-price {
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  /* or 114% */
  /* Yellowe */
  color: $app-font-hover-color;
}

span.text-accept {
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  /* or 171% */
  /* Dark2 */
  color: $dark-2;
}

.accept-terms.custom-control.custom-control.custom-checkbox
.custom-control-input:checked ~ .custom-control-label::after {
  background-color: #3772FF;
  border-radius: 3px;
  width: 18px !important;
  height: 18px !important;
}
.input-group.check-out-group .input-group-prepend .btn {
  box-shadow: none;
}
div.btn-wrapper-checkout {
  align-items: center;
  justify-content: center;
}

.btn.spin-button__style.right-check-out {
  max-width: 35px !important;
  padding: 0;
  font-size: 0;
  border-radius: 0px 12px 12px 0px;
}

.input-group.check-out-group {
  max-height: 40px;
  float: right;
}

p.date-times {
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    margin-top: 0.5rem;
    align-items: center;
    text-align: right;
    color: $dark-2;
}

del {
    font-weight: 500;
    font-size: 18px;
    line-height: 30px;
    letter-spacing: -0.015em;
    text-decoration-line: line-through;
    color: $yellow;
}

p.text-detail-left {
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    color: #4A525F !important;
    margin: 0rem 0rem;

    .font-weight-bold {
       font-weight: 700;
    }
}

.progress {
       height: 0rem !important;
}

p.text-dropdown {
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    color: $dark-1;
    margin: 0.5rem 0rem;
}

.custom-control-label::after {
  background: #F0F1F3;
  /* Light2 */
  border: 1px solid #C8D3D7;
  border-radius: 3px;
}

.bg-img {
  /* Light1 */
  background: #F0F1F3;
  border-radius: 6px;
  background-color: #F0F1F3;
  min-width: 40px;
  height: auto !important;
  border-radius: 6px !important;
  object-fit: scale-down;
  box-shadow: 0px 2px 12px 2px rgb(0 0 0 / 5%);
  padding: 25% 6%;
}

.bg-drop-shadow1 {
  /* White */
  background: #FAFAFA;
  /* Drop Shadow1 */
  box-shadow: 0px 2px 12px 2px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  min-height: 72px;
}

.close-in-duration {
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  /* or 133% */
  text-align: right;
  /* Dark1 */
  color: $app-font-color;

    @media (max-width: 390px) {
      padding: 0;
      font-size: 16px;

    }
}

.success-img {
  min-height: 208px;
  padding: 16% 6%;
  display: flex;
  align-content: center;
  justify-content: center;
}

span.title-detail-checkout {
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 5px;
  margin-left: -10px;
}
</style>
