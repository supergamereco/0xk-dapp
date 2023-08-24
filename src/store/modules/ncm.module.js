import {vuexTypes} from '@/store/modules/types'
import {callers} from '@/js/api'
import store from '@/store'

export const state = {
    myNftList: '',
    myWishList: '',
    preorderList: '',
    physicalList: '',
    digitalList: '',
    activityList: '',
    approveStatus: 0,
    mintStatus: 0,
    burnStatus: 0,
    responseBuyOrder: {
        data: {},
        success: false
    },
    responseRedeemOrder: '',
    responseMintOrder: '',
    responseAuthenticatorNft: '',
    userModel: {
        walletAddress: '',
        customerUid: '',
        customerName: '',
        avatarUrl: '',
        email: '',
    },
    userAddress: {
        addressUid: '',
        walletAddress: '',
        address: '',
        active: '',
    },
    responseProductDetail: '',
    responsePopularCategories: '',
    responseLimitedEdition: '',
    responseNftMarketplace: ''
}

export const mutations = {

    [vuexTypes.SET_DATA_BUY_ORDER](state, data) {
        if (data) {
            state.responseBuyOrder = data
        }
    },

    [vuexTypes.SET_DATA_MINT_ORDER](state, data) {
        if (data) {
            state.responseMintOrder = data
        }
    },

    [vuexTypes.SET_DATA_REDEEM_ORDER](state, data) {
        if (data) {
            state.responseRedeemOrder = data
        }
    },

    [vuexTypes.SET_MY_NFT_LIST](state, data) {
        if (Object.keys(data).length > 0 && data.list.length >= 0 && !data.is_empty) {
            state.myNftList = data
        }
    },

    [vuexTypes.SET_PRE_ORDER_LIST](state, data) {
        if (Object.keys(data).length > 0 && data.list.length >= 0 && !data.is_empty) {
            state.preorderList = data
        }
    },
    [vuexTypes.SET_ACTIVITY_LIST](state, data) {
        if (data) {
            state.activityList = data
        }
    },

    [vuexTypes.SET_HISTORY_PHYSICAL_LIST](state, data) {
        if (data) {
            state.physicalList = data
        }
    },

    [vuexTypes.SET_HISTORY_DIGITAL_LIST](state, data) {
        if (data) {
            state.digitalList = data
        }
    },

    [vuexTypes.SET_DATA_MY_PROFILE](state, data) {
        if (data) {
            state.userModel = data
        }
    },

    [vuexTypes.SET_DATA_MY_ADDRESS](state, data) {
        if (data) {
            state.userAddress = data
        }
    },

    [vuexTypes.SET_DATA_AUTHENTICATOR_NFT](state, data) {
        if (data) {
            state.responseAuthenticatorNft = data
        }
    },

    [vuexTypes.SET_DATA_SUBSCRIBE_PRODUCT](state, data) {
        if (data) {
            state.responseSubscribeProduct = data
        }
    },

    [vuexTypes.SET_MY_WISHLIST](state, data) {
        if (data) {
            state.myWishList = data
        }
    },

    [vuexTypes.SET_APPROVE_STATUS](state, data) {
        state.approveStatus = data
    },

    [vuexTypes.SET_MINT_STATUS](state, data) {
            state.mintStatus = data
    },

    [vuexTypes.SET_BURN_STATUS](state, data) {
            state.burnStatus = data
    },

    [vuexTypes.SET_PRODUCT_DETAIL](state, data) {
        if (data) {
            state.responseProductDetail = data
        }
    },

    [vuexTypes.SET_POPULAR_CATEGORIES](state, data) {
        if (data) {
            state.responsePopularCategories = data
        }
    },

    [vuexTypes.SET_LIMITED_EDITION](state, data) {
        if (data) {
            state.responseLimitedEdition = data
        }
    },

    [vuexTypes.SET_NFT_MARKETPLACE](state, data) {
        if (data) {
            state.responseNftMarketplace = data
        }
    },
}

