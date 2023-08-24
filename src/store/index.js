import Vue from 'vue'
import Vuex from 'vuex'
import metamask from '@/store/modules/metamask.module'
import ncommerce from '@/store/modules/ncm.module'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        metamask,
        ncommerce
    }
})