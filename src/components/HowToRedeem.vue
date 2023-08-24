<template>
    <div class="how-to-redeem">
        <div class="row article__navigation">
             <span class="article__navigation__hilight">
                <b-link href="/help" class="article__navigation__back"> {{$t('how-to.menu.list-link')}} </b-link> &nbsp;&nbsp;
                <i class="fas fa-circle fa-xs fa-center circle-icon"></i>&nbsp; {{$t('how-to.redeem.title')}}
            </span>
        </div>
        <div class="row">
            <div class="col-md-3">
                <p>
                <b-list-group class="article__list-menu">
                    <b-list-group-item button active>{{$t('how-to.redeem.title-physical')}}</b-list-group-item>
                    <b-list-group-item button disabled>{{$t('how-to.redeem.title-digital')}}</b-list-group-item>
                </b-list-group>
                </p>
            </div>
            <div class="col-md-9">
                <article class="article-title">
                    <h2>{{$t('how-to.redeem.title-2')}}</h2>
                    <p>{{$t('how-to.buy.update-at')}}</p>
                    <article class="article-content-how-to">
                        <p>{{$t('how-to.buy.detail-1')}}</p>
                        <p>{{$t('how-to.redeem.detail-1')}}</p>
                        <div class="clearfix"/>
                        <!-- <center> -->
                        <img class="how-to-redeem__article-img img-fluid" src="~@/assets/help_center/redeem_img_8.png">
                        <img class="how-to-redeem__article-img img-fluid" src="~@/assets/help_center/redeem_img_7.png">
                        <!-- </center> -->
                        <div class="clearfix"/>
                        <p>{{$t('how-to.redeem.detail-2')}}</p>
                        <div class="clearfix"/>
                        <center><img class="how-to-redeem__article-img img-fluid" src="~@/assets/help_center/redeem_img_6.png"></center>
                        <div class="clearfix"/>
                        <p>{{$t('how-to.redeem.detail-3')}}</p>
                        <div class="clearfix"/>
                        <center><img class="how-to-redeem__article-img img-fluid" src="~@/assets/help_center/redeem_img_5.png"><img class="how-to-redeem__article-img img-fluid" src="~@/assets/help_center/redeem_img_4.png"></center>
                        <div class="clearfix"/>
                        <p>{{$t('how-to.redeem.detail-4')}}</p>
                        <div class="clearfix"/>
                        <center><img class="how-to-redeem__article-img img-fluid" src="~@/assets/help_center/redeem_img_3.png"></center>
                        <div class="clearfix"/>
                        <p>{{$t('how-to.redeem.detail-5')}}</p>
                        <div class="clearfix"/>
                        <center><img class="how-to-redeem__article-img img-fluid" src="~@/assets/help_center/redeem_img_2.png"></center>
                        <div class="clearfix"/>
                        <p>{{$t('how-to.redeem.detail-6')}}</p>
                        <div class="clearfix"/>
                        <center><img class="how-to-redeem__article-img img-fluid" src="~@/assets/help_center/redeem_img_1.png"></center>
                        <div class="clearfix"/>
                        <p>{{$t('how-to.redeem.detail-7')}}</p>
                    </article>
                </article>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: "how-to-redeem",
};
</script>

<style lang="scss" scoped>
@import "~@/scss/article-help-center";

.how-to-redeem__article-img {
    margin-bottom : 1.5rem;
    margin-top: 1.5rem;
    margin-left: 1rem;
    margin-right: 1rem;

    @media (max-width: 820px) {
        width: 70%;
        height: auto;
    }
}

</style>