export const actions = {
    async [vuexTypes.NCM_API_PRE_ORDER]({commit}, params) {
        const response = await callers.ncmApiPreOrder(
            params.productId,
            params.productPriceId,
            params.quantity,
            params.currency,
            params.totalPrice
        )

        commit(vuexTypes.SET_DATA_PRE_ORDER, response)
    },

    async [vuexTypes.NCM_API_BUY_ORDER]({commit}, params) {
        const response = await callers.ncmApiBuy(
            params.productId,
            params.productPriceId,
            params.quantity
        )
        commit(vuexTypes.SET_DATA_BUY_ORDER, response)
    },

    async [vuexTypes.NCM_API_MINT_MY_PRE_ORDER]({commit}, params) {
        const responseMint = await callers.claimOrder(params.orderList)
        commit(vuexTypes.SET_DATA_MINT_ORDER, responseMint)
    },

    async [vuexTypes.NCM_API_REDEEM_MY_NFT]({commit}, params) {
        const responseBurn = await callers.burnNFT(
            params.tokenId,
            params.fullName,
            params.phoneNumber,
            params.email,
            params.address,
            params.province,
            params.district,
            params.postcode,
            params.platform,
            params.saveAddress,
            params.shipping,
            params.product_price_id,
            params.total_price,
            params.currency
        )

        commit(vuexTypes.SET_DATA_REDEEM_ORDER, responseBurn)
        const response = await callers.getNftListOwner(1, 1)

        commit(vuexTypes.SET_MY_NFT_LIST, response.my_nft)
        commit(vuexTypes.SET_PRE_ORDER_LIST, response.pre_order)

        const responseMyProfile = await callers.getMyProfile(store.getters[vuexTypes.metamaskAccount])
        commit(vuexTypes.SET_DATA_MY_ADDRESS, responseMyProfile.address)
    },

    async [vuexTypes.DETECT_MY_NFT_LIST]({commit}, params) {
        const response = await callers.getNftListOwner(params.pageType, params.page, params.order)

        commit(vuexTypes.SET_MY_NFT_LIST, response.my_nft)
        commit(vuexTypes.SET_PRE_ORDER_LIST, response.pre_order)

    },

    async [vuexTypes.DETECT_HISTORY_LIST]({commit}, params) {
        const response = await callers.getHistoryList(params.pageType, params.page, params.filter, params.order)

        commit(vuexTypes.SET_HISTORY_PHYSICAL_LIST, response.physical)
        commit(vuexTypes.SET_HISTORY_DIGITAL_LIST, response.digital)
    },

    async [vuexTypes.DETECT_ACTIVITY_LIST]({commit}, params) {
        const response = await callers.getActivityList(
            params.page,
            params.filter,
            params.order
        )
        commit(vuexTypes.SET_ACTIVITY_LIST, response.activity)
    },

    async [vuexTypes.MY_PROFILE]({commit}) {
        const response = await callers.getMyProfile(store.getters[vuexTypes.metamaskAccount])

        if (response !== undefined) {
            commit(vuexTypes.SET_DATA_MY_PROFILE, response.profile)
            commit(vuexTypes.SET_DATA_MY_ADDRESS, response.address)
        }
    },

    async [vuexTypes.EDIT_MY_PROFILE]({commit}, params) {
        const response = await callers.editMyProfile(store.getters[vuexTypes.metamaskAccount],
            params.username,
            params.avatar,
            params.email,
            params.update_avatar)
        commit(vuexTypes.SET_DATA_MY_PROFILE, response.profile)
    },

    async [vuexTypes.EDIT_MY_ADDRESS]({commit}, params) {
        const response = await callers.editMyAddress(store.getters[vuexTypes.metamaskAccount],
            params.email,
            params.fullName,
            params.phoneNumber,
            params.address,
            params.province,
            params.district,
            params.postcode)
        commit(vuexTypes.SET_DATA_MY_ADDRESS, response.address)
    },

    async [vuexTypes.AUTHENTICATOR_NFT]({commit}, params) {
        const response = await callers.getAuthenticator(params.contract, params.tokenId)
        commit(vuexTypes.SET_DATA_AUTHENTICATOR_NFT, response)
    },

    async [vuexTypes.SUBSCRIBE_PRODUCT]({commit}, params) {
        const response = await callers.subscribeProduct(params.email)
        // commit(vuexTypes.SET_DATA_SUBSCRIBE_PRODUCT, response)
    },

    async [vuexTypes.SEND_EMAIL_CONTACT_US]({commit}, params) {
        await callers.sendEmailContactUs(params.fullName, params.email, params.companyName, params.message)
    },

    async [vuexTypes.NCM_API_PRODUCT_WISHLIST]({commit}, params) {
        const myWishList = store.getters[vuexTypes.myWishList]
        if (params.remove || myWishList.length == 0 || !myWishList.find(item => item == params.productId)) {
            const response = await callers.setMyWishList(store.getters[vuexTypes.metamaskAccount],
                params.productId,
                params.productPriceId,
            )
            localStorage.setItem('my_wishlist', JSON.stringify(response))
            commit(vuexTypes.SET_MY_WISHLIST, response)
        }

    },

    async [vuexTypes.GET_PRODUCT_DETAIL]({commit}, params) {
        // TODO call api

        const response = {
            "card_presale": {
                "product_id": "316739664b60309bb5a3978a641b0da7",
                "product_price_id": "45664b4db99339d8b91a889d25df3953",
                "price": 0.0067,
                "sale_price": 0.005,
                "currency": "USDC",
                "price_image": "USDC",
                "main_title": "Year Of The Rat Edition",
                "sub_title": "Keyboards",
                "discount": 25,
                "start_data": 1651059667,
                "close_data": 1672505999,
                "thumbnail_image": [
                    "img_slide0.jpeg",
                    "img_slide1.jpeg",
                    "img_slide2.jpeg",
                    "img_slide3.jpeg",
                    "img_slide4.jpeg",
                    "img_slide5.jpeg",
                    "img_slide6.jpeg",
                    "img_slide7.jpeg",
                    "img_slide8.jpeg",
                    "img_slide9.jpeg"
                ],
                "status": 2
            },
            "tab_detail": {
                "overview": {
                    "is_highlight": true,
                    "title": "Uniqueness and more collecting value",
                    "img": "img_limited.png"
                },
                "spec": {
                    "spec": {
                        "product_number": "DKYOTR2020",
                        "structure": "Mechanical structure",
                        "trigger_switch": "Cherry MX mechanical switches",
                        "led": "RGB",
                        "connection_interface": "USB 2.0",
                        "keycap_material": "PBT",
                        "output_key_number": "USB N-Key Rollover",
                        "printing_technology": "Dye-Sublimation",
                        "dimensions": "305 x 105 x 38 mm",
                        "weight": "593g",
                        "origin_of_production": "Taiwan",
                    },
                    "contract": {
                        "contract_address": "0x25534288752Ca9660B94b12d797AB9f8DB041D2B",
                        "token_standard": "ERC-721",
                        "blockchain": "OKC (OKT)",
                    },
                    "note": [
                        "Shipping to Thailand Only"
                    ]
                },
                "download": {
                    "doc_name": "DKYOTR2020",
                    "path": "https://www.duckychannel.com.tw/upload/2021_01_132/20210113111244kej4qqSKW1.pdf"
                }
            },
            "feature_list": [
                {
                    "title": "MATERIAL",
                    "article": "PBT Double-shot seamless",
                    "image": "key_feature_1"
                },
                {
                    "title": "DETAILED",
                    "article": "Dual colors design Non-backlit keycaps",
                    "image": "key_feature_2"
                },
                {
                    "title": "FOCUS",
                    "article": "Sea wave, ocean, blue sky",
                    "image": "key_feature_1"
                },
                {
                    "title": "MATERIAL",
                    "article": "PBT Double-shot seamless",
                    "image": "key_feature_1"
                },
            ]
        }

        commit(vuexTypes.SET_PRODUCT_DETAIL, response)
    },

    async [vuexTypes.GET_POPULAR_CATEGORIES]({commit}) {
        // TODO call api

        const response = {
            "category_list": [
                {
                    "id": "1",
                    "name": "Keyboards",
                    "image": "keyboard.png"
                },
                {
                    "id": "3",
                    "name": "Keycaps",
                    "image": "keycap.png"
                },
                {
                    "id": "4",
                    "name": "Mice",
                    "image": "mice.png"
                },
                {
                    "id": "5",
                    "name": "Peripherals",
                    "image": "peripheral.png"
                }
            ]
        }

        commit(vuexTypes.SET_POPULAR_CATEGORIES, response)
    },

    async [vuexTypes.GET_LIMITED_EDITION]({commit}) {
        // TODO call api

        const response = {
            "limited": [
                {
                    "productId": "316739664b60309bb5a3978a641b0da7",
                    "productPriceId": "45664b4db99339d8b91a889d25df3953",
                    "header": "PRESALE 1",
                    "subHeader": "TBA",
                    "image": "presale_keyboard",
                    "title": "Year Of The Rat Edition",
                    "price": 0.005,
                    "currency": "USDC",
                    "discount": "-25%",
                    "preorder": true,
                    "currentUnit": 100,
                    "totalUnit": 200,
                    "startData": 1651059667,
                    "closeData": 1672505999
                },
                {
                    "productId": "316739664b60309bb5a3978a641b0da7",
                    "productPriceId": "9fc02b71db7c3a578ff882872904b67c",
                    "header": "PRESALE 2",
                    "subHeader": "TBA",
                    "image": "presale_keyboard",
                    "title": "Year Of The Rat Edition",
                    "price": 0.0818,
                    "currency": "USDC",
                    "discount": "-20%",
                    "preorder": true,
                    "currentUnit": 0,
                    "totalUnit": 200,
                    "startData": 1672534800,
                    "closeData": 1680224400
                },
                {
                    "productId": "316739664b60309bb5a3978a641b0da7",
                    "productPriceId": "fb9532fe44543bddb2464176c17867c8",
                    "header": "PRESALE 3",
                    "subHeader": "TBA",
                    "image": "presale_keyboard",
                    "title": "Year Of The Rat Edition",
                    "price": 0.0918,
                    "currency": "USDC",
                    "discount": "-15%",
                    "preorder": true,
                    "currentUnit": 0,
                    "totalUnit": 200,
                    "startData": 1680310800,
                    "closeData": 1682902800
                },
                {
                    "productId": "316739664b60309bb5a3978a641b0da7",
                    "productPriceId": "705bd45ec6423242b045976a40e49fd7",
                    "header": "PRESALE 4",
                    "subHeader": "TBA",
                    "image": "presale_keyboard",
                    "title": "Year Of The Rat Edition",
                    "price": 0.1018,
                    "currency": "USDC",
                    "discount": "-10%",
                    "preorder": true,
                    "currentUnit": 0,
                    "totalUnit": 200,
                    "startData": 1682902800,
                    "closeData": 1685494800
                },
                {
                    "productId": "316739664b60309bb5a3978a641b0da7",
                    "productPriceId": "8bf767bc440635908860bd1f264cf6ab",
                    "header": "PRESALE 5",
                    "subHeader": "TBA",
                    "image": "presale_keyboard",
                    "title": "Year Of The Rat Edition",
                    "price": 0.1218,
                    "currency": "USDC",
                    "discount": "-8%",
                    "preorder": true,
                    "currentUnit": 0,
                    "totalUnit": 200,
                    "startData": 1685581200,
                    "closeData": 1688086800
                },
                {
                    "productId": "316739664b60309bb5a3978a641b0da7",
                    "productPriceId": "d1a4743d66e63d439b0057278114d31d",
                    "header": "PRESALE 6",
                    "subHeader": "TBA",
                    "image": "presale_keyboard",
                    "title": "Year Of The Rat Edition",
                    "price": 0.1418,
                    "currency": "USDC",
                    "discount": "-5%",
                    "preorder": true,
                    "currentUnit": 0,
                    "totalUnit": 200,
                    "startData": 1688173200,
                    "closeData": 1690678800
                }
            ]
        }

        commit(vuexTypes.SET_LIMITED_EDITION, response)
    },

    async [vuexTypes.GET_NFT_MARKETPLACE]({commit}, params) {
        // TODO call api
        // page, category, status, sort by

        const response = {
            "nft_marketplace" : [
                {
                    "product_id": "1",
                    "product_price_id": "1",
                    "product_image": "keycap1.png",
                    "product_name": "Good in Blue",
                    "category_id": 2,
                    "category": "Keycaps",
                    "price": "0.0620",
                    "price_image": "OKT.svg",
                    "status": 1,
                    "created_at": 1651059667
                },
                {
                    "product_id": "2",
                    "product_price_id": "2",
                    "product_image": "mice1.png",
                    "product_name": "Feather",
                    "category_id": 3,
                    "category": "Mice",
                    "price": "0.0020",
                    "price_image": "OKT.svg",
                    "status": 2,
                    "created_at": 1672505999
                },
                {
                    "product_id": "3",
                    "product_price_id": "3",
                    "product_image": "peripheral1.png",
                    "product_name": "Ducky Premicord",
                    "category_id": 4,
                    "category": "Peripheral",
                    "price": "0.0015",
                    "price_image": "OKT.svg",
                    "status": 2,
                    "created_at": 1682902800
                }
            ]
        }

        commit(vuexTypes.SET_NFT_MARKETPLACE, response)
    },

}

