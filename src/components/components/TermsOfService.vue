<template>
    <div class="terms-of-service privacy-policy">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12">
                    <h1 class="text-title">{{ dataList.title }}</h1>
<!--                    <p class="text-title detail">{{ dataList.effective_date }}</p>-->
                    <section-privacy :dataList="dataList.contents" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TermsOfService from '@/i18n/resources/en.json'
import SectionPrivacy from '@/components/section/SectionPrivacy.vue'

export default {
  components: { SectionPrivacy },
    name: 'terms-of-service',
    data: () => {
        return {
            dataList: TermsOfService.terms_of_service
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~@/scss/_variables.scss';
p.text-title.detail {
    font-size: 18px;
    line-height: 24px;
    color: $dark-2;
    margin-top: 16px;

    @media (max-width: 768px) {
         margin-left: 27px;
    }
}
</style>
