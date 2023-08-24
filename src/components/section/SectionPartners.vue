<template>
  <div class="section-partners">
      <div class="row">
          <p class="section-partners__heading">{{ $t('home.section-partner.title-lbl') }}</p>
          <div class="col-md-12">
            <div class="row text-center">
                <div class="col"> 
                  <img class="section-partners__image img-fluid" style="min-width:272px; height:40px;" src="~@/assets/home/logo-okc.svg">
                </div>
                <div class="col"> 
                  <img class="section-partners__image img-fluid" style="min-width:245px; height:40px;" src="~@/assets/home/OKX.svg">
                </div>
                <div class="col"> 
                  <img class="section-partners__image img-fluid" style="min-width:132px; height:40px;" src="~@/assets/home/dapp.com_logo.png">
                </div>
                 <div class="col"> 
                  <img class="section-partners__image img-fluid" style="min-width:78px; height:40px;" src="~@/assets/home/coin_telegraph.svg">
                </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'section-partners'
}
</script>

<style lang="scss" scoped>
@import '~mdb-ui-kit/css/mdb.min.css';
@import "~@/scss/_variables.scss";

p.section-partners__info {
  color: $dark-1;
   margin-bottom: 50px;
}

p.section-partners__heading {
  font-family: Inter;
  word-break: break-word;
  color: $dark-1;
  font-weight: 700;
  font-size: 32px;
  line-height: 44px;
  margin-bottom: 30px;
  text-transform: uppercase;

  /* or 139% */
  letter-spacing: 0.08em;
}

.section-partners__image {
    /* width: 204px; 
    height: 63px;  */

  margin: 15px;
}

@media only screen and (max-width: 576px) {
    .section-partners__image:not(:last-child) {
      width: 70%;
      min-width: 170px !important;
      height: auto !important;
    }
    .section-partners__image:last-child {
      width: 50%;
      min-width: 170px !important;
      height: auto !important;
    }
}

</style>