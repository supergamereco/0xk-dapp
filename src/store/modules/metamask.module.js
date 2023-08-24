import Web3 from 'web3'

import {errors} from '@/js/errors'
import {vuexTypes} from '@/store/modules/types'
import {callers} from '@/js/api'
import router from '@/vue-router'
import moment from "moment";

export const state = {
    isProcessing: false,
    account: '',
    chain: '',
    accountAuthentication: '',
}

export const mutations = {
    [vuexTypes.SET_METAMASK_PROCESSING](state, isProcessing) {
        state.isProcessing = isProcessing
    },
    [vuexTypes.SET_METAMASK_ACCOUNT](state, account) {
        state.account = account
    },
    [vuexTypes.SET_METAMASK_CHAIN](state, chain) {
        state.chain = chain
    },
    [vuexTypes.SET_METAMASK_ACCOUNT_AUTHENTICATION](state, accountAuthentication) {
        state.accountAuthentication = accountAuthentication
    },
}

export const actions = {
    async [vuexTypes.CONNECT_METAMASK]({commit}) {
        commit(vuexTypes.SET_METAMASK_PROCESSING, true)

        if (!window.ethereum) {
            throw new errors.MetamaskConnectionError()
        }

        const _onAccountsChanged = (accounts) => {
            // eslint-disable-next-line no-console
            console.debug('Web3 provider: Accounts changed', JSON.stringify(accounts))
            const acc = accounts[0]
            if (acc) {
                localStorage.setItem('metamask_account', acc)
                commit(vuexTypes.SET_METAMASK_ACCOUNT, acc)
            } else {
                localStorage.removeItem('metamask_account')
                localStorage.removeItem('metamask_account_signature')
                commit(vuexTypes.SET_METAMASK_ACCOUNT, null)
                commit(vuexTypes.SET_METAMASK_ACCOUNT_AUTHENTICATION, null)
            }
        }

        const _onChainChanged = (chainId) => {
            // eslint-disable-next-line no-console
            console.debug('Web3 provider: Chain changed', chainId)
            commit(vuexTypes.SET_METAMASK_CHAIN, chainId)
        }

        const _onAccountsSignature = (result) => {
            // eslint-disable-next-line no-console
            console.debug('Web3 provider: Accounts Signature', JSON.stringify(result))
            localStorage.setItem('metamask_account_signature', result)
        }

        window.web3 = new Web3(window.ethereum)
        try {
            await window.ethereum
                .request({method: 'eth_requestAccounts'})
                .then(_onAccountsChanged)

            if (!localStorage.getItem('metamask_account_authentication')) {
                const message = await callers.ncmApiLogin(localStorage.getItem('metamask_account'))
                await window.ethereum
                    .request({method: 'personal_sign', params: [message, localStorage.getItem('metamask_account')]})
                    .then(_onAccountsSignature)

                const result = await callers.ncmApiVerifyLogin(localStorage.getItem('metamask_account'), localStorage.getItem('metamask_account_signature'))

                if (!result.success) {
                    localStorage.removeItem('my_wishlist')
                    localStorage.removeItem('metamask_account')
                    localStorage.removeItem('metamask_account_signature')
                    commit(vuexTypes.SET_METAMASK_ACCOUNT, null)
                    commit(vuexTypes.SET_METAMASK_ACCOUNT_AUTHENTICATION, null)
                    commit(vuexTypes.SET_MY_WISHLIST, null)
                    return;
                } else {
                    localStorage.removeItem('metamask_account_signature')
                    localStorage.setItem('metamask_account_authentication', result.data)
                    commit(vuexTypes.SET_METAMASK_ACCOUNT_AUTHENTICATION, result.data)
                    const wishList = []
                    const list = await callers.getMyWishList(localStorage.getItem('metamask_account'))
                    for (var i = 0; i < list.length; i++) {
                        wishList.push(list[i].product.id)
                    }
                    localStorage.setItem('my_wishlist', JSON.stringify(wishList))
                    localStorage.setItem('authorization_expire', moment().add(12, 'hours').unix());
                    commit(vuexTypes.SET_MY_WISHLIST, wishList)
                }
            }
            if (!state.accountAuthentication) {
                commit(vuexTypes.SET_METAMASK_ACCOUNT_AUTHENTICATION, localStorage.getItem('metamask_account_authentication'))
                commit(vuexTypes.SET_MY_WISHLIST, JSON.parse(localStorage.getItem('my_wishlist')))
            }

            await window.ethereum
                .request({method: 'eth_chainId'})
                .then(_onChainChanged)
        } catch (error) {
            // TODO: display verbose metamask error.message
            // eslint-disable-next-line no-console
            console.error(error)
            localStorage.removeItem('metamask_account')
            localStorage.removeItem('metamask_account_signature')
            commit(vuexTypes.SET_METAMASK_ACCOUNT, null)
            commit(vuexTypes.SET_METAMASK_ACCOUNT_AUTHENTICATION, null)
            throw new errors.MetamaskConnectionError()
        }

        window.ethereum.on('accountsChanged', async(account) => {
            const oldAccount = localStorage.getItem('metamask_account')
            await _onAccountsChanged(account)

            if(localStorage.getItem('metamask_account') !== oldAccount){
                localStorage.removeItem('metamask_account')
                localStorage.removeItem('metamask_account_signature')
                localStorage.removeItem('metamask_account_authentication')
                localStorage.removeItem('authorization_expire');
                commit(vuexTypes.SET_METAMASK_ACCOUNT, null)
                commit(vuexTypes.SET_METAMASK_ACCOUNT_AUTHENTICATION, null)
                if(router.currentRoute.path !== '/') await router.push('/');
            }
        });
        window.ethereum.on('chainChanged', _onChainChanged)
        window.ethereum.on('connect', (conInfo) => {
            // eslint-disable-next-line no-console
            console.debug('Web3 provider: Connected', JSON.stringify(conInfo))
        })
        window.ethereum.on('disconnect', (err) => {
            // eslint-disable-next-line no-console
            console.debug('Web3 provider: Disconnected', JSON.stringify(err))
        })
        window.ethereum.on('message', (msg) => {
            // eslint-disable-next-line no-console
            console.debug('Web3 provider: Got message', JSON.stringify(msg))
        })

        commit(vuexTypes.SET_METAMASK_PROCESSING, false)
    },

    async [vuexTypes.DISCONNECT_METAMASK]({commit}) {
        commit(vuexTypes.SET_METAMASK_PROCESSING, true)
        localStorage.removeItem('metamask_account')
        localStorage.removeItem('metamask_account_authentication')
        localStorage.removeItem('authorization_expire');
        commit(vuexTypes.SET_METAMASK_ACCOUNT, null)
        commit(vuexTypes.SET_METAMASK_ACCOUNT_AUTHENTICATION, null)
        commit(vuexTypes.SET_METAMASK_PROCESSING, false)
    },

    async [vuexTypes.REQUEST_METAMASK_CHAIN_CHANGE](context, chainId) {
        if (getters[vuexTypes.metamaskChain] === chainId) return false
        const {ethereum} = window
        if (!ethereum) return false

        try {
            await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{chainId}],
            })

            return true
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error)

            return false
            // throw new errors.MetamaskConnectionError()
        }
    },

    async [vuexTypes.ONCE_METAMASK_CHAIN_CHANGE](context, callback) {
        window.ethereum.once('accountsChanged', callback)
    },
}

export const getters = {
    [vuexTypes.isMetamaskConnected]: state => Boolean(state.account),
    [vuexTypes.isMetamaskProcessing]: state => state.isMetamaskProcessing,
    [vuexTypes.metamaskAccount]: state => state.account,
    [vuexTypes.metamaskChain]: state => state.chain,
    [vuexTypes.accountAuthentication]: state => state.accountAuthentication,
}

export default {
    state,
    mutations,
    actions,
    getters,
}
