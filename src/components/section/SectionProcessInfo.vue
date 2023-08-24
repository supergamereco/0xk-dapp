<template>
    <div class="section-process-info">
        <div class="container">
            <div class="row space-between-section">
                <p class="heading-title">{{ $t('home.section-process-info.title-lbl') }}</p>

                <div class="col-sm-12 col-md-4">
                    <img src="@/assets/home/buy-nfts.png" class="img-fluid info-image" />
                    <span class="info-title">{{ $t('home.section-process-info.buy-title') }}</span>
                    <span class="info-detail">{{ $t('home.section-process-info.buy-detail') }}</span>
                </div>
                <div class="col-sm-12 col-md-4">
                    <img src="@/assets/home/claim-nfts.png" class="img-fluid info-image" />
                    <span class="info-title">{{ $t('home.section-process-info.claim-title') }}</span>
                    <span class="info-detail">{{ $t('home.section-process-info.claim-detail') }}</span>
                    <p class="info-detail" style="margin-bottom: unset;">{{ $t('home.section-process-info.claim-detail-note') }}</p>
                    <p class="info-detail">{{ $t('home.section-process-info.claim-detail-note2') }}</p>
                </div>
                <div class="col-sm-12 col-md-4">
                    <img src="@/assets/home/redeem-nfts.png" class="img-fluid info-image" />
                    <span class="info-title">{{ $t('home.section-process-info.redeem-title') }}</span>
                    <span class="info-detail">{{ $t('home.section-process-info.redeem-detail') }}</span>
                </div>

            </div>
        </div>
    </div>
</template>

<script></script>

<style lang="scss" scoped>
@import '~@/scss/_variables.scss';

img.info-image {
    margin-bottom: 1.5rem;
}

span.info-title {
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
    /* or 133% */
    /* Yellowe */
    color: $app-font-hover-color;
}

span.info-detail,
p.info-detail {
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    /* identical to box height, or 138% */
    /* Dark1 */
    color: $app-font-color;
}
</style>