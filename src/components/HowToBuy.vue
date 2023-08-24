<template>
    <div class="how-to-buy">
        <div class="container" >
        <div class="how-to-buy__page">
            <div class="row article__navigation">
                <span class="article__navigation__hilight">
                    <b-link href="/help" class="article__navigation__back"> {{$t('how-to.menu.list-link')}} </b-link> &nbsp;&nbsp;
                    <i class="fas fa-circle fa-xs fa-center circle-icon"></i>&nbsp; {{$t('how-to.buy.how-to-buy')}}
                </span>
            </div>
            <div class="row">
                <div class="col-md-3 how-to-buy__articles">
                    <b-list-group class="article__list-menu mb-5">
                        <b-list-group-item button active>{{$t('how-to.menu.tab-menu-1')}}</b-list-group-item>
<!--                        <b-list-group-item button disabled>{{$t('how-to.menu.tab-menu-2')}}</b-list-group-item>-->
                    </b-list-group>
                </div>

                <div class="col-md-9">
                    <div class="row article-title how-to-buy">
                        <h2 style="word-break: break-word;">{{$t('how-to.buy.title')}}</h2>
<!--                        <p>{{$t('how-to.buy.update-at')}}</p>-->
                        <p>&nbsp;</p>
                        <div class="article-content-how-to">
                          <h2><center>Coming soon</center></h2>
<!--                            <p>{{$t('how-to.buy.detail-1')}}</p>-->
<!--                            <p style="text-indent: 50px;">{{$t('how-to.buy.detail-2')}}</p>-->
<!--                            <p>{{$t('how-to.buy.detail-1')}}</p>-->
<!--                            <p style="text-indent: 50px;">{{$t('how-to.buy.detail-2')}}</p>-->
<!--                            <p>{{$t('how-to.buy.detail-1')}}</p>-->
<!--                            <p style="text-indent: 50px;">{{$t('how-to.buy.detail-2')}}</p>-->
<!--                            <p>{{$t('how-to.buy.detail-1')}}</p>-->
<!--                            <p style="text-indent: 50px;">{{$t('how-to.buy.detail-2')}}</p>-->
<!--                            <p>{{$t('how-to.buy.detail-1')}}</p>-->
<!--                            <p style="text-indent: 50px;">{{$t('how-to.buy.detail-2')}}</p>-->
<!--                            <p>{{$t('how-to.buy.detail-1')}}</p>-->
<!--                            <p style="text-indent: 50px;">{{$t('how-to.buy.detail-2')}}</p>-->
<!--                            <p>{{$t('how-to.buy.detail-1')}}</p>-->
<!--                            <p style="text-indent: 50px;">{{$t('how-to.buy.detail-2')}}</p>-->
<!--                            <p>{{$t('how-to.buy.detail-1')}}</p>-->
<!--                            <p style="text-indent: 50px;">{{$t('how-to.buy.detail-2')}}</p>-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>

    </div>
</template>

<script>

export default {
    name: "how-to-buy",
}
</script>

<style lang="scss" scoped>
@import "~@/scss/article-help-center";

.how-to-buy__articles {
    border-radius: 6px;

    @media (max-width: 610px) {
        margin-bottom: 2rem;
    }
}

.how-to-buy__content-detail-image {
    margin-top: 25px;
    margin-bottom: 40px;

    @media (max-width: 1024px) {
        min-width: 70%;
        height: auto;
    }
}

</style>
