<template>
    <div class="card-key-features">
        <div class="row">
<!--            <div id="carousal__key_feature" class="col-12 carousal__key_feature">-->
<!--                <div-->
<!--                    class="carousel-cell slide"-->
<!--                    v-for="(value, index) in services"-->
<!--                    :key="index"-->
<!--                    img-blank>-->
<!--                    <div class="card-key-feature card text-white">-->
<!--                        <b-card-img :data-flickity-lazyload="getImgUrl(value.image)" class="carousel-slide-image img-fluid"></b-card-img>-->
<!--                        <div class="card-img-overlay overlay">-->
<!--                            <h5 class="card-title">{{ value.title }}</h5>-->
<!--                            <p class="card-text">{{ value.article }}</p>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->

            <div class="col-12 carousal__key_feature" id="carousal__key_feature">
                <div class="carousel-cell slide" v-for="(value, index) in service_list" :key="index">
                    <b-card class="card__feature mb-2">
                        <b-card-img class="carousel-cell-image img-fluid" :src="getImgUrl(value.image)" />
                        <b-card-title class="feature__title">{{ value.title }}</b-card-title>
                        <b-card-text>
                            <p class="feature__article">{{ value.article }}</p>
                        </b-card-text>
                    </b-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

const EVENTS = {
  click: 'click',
}

export default {
    name: "card-key-features",
    props: {
      services: { type: Array, required: true }
    },
    data() {
        return {
            EVENTS,
            service_list: []
        }
    },
    created() {
        let service_length = this.services.length / 3
        for (var i = 0; i < service_length; i++) {
            for (var j = 0; j < this.services.length; j++) {

                let service_obj = {}
                if (typeof this.service_list[i] != 'undefined') {
                    service_obj = this.service_list[i]
                }

                if (this.services[j].detail_order == i) {
                    switch (this.services[j].key_name) {
                        case 'image':
                            service_obj.image = this.services[j].key_value
                            break;
                        case 'title':
                            service_obj.title = this.services[j].key_value
                            break;
                        case 'article':
                            service_obj.article = this.services[j].key_value
                            break;
                    }
                }

                this.service_list[i] = service_obj
            }
        }
    },
    methods: {
        getImgUrl(image_url) {
            return process.env.VUE_APP_URL_MEDIA + image_url
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/scss/_variables.scss";

.card-body {
    width: auto;
    min-height: 405px;
    padding: 0.5rem;
}

.card.card__feature {
    max-width: 300px;
    height: auto;
    border: 1px solid $light-1;
    background: $white-bg;
    border-radius: 18px;
}

img.carousel-cell-image.img-fluid.card-img {
    max-width: 280px;
    max-height: 265px;
}

.feature__title {
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    /* or 140% */
    display: flex;
    align-items: center;
    /* Yellowe */
    color: #F7CA38;
    margin-top: 15px;
}

.feature__article {
    font-weight: 700;
    font-size: 20px;
    line-height: 28px;
    /* or 140% */
    /* Dark1 */
    color: #4A525F;
}






//div.card-key-feature>div.card>div.card-img-overlay {
//  margin: 0 0.3vh 0.7vh;
//  overflow: hidden;
//  padding: 15px;
//}
//
//h5.card-title {
//    color: $white-bg;
//    font-size: 24px;
//    font-style: normal;
//    font-weight: 700;
//    margin-bottom: 36.4px;
//
//  @media (max-width: 1200px) {
//    font-size: 20px;
//  }
//}
//
//div.card-key-feature>div.card>div.card-img-overlay>p.card-text {
//  font-weight: 500;
//  font-size: 18px;
//  line-height: 24px;
//  text-align: left;
//  color: $white-bg;
//}
//
//div.card-key-feature>div.row>div>div.card>img.card__img {
//  display: block;
//  margin-left: auto;
//  margin-right: auto;
//  width: 100%;
//}
//
//.overlay {
//  position: absolute;
//  top: 50% !important;
//  background-color: rgba(72, 72, 72, 0.5);
//  backdrop-filter: blur(10px);
//  border-radius: 0px 0px 11px 6px;
//
//  @media (max-width: 1440px) {
//    top: 40%;
//  }
//}
//
//img.img-fluid.card-img {
//    min-height: auto;
//    min-width: auto;
//    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
//    border-radius: 12px;
//}
//
//.card-key-feature.card.text-white {
//    background-color: transparent !important;
//    min-width: auto !important;
//    min-height: 566px !important;
//    margin: 0rem 1rem;
//}
//
//p.card-text {
//    font-weight: 500;
//    font-size: 18px;
//    line-height: 24px;
//    color: #FAFAFA;
//}
</style>