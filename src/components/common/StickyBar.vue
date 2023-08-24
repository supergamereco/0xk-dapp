<template>
    <div class="container-fluid sticky">
        <div class="row justify-content-center">
            <div class="col-12 sticky__slide" v-if="currency">
              <div class="text__price">
                <h2 class="sale__price">
                    {{ price - (price * (discountPercent / 100)) }}
                </h2>
                <del class="sale__price_del">{{ price }}&nbsp;{{ currency.name }}</del>
              </div>

                <img :src="getImgCurrencyUrl(currency.image_url)"
                    class="image__currency"
                />

                <button
                    type="button"
                    class="btn btn-preorder text-color btn-card-presale__full-width"
                    @click="submit()"
                >
                    {{ statusBtn === 1 ? $t("common.buy-btn") : $t("common.preorder-btn") }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "sticky-bar",
    props: {
        price: { type: Number, required: true },
        discountPercent: { type: Number, required: true },
        currency: { type: Object, required: true },
        statusBtn: { type: Number, required: true }
    },
    data() {
        return {
            selectedPlatform: null,
            isShowCheckOutModal: false,
            success: "Verified",
            fail: "Verified fail",
            text: "Slide to complete the puzzle",
            inputQuantity: 1,
        };
    },
    methods: {
        submit() {
            var el = document.getElementById('preorder-top');
            el.scrollIntoView({behavior: "smooth", block: "start"});
        },
        getImgCurrencyUrl(image_url) {
            return process.env.VUE_APP_URL_MEDIA + image_url;
        },
    },
};
</script>

<style lang="scss" scoped>
@import "~@/scss/_variables.scss";

div.sticky {
    position: fixed;
    bottom: 0;
    border: none;
    background: $white-bg;
    box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.25);
    z-index: 21;
    min-width: auto;
    min-height: 120px !important;
    left: 0;

    @media (max-width: 320px) {
         min-height: 90px !important;
    }
}

.sticky__slide {
    display: flex;
    justify-content: center;
    padding: 1rem 0rem;
    gap: 1rem;

    @media (min-width: 321px) and (max-width: 375px) {
        gap: unset;
    }

    @media (max-width: 320px) {
        gap: unset;
        padding: 0rem 1rem;
    }
}

h2.sale__price {
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 44px;
    color: $yellow;

    @media (max-width: 320px) {
        font-size: 24px;
    }
}

button.btn.btn-preorder.text-color.btn-card-presale__full-width {
    width: 380px !important;
    height: 52px;
    border-radius: 6px;
    font-style: normal;
    font-weight: 600 !important;
    font-size: 16px;
    line-height: 16px;
    align-items: center;
    text-align: center;
    margin: 15px 5px;
    word-break: break-word;

    @media (max-width:552px) {
       width: auto !important;
    }
}

img.image__currency {
    width: 50px;
    height: 50px;
    margin-top: auto;
    margin-bottom: auto;
    //margin: 10px 54px 10px 0px;

    @media (max-width: 320px) {
        width: 10px !important;
        min-width: 40px;
        min-height: auto;
        margin: auto;
    }
}

del.sale__price_del {
    color: $yellow;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;

    @media (max-width: 320px) {
        font-size: 16px;
    }
}
</style>
