<template>
  <div class="privacy-policy">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <h1 class="text-title">{{ dataList.title }}</h1>
          <section-privacy :dataList="dataList.contents" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PolicyContent from "@/i18n/resources/en.json";
import SectionPrivacy from '@/components/section/SectionPrivacy.vue';

export default {
  components: { SectionPrivacy },
  name: "privacy-policy",
  data: () => {
    return {
      dataList: PolicyContent.privacy_policy,
    };
  }
};
</script>