<template>
  <div id="app" :key="lang">
    <navbar />
    <!-- <div> -->
      <router-view />
    <!-- </div> -->
    <footer-profile v-if="showFooterDetail()" />
    <footer-detail v-else />
  </div>
</template>

<script>
import { i18n } from "@/i18n";
import Navbar from "@/components/common/Navbar.vue";
import FooterDetail from "@/components/common/FooterDetail.vue";
import FooterProfile from '@/components/common/FooterProfile.vue';

export default {
  name: "app",
  components: {
    Navbar,
    FooterDetail,
    FooterProfile,
  },
  data() {
    return {
      lang: i18n.locale,
    };
  },
  created() {
    this.setAppTitle()
  },
  methods: {

    showFooterDetail() {
      if( this.$route.path.split('/')[1] === "profile" || this.$route.path.split('/')[1] === "game"
      || this.$route.path.split('/')[1] === "privacy-policy" || this.$route.path.split('/')[1] === "terms-of-service"){
        return true
      }
      return false
      },
    setAppTitle () {
      document.title = 'N-Commerce'
    },
  },
};
</script>


