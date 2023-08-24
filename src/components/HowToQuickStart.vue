<template>
  <div class="how-to-quick-start">
    <div class="row article__navigation" >
      <span class="article__navigation__hilight">
        <b-link href="/help" class="article__navigation__back">{{$t("how-to.menu.list-link")}}</b-link>
        &nbsp;&nbsp;
        <i class="fas fa-circle fa-xs fa-center circle-icon"></i>
        &nbsp; {{ $t("how-to.quick-start.title") }}
      </span>
    </div>
    <div class="row">
      <div class="col-md-3" style="margin-bottom: 4rem;">
          <div class="list-group article__list-menu">
              <a href="/how-to-buy" class="list-group-item list-group-item-action">
                  {{ $t("how-to.menu.tab-menu-1") }}
              </a>
              <a href="#" class="list-group-item list-group-item-action disabled">{{ $t("how-to.menu.tab-menu-2") }}</a>
              <a href="/how-to-redeem" class="list-group-item list-group-item-action disabled">{{ $t("how-to.menu.tab-menu-3") }}</a>
              <a href="#" class="list-group-item list-group-item-action disabled">{{ $t("how-to.menu.tab-menu-4") }}</a>
          </div>
      </div>
      <div class="col-md-9">
        <article class="article-title quick-start">
          <h2 v-if="!isMobile">{{ $t("how-to.quick-start.title") }}</h2>
          <p  v-if="!isMobile">{{ $t("how-to.buy.update-at") }}</p>
          <article class="article-content">
            <p>{{ $t("how-to.quick-start.detail") }}</p>
            <div class="clearfix" />
            <h1 class="text-title-how-to__quick" style="margin-top: 100px;">{{$t('how-to.quick-start.content-title')}}</h1>
            <div class="row first-step">
              <div class="col-lg-6 col-md-12 order-2 order-lg-0 detail" style="margin: auto;"  ref="menu-1">
                <h1 class="title-detail__quick">
                    {{$t('how-to.quick-start.step')}}
                    <span class="text-step-number">
                        {{$t('how-to.quick-start.step1')}}
                    </span>
                </h1> 
                <span class="detail__quick"
                  >{{$t('how-to.quick-start.content-detail-step1')}}</span
                >
              </div>
              <div class="col-lg-6 col-md-12 banner order-1 order-lg-1">
                <img
                  class="how-to-quick-step-1-img img-fluid"
                  src="~@/assets/help_center/quick_start_step_1.svg"
                />
              </div>
            </div>
            <div class="row second-step">
              <div class="col-lg-7 col-md-12 banner step-2 order-3 order-lg-3">
                <img
                  class="how-to-quick-step-2-img img-fluid"
                  src="~@/assets/help_center/quick_start_step_2.svg"
                />
              </div>
              <div class="col-lg-5 col-md-12 order-4 order-lg-4 detail" ref="menu-2">
                 <h1 class="title-detail__quick">
                     {{$t('how-to.quick-start.step')}}
                    <span class="text-step-number">
                        {{$t('how-to.quick-start.step2')}}
                    </span>
                </h1> 
                <div class="list-detail__quick" style="padding-left: 5%">
                    <li class="detail__quick">{{$t('how-to.quick-start.content-detail-step2_1')}}</li>
                    <p class="detail__quick" style="margin-top: 1rem;">{{$t('how-to.quick-start.content-detail-or')}}</p>
                    <li class="detail__quick">{{$t('how-to.quick-start.content-detail-step2_2')}}</li>
                </div>
              </div>
            </div>
            <div class="row third-step">
              <div class="col-lg-6 col-md-12 order-2 order-lg-0 detail" ref="menu-3">
                 <h1 class="title-detail__quick">
                     {{$t('how-to.quick-start.step')}}
                    <span class="text-step-number">
                        {{$t('how-to.quick-start.step3')}}
                    </span>
                </h1> 
                <span class="detail__quick">
                  {{$t('how-to.quick-start.content-detail-step3')}}</span
                >
              </div>
              <div class="col-lg-6 col-md-12 banner order-1 order-lg-1">
                <img
                  class="how-to-quick-step-3-img img-fluid"
                  src="~@/assets/help_center/quick_start_step_3.svg"
                />
              </div>
            </div>
            <div class="row fourth-step">
              <div class="col-lg-7 col-md-12 banner step-4 order-3 order-lg-3">
                 <img
                  class="how-to-quick-step-4-img img-fluid"
                  src="~@/assets/help_center/quick_start_step_4.svg"
                />
              </div>
              <div class="col-lg-5 col-md-12 order-4 order-lg-4 detail" ref="menu-4">
                  <h1 class="title-detail__quick">
                     {{$t('how-to.quick-start.step')}}
                    <span class="text-step-number">
                        {{$t('how-to.quick-start.step4')}}
                    </span>
                </h1> 
                <span class="detail__quick"
                  > {{$t('how-to.quick-start.content-detail-step4')}}</span
                >
              </div>
            </div>
          </article>
          <!-- <article class="article-content-mobile">
            <p>
              <img
                class="img-fluid"
                src="~@/assets/help_center/buy-to-redemption.png"
              />
            </p>
          </article> -->
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import { validateMobile } from '@/common/core'
export default {
  name: "how-to-quick-start",
  data: () => {
    return{
      isMobile: validateMobile()
    }
  },
  mounted() {
      this.$root.$emit("on-click-to");
  },
};
</script>

<style lang="scss" scoped>
@import "~@/scss/article-help-center";


.quick-start{
  padding-right: 16%;
}

.first-step {
  padding-top: 10%;
}
.second-step,
.third-step,
.fourth-step {
  padding-top: 5%;
}

.detail {
  margin: auto;
}

h1.text-title-how-to__quick {
    font-weight: 600;
    font-size: 36px;
    line-height: 50px;
    /* identical to box height, or 139% */
    text-align: center;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    /* Dark1 */
    color: #4A525F;
    word-break: break-word;
}

h1.title-detail__quick {
    font-weight: 600;
    font-size: 36px;
    line-height: 50px;
    /* or 139% */
    letter-spacing: -0.015em;
    /* Dark1 */
    color: #4A525F;
}

.detail {
  word-break: break-word;
}

.detail__quick {
    font-weight: 400;
    font-size: 16px;
    line-height: 30px;
    /* or 167% */
    letter-spacing: -0.015em;
    /* Dark2 */
    color: #888E97;
}

span.text-step-number {
    font-size: 52px;
}

img.how-to-quick-step-1-img {
    position: relative;
}
.banner {
  display: flex;
  justify-content: center;
}

.banner.step-4::before {
  top: 25%;
}
.banner.step-2::before {
  top: 10%;
  // left: 30%;
}

.banner::before {
  content: "";
  position: absolute;
  width: 229px;
  min-height: 212px;
  height: auto;
  background: #FFFBC9;
  filter: blur(44px);
}

img.how-to-quick-step-2-img {
    position: relative;
    width: 390.33px;
}

img.how-to-quick-step-3-img {
    position: relative;
}

img.how-to-quick-step-4-img {
    position: relative;
}
@media (max-width: 991px) {
  .banner{
    padding-top: 16%;
    padding-bottom: 16%;
  }
  .quick-start {
    padding-right: 0;
  }
}

</style>
