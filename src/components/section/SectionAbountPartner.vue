<template>
    <div class="section-partner">
        <div class="container">
            <div class="title-section">
                <h1 class="title-section-meet">{{ $t("about.partner.title") }}</h1>
                <p class="detail-section-meet">{{ $t("about.partner.detail") }}</p>
            </div>

            <div class="row content-partner">
                <div class="col-12 partner-position">
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
    </div>
</template>

<script>
export default {
    name: 'section-partner'
}
</script>

<style lang="scss" scoped>
@import '@/scss/About.scss';

.section-partner {
    padding-top: 3rem;
    padding-bottom: 3rem;
}

.row.content-partner {
    justify-content: space-between;
    text-align: center;
}

.container.section-partner-contents {
    margin-top: 2.5rem;
}

.section-partners__image {
  margin: 15px;
}

.partner-position {
    display: flex;
    justify-content: space-around;

    @media (max-width: 991px) {
        flex-wrap: wrap;
    }

    @media (max-width: $small) {
        flex-direction: column;
        align-items: center;
    }
}
</style>