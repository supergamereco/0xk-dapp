import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/Home.vue'
import About from '@/components/About.vue'
import GameDetail from '@/components/GameDetail.vue'
import MyProfile from '@/components/MyProfile.vue'
import Contact from '@/components/Contact.vue'
import HelpCenter from '@/components/HelpCenter.vue'
import HowToBuy from '@/components/HowToBuy.vue'
import HowToRedeem from '@/components/HowToRedeem.vue'
import HowToQuickStart from '@/components/HowToQuickStart.vue'
import Roadmap from '@/components/Roadmap.vue'
import Authenticator from '@/components/Authenticator.vue'
import PrivacyPolicy from '@/components/PrivacyPolicy.vue'
import TermsOfService from '@/components/TermsOfService.vue'
import ListProduct from "@/components/ListProduct";

Vue.use(VueRouter)

const routes = [
    {
      path: '/',
      component: Home
    },
    {
      path: '/product',
      component: GameDetail
    },
    {
        path: '/list',
        component: ListProduct
    },
    {
      path: '/profile/:action?',
      component: MyProfile
    },
    {
      path: '/roadmap',
      component: Roadmap
    },
    {
      path: '/about/:action?',
      component: About
    },
    {
      path: '/contact',
      component: Contact
    },
    {
      path: '/help',
      component: HelpCenter,
      // children: [
      //   {
      //     path: '/how-to-buy', // '/how-to-buy/:step',
      //     component: HowToBuy,
      //   }
      // ],
    },
    {
      path: '/how-to-buy',
      component: HowToBuy
    },
    {
      path: '/how-to-redeem',
      component: HowToRedeem,
    },
    {
      path: '/how-to-quick-start',
      component: HowToQuickStart,
    },
    {
      path: '/auth',
      component: Authenticator,
    },
    {
      path: '/privacy-policy',
      component: PrivacyPolicy,
    },
    {
      path: '/terms-of-service',
      component: TermsOfService,
    }
  ]

  const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior (to) {
      if (to.hash) {
        return {
          selector: to.hash,
          behavior: 'smooth',
        }
      }
    },
  })
  
  export default router