export const getters = {
    [vuexTypes.myNftList]: (state) => state.myNftList,
    [vuexTypes.myWishList]: (state) => state.myWishList,
    [vuexTypes.userModel]: (state) => state.userModel,
    [vuexTypes.userAddress]: (state) => state.userAddress,
    [vuexTypes.responseBuyOrder]: (state) => state.responseBuyOrder,
    [vuexTypes.responseMintOrder]: (state) => state.responseMintOrder,
    [vuexTypes.responseRedeemOrder]: (state) => state.responseRedeemOrder,
    [vuexTypes.responseAuthenticatorNft]: (state) => state.responseAuthenticatorNft,
    [vuexTypes.preorderList]: (state) => state.preorderList,
    [vuexTypes.physicalList]: (state) => state.physicalList,
    [vuexTypes.digitalList]: (state) => state.digitalList,
    [vuexTypes.activityList]: (state) => state.activityList,
    [vuexTypes.approveStatus]: (state) => state.approveStatus,
    [vuexTypes.mintStatus]: (state) => state.mintStatus,
    [vuexTypes.burnStatus]: (state) => state.burnStatus,
    [vuexTypes.responseProductDetail]: (state) => state.responseProductDetail,
    [vuexTypes.responsePopularCategories]: (state) => state.responsePopularCategories,
    [vuexTypes.responseLimitedEdition]: (state) => state.responseLimitedEdition,
    [vuexTypes.responseNftMarketplace]: (state) => state.responseNftMarketplace
}

export default {
    state,
    mutations,
    actions,
    getters,
}
