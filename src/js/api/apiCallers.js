import {attachJsonApiUnpacker,} from './apiInterceptors'
import store from '@/store'
import {vuexTypes} from '@/store/modules/types'

export function makeApiCallers(axios, axiosForm) {
    const url = process.env.VUE_APP_API_URL
    const api = _cloneAxios(axios);
    const ethers = require('ethers');
    const chain = {
        binance: process.env.VUE_APP_BINANCE_CHANCE,
        polygon: process.env.VUE_APP_POLYGON_CHANCE,
        okc: process.env.VUE_APP_OKC_CHANCE
    };
    const currentChain = chain.okc;
    const contractAddressERC721 = process.env.VUE_APP_CONTRACT_ADDRESS_ERC721;
    const contractAddressERC20 = process.env.VUE_APP_CONTRACT_ADDRESS_ERC20;
    const receiverAddress = process.env.VUE_APP_RECEIVER_ADDRESS;
    const metaURI = process.env.VUE_APP_META_URI;
    const chainName = process.env.VUE_APP_CHAIN_NAME;
    const chainEnvironment = process.env.VUE_APP_CHAIN_ENV;
    const chainScanURI = process.env.VUE_APP_SCAN_URL;
    const chainScanEnvironment = process.env.VUE_APP_SCAN_ENV;
    const waitApproveTime = parseInt(process.env.VUE_APP_WAIT_APPROVE_TIME);
    const waitMintTime = parseInt(process.env.VUE_APP_WAIT_MINT_TIME);

    attachJsonApiUnpacker(api);
    return {
        async getClientContract(address) {
            const abi = [
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "approved",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "Approval",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "operator",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "bool",
                            "name": "approved",
                            "type": "bool"
                        }
                    ],
                    "name": "ApprovalForAll",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "previousOwner",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "newOwner",
                            "type": "address"
                        }
                    ],
                    "name": "OwnershipTransferred",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": false,
                            "internalType": "address",
                            "name": "account",
                            "type": "address"
                        }
                    ],
                    "name": "Paused",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "_sender",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "_receiver",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "bool",
                            "name": "_res",
                            "type": "bool"
                        }
                    ],
                    "name": "SignerBurn",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "_sender",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "_receiver",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "bool",
                            "name": "_res",
                            "type": "bool"
                        }
                    ],
                    "name": "SignerMint",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "from",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "Transfer",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": false,
                            "internalType": "address",
                            "name": "account",
                            "type": "address"
                        }
                    ],
                    "name": "Unpaused",
                    "type": "event"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "approve",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "bytes",
                            "name": "_signurate",
                            "type": "bytes"
                        },
                        {
                            "internalType": "bytes32",
                            "name": "_mHash",
                            "type": "bytes32"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_price",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256[]",
                            "name": "_tokenIds",
                            "type": "uint256[]"
                        },
                        {
                            "internalType": "string",
                            "name": "_nonce",
                            "type": "string"
                        }
                    ],
                    "name": "burnBySignature",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "bytes",
                            "name": "_signurate",
                            "type": "bytes"
                        },
                        {
                            "internalType": "bytes32",
                            "name": "_mHash",
                            "type": "bytes32"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_price",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256[]",
                            "name": "_tokenIds",
                            "type": "uint256[]"
                        },
                        {
                            "internalType": "string",
                            "name": "_uri",
                            "type": "string"
                        }
                    ],
                    "name": "mintBySignature",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "renounceOwnership",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "from",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "safeTransferFrom",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "from",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bytes",
                            "name": "_data",
                            "type": "bytes"
                        }
                    ],
                    "name": "safeTransferFrom",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "_address",
                            "type": "address"
                        }
                    ],
                    "name": "setAddressERC20",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "operator",
                            "type": "address"
                        },
                        {
                            "internalType": "bool",
                            "name": "approved",
                            "type": "bool"
                        }
                    ],
                    "name": "setApprovalForAll",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "_buri",
                            "type": "string"
                        }
                    ],
                    "name": "setBaseURI",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "setPause",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "_address",
                            "type": "address"
                        }
                    ],
                    "name": "setRecipientWallet",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "_signer",
                            "type": "address"
                        }
                    ],
                    "name": "setSinger",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "from",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "transferFrom",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "newOwner",
                            "type": "address"
                        }
                    ],
                    "name": "transferOwnership",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "unsetPause",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "_name",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "_symbol",
                            "type": "string"
                        },
                        {
                            "internalType": "address",
                            "name": "_erc20Address",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "_recipientWallet",
                            "type": "address"
                        },
                        {
                            "internalType": "string",
                            "name": "_buri",
                            "type": "string"
                        },
                        {
                            "internalType": "address",
                            "name": "_signer",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "a",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "b",
                            "type": "string"
                        }
                    ],
                    "name": "appendString",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "pure",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                        }
                    ],
                    "name": "balanceOf",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "erc20Address",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "getApproved",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "_owner",
                            "type": "address"
                        }
                    ],
                    "name": "getTokensOfOwner",
                    "outputs": [
                        {
                            "internalType": "uint256[]",
                            "name": "",
                            "type": "uint256[]"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "operator",
                            "type": "address"
                        }
                    ],
                    "name": "isApprovedForAll",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "name",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "owner",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "ownerOf",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "paused",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "recipientWallet",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "signerManager",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "bytes4",
                            "name": "interfaceId",
                            "type": "bytes4"
                        }
                    ],
                    "name": "supportsInterface",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "symbol",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "index",
                            "type": "uint256"
                        }
                    ],
                    "name": "tokenByIndex",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "index",
                            "type": "uint256"
                        }
                    ],
                    "name": "tokenOfOwnerByIndex",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "_tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "tokenURI",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "totalSupply",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "_sender",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_price",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "_tokenId",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "_nonce",
                            "type": "string"
                        },
                        {
                            "internalType": "bytes32",
                            "name": "_msgHash",
                            "type": "bytes32"
                        }
                    ],
                    "name": "VerifyNonce",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "pure",
                    "type": "function"
                }
            ];
            await window.ethereum.request({method: 'eth_requestAccounts'});
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(address, abi, signer);
            const feeData = await provider.getFeeData();
            return {
                contract: contract,
                gas: feeData.gasPrice
            };
        },

        async getClientContractERC20(address) {
            const abi = [
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: true,
                            internalType: 'address',
                            name: 'owner',
                            type: 'address',
                        },
                        {
                            indexed: true,
                            internalType: 'address',
                            name: 'spender',
                            type: 'address',
                        },
                        {
                            indexed: false,
                            internalType: 'uint256',
                            name: 'value',
                            type: 'uint256',
                        },
                    ],
                    name: 'Approval',
                    type: 'event',
                },
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: true,
                            internalType: 'address',
                            name: '_receiver',
                            type: 'address',
                        },
                        {
                            indexed: true,
                            internalType: 'address',
                            name: '_nft',
                            type: 'address',
                        },
                        {
                            indexed: false,
                            internalType: 'uint256',
                            name: '_tokenId',
                            type: 'uint256',
                        },
                    ],
                    name: 'MysteryBoxClaimed',
                    type: 'event',
                },
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: true,
                            internalType: 'address',
                            name: 'from',
                            type: 'address',
                        },
                        {
                            indexed: true,
                            internalType: 'address',
                            name: 'to',
                            type: 'address',
                        },
                        {
                            indexed: false,
                            internalType: 'uint256',
                            name: 'value',
                            type: 'uint256',
                        },
                    ],
                    name: 'Transfer',
                    type: 'event',
                },
                {
                    inputs: [
                        {
                            internalType: 'address',
                            name: 'owner',
                            type: 'address',
                        },
                        {
                            internalType: 'address',
                            name: 'spender',
                            type: 'address',
                        },
                    ],
                    name: 'allowance',
                    outputs: [
                        {
                            internalType: 'uint256',
                            name: '',
                            type: 'uint256',
                        },
                    ],
                    stateMutability: 'view',
                    type: 'function',
                },
                {
                    inputs: [
                        {
                            internalType: 'address',
                            name: 'spender',
                            type: 'address',
                        },
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                    ],
                    name: 'approve',
                    outputs: [
                        {
                            internalType: 'bool',
                            name: '',
                            type: 'bool',
                        },
                    ],
                    stateMutability: 'nonpayable',
                    type: 'function',
                },
                {
                    inputs: [
                        {
                            internalType: 'address',
                            name: 'account',
                            type: 'address',
                        },
                    ],
                    name: 'balanceOf',
                    outputs: [
                        {
                            internalType: 'uint256',
                            name: '',
                            type: 'uint256',
                        },
                    ],
                    stateMutability: 'view',
                    type: 'function',
                },
                {
                    inputs: [],
                    name: 'claim',
                    outputs: [],
                    stateMutability: 'nonpayable',
                    type: 'function',
                },
                {
                    inputs: [],
                    name: 'decimals',
                    outputs: [
                        {
                            internalType: 'uint8',
                            name: '',
                            type: 'uint8',
                        },
                    ],
                    stateMutability: 'pure',
                    type: 'function',
                },
                {
                    inputs: [
                        {
                            internalType: 'address',
                            name: 'spender',
                            type: 'address',
                        },
                        {
                            internalType: 'uint256',
                            name: 'subtractedValue',
                            type: 'uint256',
                        },
                    ],
                    name: 'decreaseAllowance',
                    outputs: [
                        {
                            internalType: 'bool',
                            name: '',
                            type: 'bool',
                        },
                    ],
                    stateMutability: 'nonpayable',
                    type: 'function',
                },
                {
                    inputs: [],
                    name: 'getPricePerBox',
                    outputs: [
                        {
                            internalType: 'uint256',
                            name: '',
                            type: 'uint256',
                        },
                    ],
                    stateMutability: 'view',
                    type: 'function',
                },
                {
                    inputs: [
                        {
                            internalType: 'address',
                            name: 'spender',
                            type: 'address',
                        },
                        {
                            internalType: 'uint256',
                            name: 'addedValue',
                            type: 'uint256',
                        },
                    ],
                    name: 'increaseAllowance',
                    outputs: [
                        {
                            internalType: 'bool',
                            name: '',
                            type: 'bool',
                        },
                    ],
                    stateMutability: 'nonpayable',
                    type: 'function',
                },
                {
                    inputs: [
                        {
                            internalType: 'uint256',
                            name: '_count',
                            type: 'uint256',
                        },
                    ],
                    name: 'mint',
                    outputs: [],
                    stateMutability: 'nonpayable',
                    type: 'function',
                },
                {
                    inputs: [],
                    name: 'name',
                    outputs: [
                        {
                            internalType: 'string',
                            name: '',
                            type: 'string',
                        },
                    ],
                    stateMutability: 'view',
                    type: 'function',
                },
                {
                    inputs: [],
                    name: 'symbol',
                    outputs: [
                        {
                            internalType: 'string',
                            name: '',
                            type: 'string',
                        },
                    ],
                    stateMutability: 'view',
                    type: 'function',
                },
                {
                    inputs: [
                        {
                            internalType: 'address',
                            name: 'recipient',
                            type: 'address',
                        },
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                    ],
                    name: 'transfer',
                    outputs: [
                        {
                            internalType: 'bool',
                            name: '',
                            type: 'bool',
                        },
                    ],
                    stateMutability: 'nonpayable',
                    type: 'function',
                },
                {
                    inputs: [
                        {
                            internalType: 'address',
                            name: 'sender',
                            type: 'address',
                        },
                        {
                            internalType: 'address',
                            name: 'recipient',
                            type: 'address',
                        },
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                    ],
                    name: 'transferFrom',
                    outputs: [
                        {
                            internalType: 'bool',
                            name: '',
                            type: 'bool',
                        },
                    ],
                    stateMutability: 'nonpayable',
                    type: 'function',
                },
            ];
            await window.ethereum.request({method: 'eth_requestAccounts'});
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(address, abi, signer);
            const feeData = await provider.getFeeData();
            return {
                contract: contract,
                gas: feeData.gasPrice
            };
        },

        async verifyTxReceiptStatus(transactionHash) {
            let apiUrl = chainScanURI + '/api/explorer/v1/' + chainScanEnvironment + '/transactions/'+ transactionHash;

            return await axios.get(apiUrl).then(response => {
                return {
                    success: response.status,
                    data: [],
                    tx: response.statusText,
                };
            }).catch(e => {
                if (e.code === 4001 || (e.code === -32603)) {
                    return {
                        success: false,
                        data: [],
                        error: e,
                    };
                }
            });

        },

        async ncmApiPreOrder(productId, productPriceId, quantity, currency, totalPrice) {
            const transfer = await this.transferERC20(totalPrice);

            if (!transfer.success) return transfer;
            const config = {
                headers: {Authorization: store.getters[vuexTypes.accountAuthentication]}
            };
            const response = await axios.post(url + '/api/buy_pre_order', {
                product_id: productId,
                product_price_id: productPriceId,
                quantity: quantity,
                currency: currency,
            }, config)

            return response.data
        },

        async ncmApiBuy(productId, productPriceId, quantity) {

            if (currentChain !== store.getters[vuexTypes.metamaskChain]) {
                const requestChangeChain = await this.changeChain(currentChain)
                if (!requestChangeChain.success) return requestChangeChain;
            }

            let result = [];
            let resultSuccess = false;
            let redeemableDate = 0;

            const config = {
                headers: {Authorization: store.getters[vuexTypes.accountAuthentication]}
            };

            const response = await axios.post(url + '/api/signature_mint_buy', {
                product_id: productId,
                product_price_id: productPriceId,
                quantity: quantity,
                uri: metaURI
            }, config)

            if (response.data.success) {
                let resultData = response.data.data;
                let res = await this.mintWithSignature(resultData.token_list, resultData.signature, resultData.nonce_hash, resultData.nonce, resultData.total_price);
                if (!res.status) {
                    return {
                        success: res.status,
                        error: res.error,
                    };
                }

                let responseMint = await axios.post(url + '/api/mint_batch', {
                    token_list: resultData.token_list,
                    product_id: productId,
                    product_price_id: productPriceId,
                    tx_hash: res.transaction_hash,
                    signature: resultData.signature,
                    status_mint: res.status,
                }, config);

                resultSuccess = responseMint.data.success;
                redeemableDate = responseMint.data.data.redeemable_date;
                result.push(responseMint.data.data);
            }

            return {
                success: resultSuccess,
                redeemableDate: redeemableDate,
                data: result,
            };
        },

        async transferERC20(totalPrice) {
            if (currentChain !== store.getters[vuexTypes.metamaskChain]) {
                const requestChangeChain = await this.changeChain(currentChain)
                if (!requestChangeChain.success) return requestChangeChain;
            }

            const contractAddress = "0x33EB9e81ec4c333c549BA5444cCa99eb55111335";
            const contractClient = await this.getClientContractERC20(contractAddress);
            let tx = {
                gasPrice: contractClient.gas
            };

            let total = ethers.utils.parseEther(totalPrice.toString());

            let result = await contractClient.contract.transfer(receiverAddress, total, tx).then(res => {
                return {
                    success: true,
                    data: [],
                    tx: res,
                };
            }).catch(e => {
                if (e.code === 4001 || (e.code === -32603)) {
                    return {
                        success: false,
                        data: [],
                        error: e,
                    };
                }
            });

            return result;
        },

        async approveTransferERC20(price) {
            if (currentChain !== store.getters[vuexTypes.metamaskChain]) {
                const requestChangeChain = await this.changeChain(currentChain)
                if (!requestChangeChain.success) return requestChangeChain;
            }

            store.commit(vuexTypes.SET_APPROVE_STATUS, 1)

            const contractClient = await this.getClientContractERC20(contractAddressERC20);
            let tx = {
                gasPrice: contractClient.gas
            };

            let totalPrice = ethers.utils.parseEther(price.toString());

            let result = await contractClient.contract.approve(contractAddressERC721, totalPrice, tx).then(async res => {
                await new Promise(resolve => setTimeout(resolve, waitApproveTime));
                store.commit(vuexTypes.SET_APPROVE_STATUS, 2)
                return {
                    success: true,
                    data: [],
                    tx: res,
                };
            }).catch(e => {
                store.commit(vuexTypes.SET_APPROVE_STATUS, 3)
                if (e.code === 4001 || (e.code === -32603)) {
                    return {
                        success: false,
                        data: [],
                        error: e,
                    };
                }
            });

            return result;
        },

        // pageType: 1 => All 2 => Preorder 3 => MyNft
        async getNftListOwner(pageType, page, order) {
            let jsonPreorderResults = []
            let jsonMyNFTResults = []
            let preorderList = [];
            let myNFTList = [];
            let idPreorder = 1;
            let idMyNFT = 1;
            let apiUrl = url + '/api/order_list';
            const config = {
                headers: {Authorization: store.getters[vuexTypes.accountAuthentication]},
                params: {page_type: pageType, page: page, per_page: 12, chain: chainName, environment: chainEnvironment, order: order}
            };

            await axios.get(apiUrl, config).then(response => {
                if (response.data.success) {
                    const resultOrderData = response.data.data.preorder.list;
                    const resultMyNftData = response.data.data.myNft.list;
                    const orderTotalpage = response.data.data.preorder.total_page != undefined ? response.data.data.preorder.total_page : 1
                    const orderCurrenpage = response.data.data.preorder.current_page != undefined ? response.data.data.preorder.current_page : 1
                    const myNftTotalpage = response.data.data.myNft.total_page != undefined ? response.data.data.myNft.total_page : 1
                    const myNftCurrenpage = response.data.data.myNft.current_page != undefined ? response.data.data.myNft.current_page : 1
                    const myNftTotal = response.data.data.myNft.total_count != undefined ? response.data.data.myNft.total_count : 0
                    const orderTotal = response.data.data.preorder.total_count != undefined ? response.data.data.preorder.total_count : 0

                    for (let index in resultOrderData) {
                        let jsonPreorderResult = {
                            id: idPreorder,
                            title: resultOrderData[index].productName,
                            image: resultOrderData[index].productImage,
                            stack: parseInt(resultOrderData[index].amount),
                            info: false,
                            gift: false,
                            discount: "",
                            preorder: true,
                            is_claim: true,
                            claim_in: parseInt(resultOrderData[index].claimableData),
                            status_name: "Claimable in",
                            price: parseFloat(resultOrderData[index].pricePerUnit),
                            currency: "USDC",
                            btn_name: "Claim",
                            redeemable: "Status",
                            standard: "Standard",
                            type: resultOrderData[index].productTypeName,
                            btn_disabled: false,
                            contract_type: 0,
                            token_id: 0,
                            order_id: resultOrderData[index].orderUid,
                            product_id: resultOrderData[index].productId,
                            product_price_id: resultOrderData[index].productPriceId,
                            publisher: "Limited Chinese Zodiac Series",
                        }
                        idPreorder++;
                        jsonPreorderResults.push(jsonPreorderResult)
                    }

                    preorderList = {
                        list: jsonPreorderResults,
                        total_page: orderTotalpage,
                        current_page: orderCurrenpage,
                        total: orderTotal,
                        is_empty: response.data.data.preorder.total_page == undefined
                    }

                    for (let index in resultMyNftData) {
                        let jsonMyNFTResult = {
                            id: idMyNFT,
                            title: resultMyNftData[index].productName,
                            image: resultMyNftData[index].productImage,
                            stack: parseInt(resultMyNftData[index].stack),
                            info: false,
                            gift: false,
                            discount: "",
                            preorder: false,
                            is_claim: false,
                            claim_in: parseInt(resultMyNftData[index].redeemableDate),
                            status_name: "Redeemable in",
                            price: parseFloat(resultMyNftData[index].pricePerUnit),
                            currency: "USDC",
                            btn_name: "Redeem",
                            redeemable: "Status",
                            standard: "Standard",
                            type: resultMyNftData[index].productTypeName,
                            btn_disabled: false,
                            contract_type: 0,
                            token_id: resultMyNftData[index].tokenId,
                            order_id: resultMyNftData[index].orderUid,
                            product_id: resultMyNftData[index].productId,
                            product_price_id: resultMyNftData[index].productPriceId,
                            publisher: "Limited Chinese Zodiac Series",
                        }
                        idMyNFT++;
                        jsonMyNFTResults.push(jsonMyNFTResult)
                    }

                    myNFTList = {
                        list: jsonMyNFTResults,
                        total_page: myNftTotalpage,
                        current_page: myNftCurrenpage,
                        total: myNftTotal,
                        is_empty: response.data.data.myNft.total_page == undefined
                    }

                }
            }).catch(err => {
                return new Promise(resolve => {
                    setTimeout(() => {
                        // eslint-disable-next-line no-console
                        // console.error(err)
                        resolve('resolved');
                    }, 2000);
                });
            })

            return {
                pre_order: preorderList,
                my_nft: myNFTList
            };
        },

        // pageType: 1 => Physical 2 => Digital
        async getHistoryList(pageType, page, filter, order) {
            let jsonPhysicalResults = []
            let jsonDigitalResults = []
            let digitalList = [];
            let physicalList = [];
            let idPhysical = 1;
            let idDigital = 1;
            let apiUrl = url + '/api/redeem_history';
            const config = {
                headers: {Authorization: store.getters[vuexTypes.accountAuthentication]},
                params: {page_type: pageType, page: page, per_page: 5, filter: filter, order: order}
            };

            await axios.get(apiUrl, config).then(response => {
                if (response.data.success) {
                    const resultPhysicalData = response.data.data.physical.list;
                    const resultDigitalData = response.data.data.digital.list;
                    const digitalTotalpage = response.data.data.digital.total_page != undefined ? response.data.data.digital.total_page : 1
                    const digitalCurrenpage = response.data.data.digital.current_page != undefined ? response.data.data.digital.current_page : 1
                    const physicalTotalpage = response.data.data.physical.total_page != undefined ? response.data.data.physical.total_page : 1
                    const physicalCurrenpage = response.data.data.physical.current_page != undefined ? response.data.data.physical.current_page : 1
                    const physicalTotal = response.data.data.physical.total_count != undefined ? response.data.data.physical.total_count : 0
                    const digitalTotal = response.data.data.digital.total_count != undefined ? response.data.data.digital.total_count : 0

                    for (let index in resultPhysicalData) {
                        let jsonPhysicalResult = {
                            id: idPhysical,
                            order_id: resultPhysicalData[index].orderId,
                            order_name: resultPhysicalData[index].productName,
                            publisher: resultPhysicalData[index].publisher,
                            token_id: resultPhysicalData[index].tokenId,
                            image: resultPhysicalData[index].product_image,
                            is_lucky_draw: resultPhysicalData[index].isLuckyDraw,
                            platform: resultPhysicalData[index].platform,
                            type: resultPhysicalData[index].type,
                            status: resultPhysicalData[index].status,
                            date: resultPhysicalData[index].redeemableDate,
                            detailsShowing: false,
                            tracking_number: 123456,
                            tracking_history: resultPhysicalData[index].status,
                            delivery: {
                                send_by: "Kerry",
                                address: resultPhysicalData[index].address,
                            },
                        }
                        idPhysical++;
                        jsonPhysicalResults.push(jsonPhysicalResult)
                    }
                    physicalList = {
                        list: jsonPhysicalResults,
                        total_page: physicalTotalpage,
                        current_page: physicalCurrenpage,
                        total: physicalTotal,
                        // is_empty: response.data.data.preorder.total_page == undefined
                    }
                    for (let index in resultDigitalData) {
                        let jsonDigitalResult = {
                            id: idDigital,
                            order_id: 20114578268,
                            order_name: resultDigitalData[index].productName,
                            publisher: "Limited Chinese Zodiac Series",
                            token_id: resultDigitalData[index].tokenId,
                            image: resultDigitalData[index].product_image,
                            is_lucky_draw: resultDigitalData[index].isLuckyDraw,
                            type: resultDigitalData[index].type,
                            status: resultDigitalData[index].status,
                            date: resultDigitalData[index].redeemableDate,
                            detailsShowing: true
                        }
                        idDigital++;
                        jsonDigitalResults.push(jsonDigitalResult)
                    }

                    digitalList = {
                        list: jsonDigitalResults,
                        total_page: digitalTotalpage,
                        current_page: digitalCurrenpage,
                        total: digitalTotal,
                        // is_empty:  response.data.data.myNft.total_page == undefined
                    }

                }
            }).catch(err => {
                return new Promise(resolve => {
                    setTimeout(() => {
                        // eslint-disable-next-line no-console
                        // console.error(err)
                        resolve('resolved');
                    }, 2000);
                });
            })

            return {
                physical: physicalList,
                digital: digitalList
            };
        },

        async getActivityList(page, filter, order) {
            let jsonActivityResults = []
            let activityList = [];
            let idActivity = 1;
            let apiUrl = url + '/api/activity';
            const config = {
                headers: {Authorization: store.getters[vuexTypes.accountAuthentication]},
                params: {page: page, per_page: 10, filter: filter, order: order}
            };

            await axios.get(apiUrl, config).then(response => {
                if (response.data.success) {
                    const resultActivityData = response.data.data.list;
                    const activityTotalpage = response.data.data.total_page != undefined ? response.data.data.total_page : 1
                    const activityCurrenpage = response.data.data.current_page != undefined ? response.data.data.current_page : 1
                    const activityTotal = response.data.data.total_count != undefined ? response.data.data.total_count : 0

                    for (let index in resultActivityData) {
                        let jsonActivityResult = {
                            id: idActivity,
                            status: resultActivityData[index].status,
                            from: resultActivityData[index].from,
                            to: resultActivityData[index].to,
                            price: resultActivityData[index].price,
                            date: resultActivityData[index].date,
                            currency: resultActivityData[index].currency
                        }
                        idActivity++;
                        jsonActivityResults.push(jsonActivityResult)
                    }
                    activityList = {
                        list: jsonActivityResults,
                        total_page: activityTotalpage,
                        current_page: activityCurrenpage,
                        total: activityTotal
                    }
                }
            }).catch(err => {
                return new Promise(resolve => {
                    setTimeout(() => {
                        // eslint-disable-next-line no-console
                        // console.error(err)
                        resolve('resolved');
                    }, 2000);
                });
            })

            return {
                activity: activityList
            };
        },

        async burnNFT(tokenId, fullName, phoneNumber, email, address, province, district, postcode, platform, saveAddress, shipping, productPriceId, totalPrice, currency) {

            if (currentChain !== store.getters[vuexTypes.metamaskChain]) {
                const requestChangeChain = await this.changeChain(currentChain)
                if (!requestChangeChain.success) return requestChangeChain;
            }

            let result = [];
            let resultSuccess = false;

            const config = {
                headers: {Authorization: store.getters[vuexTypes.accountAuthentication]}
            };

            const response = await axios.post(url + '/api/signature_burn_claim', {
                token_list: [tokenId],
                price: totalPrice,
            }, config)

            if (response.data.success) {
                let resultData = response.data.data;
                let res = await this.burnWithSignature(resultData.token_list, resultData.signature, resultData.nonce_hash, resultData.nonce, resultData.total_price);
                if (!res.status) {
                    return {
                        success: res.status,
                        error: res.error,
                    };
                }

                let responseBurn = await axios.post(url + '/api/claim', {
                    token_id: tokenId,
                    full_name: fullName,
                    email: email,
                    phone_number: phoneNumber,
                    address: address,
                    province: province,
                    district: district,
                    postcode: postcode,
                    save_address: saveAddress,
                    platform_game: platform,
                    tx_hash_burn: res.transaction_hash,
                    status_burn: res.status,
                    product_price_id: productPriceId,
                    total_price: totalPrice,
                    currency: currency
                }, config)

                resultSuccess = responseBurn.data.success;
                result.push(responseBurn.data.data);
            }

            return {
                success: resultSuccess,
                data: result,
            };

        },

        async claimOrder(orderList) {

            if (currentChain !== store.getters[vuexTypes.metamaskChain]) {
                const requestChangeChain = await this.changeChain(currentChain)
                if (!requestChangeChain.success) return requestChangeChain;
            }

            let result = [];
            let resultSuccess = false;
            let redeemableDate = 0;

            const config = {
                headers: {Authorization: store.getters[vuexTypes.accountAuthentication]}
            };

            const response = await axios.post(url + '/api/signature_mint', {
                order_list: orderList,
                uri: metaURI
            }, config);

            if (response.data.success) {
                let resultData = response.data.data;

                let res = await this.mintWithSignature(resultData.token_list, resultData.signature, resultData.nonce_hash, resultData.nonce, resultData.total_price);

                if (!res.status) {
                    return {
                        success: res.status,
                        error: res.error,
                    };
                }

                let responseMint = await axios.post(url + '/api/mint', {
                    order_uid: resultData.order_uid,
                    token_id: resultData.token_id,
                    tx_hash: res.transaction_hash,
                    signature: resultData.signature,
                    status_mint: res.status,
                }, config);

                resultSuccess = responseMint.data.success;
                redeemableDate = responseMint.data.data.redeemable_date;
                result.push(responseMint.data.data);
            }

            return {
                success: resultSuccess,
                redeemableDate: redeemableDate,
                data: result,
            };
        },

        async mintWithSignature(tokenList, signature, nonceHash, nonce, price) {

            if (currentChain !== store.getters[vuexTypes.metamaskChain]) {
                const requestChangeChain = await this.changeChain(currentChain)
                if (!requestChangeChain.success) return requestChangeChain;
            }

            const approveTransfer = await this.approveTransferERC20(price);

            if (!approveTransfer.success) return approveTransfer;

            store.commit(vuexTypes.SET_MINT_STATUS, 1)

            const contractClient = await this.getClientContract(contractAddressERC721);
            let tx = {
                gasPrice: contractClient.gas
            };
            let totalPrice = ethers.utils.parseEther(price.toString());

            let data = await contractClient.contract.mintBySignature(signature.toString().trim(), nonceHash.toString().trim(), totalPrice, tokenList, nonce, tx)
                .then(async res => {
                    await new Promise(resolve => setTimeout(resolve, waitMintTime));
                    store.commit(vuexTypes.SET_MINT_STATUS, 2)
                    return {
                        status: true,
                        transaction_hash: res.hash,
                    };

                }).catch(e => {
                    store.commit(vuexTypes.SET_MINT_STATUS, 3)
                    if (e.code === 4001 || (e.code === -32603)) {
                        return {
                            status: false,
                            error: e.code,
                        };
                    }
                });

            return data;

        },

        async burnWithSignature(tokenList, signature, nonceHash, nonce, price) {

            if (currentChain !== store.getters[vuexTypes.metamaskChain]) {
                const requestChangeChain = await this.changeChain(currentChain)
                if (!requestChangeChain.success) return requestChangeChain;
            }

            const approveTransfer = await this.approveTransferERC20(price);

            if (!approveTransfer.success) return approveTransfer;

            store.commit(vuexTypes.SET_BURN_STATUS, 1)

            const contractClient = await this.getClientContract(contractAddressERC721);
            let tx = {
                gasPrice: contractClient.gas
            };
            let totalPrice = ethers.utils.parseEther(price.toString());
            let data = await contractClient.contract.burnBySignature(signature.toString().trim(), nonceHash.toString().trim(), totalPrice, tokenList, nonce, tx)
                .then(res => {
                    store.commit(vuexTypes.SET_BURN_STATUS, 2)
                    return {
                        status: true,
                        transaction_hash: res.hash,
                    };

                }).catch(e => {
                    store.commit(vuexTypes.SET_BURN_STATUS, 3)
                    if (e.code === 4001 || (e.code === -32603)) {
                        return {
                            status: false,
                            error: e.code,
                        };
                    }
                });

            return data;

        },

        async getMyProfile(wallet) {
            let results = []
            let apiUrl = url + '/api/my'
            if (wallet) {
                const config = {
                    headers: {Authorization: store.getters[vuexTypes.accountAuthentication]}
                };
                await axios.get(apiUrl, config).then(response => {
                    if (response.data.success) {
                        results = response.data.data;
                    }
                }).catch(err => {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            // eslint-disable-next-line no-console
                            // console.error(err)
                            resolve('resolved');
                        }, 2000);
                    });
                })
                return results;
            }

        },

        async editMyProfile(wallet, username, avatar, email, updateAvatar) {
            let results = []
            let apiUrl = url + '/api/profile/edit'
            const config = {
                headers: {Authorization: store.getters[vuexTypes.accountAuthentication]}
            };
            if (wallet) {
                let formData = new FormData();
                formData.append('name', username)
                formData.append("avatar", avatar);
                formData.append("email", email);
                formData.append("update_avatar", updateAvatar);
                await axiosForm.post(apiUrl, formData, config)
                    .then(response => {
                        if (response.data.success) {
                            results = response.data.data;
                        }
                    }).catch(err => {
                        return new Promise(resolve => {
                            setTimeout(() => {
                                // eslint-disable-next-line no-console
                                console.error(err)
                                resolve('resolved');
                            }, 2000);
                        });
                    })
                return results;
            }
        },

        async editMyAddress(wallet, email, fullName, phoneNumber, address, province, district, postcode) {
            let results = []
            let apiUrl = url + '/api/profile/address/edit'
            const config = {
                headers: {Authorization: store.getters[vuexTypes.accountAuthentication]}
            };
            if (wallet) {
                await axios.post(apiUrl, {
                    email: email,
                    full_name: fullName,
                    phone_number: phoneNumber,
                    address: address,
                    province: province,
                    district: district,
                    postcode: postcode,
                }, config).then(response => {
                    if (response.data.success) {
                        results = response.data.data;
                    }
                }).catch(err => {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            // eslint-disable-next-line no-console
                            console.error(err)
                            resolve('resolved');
                        }, 2000);
                    });
                })
                return results;
            }
        },

        async getAuthenticator(contract, tokenId) {
            let results = []
            let environment = 'test';
            let apiUrl = url + '/authenticator_nft/' + contract + '/' + tokenId + '/' + chainName + '/' + chainEnvironment;
            if (contract && tokenId > 0) {
                await axios.get(apiUrl).then(response => {
                    if (response.data.success) {
                        results = response.data.data;
                    }
                }).catch(err => {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            // eslint-disable-next-line no-console
                            console.error(err)
                            resolve('resolved');
                        }, 2000);
                    });
                })
                return results;
            } else {
                return {
                    authenticator: false,
                    name: '',
                    owner: ''
                };
            }

        },

        async changeChain(chain) {
            return await store.dispatch(vuexTypes.REQUEST_METAMASK_CHAIN_CHANGE, chain).then(res => {
                return {
                    success: res,
                    data: {},
                };

            }).catch(e => {
                if (e.code === 4001 || (e.code === -32603)) {
                    return {
                        success: false,
                        error: e,
                    };
                }
            });

        },

        async subscribeProduct(email) {
            let results = []
            let apiUrl = url + '/subscribe'
            if (email) {
                await axios.post(apiUrl, {
                    email: email,
                }).then(response => {
                    if (response.data.success) {
                        results = response.data.data;
                    }
                }).catch(err => {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            // eslint-disable-next-line no-console
                            console.error(err)
                            resolve('resolved');
                        }, 2000);
                    });
                })
                return results;
            }
        },

        async sendEmailContactUs(fullName, email, companyName, message) {
            let apiUrl = url + '/contact/send_mail'
            await axios.post(apiUrl, {
                email: email,
                full_name: fullName,
                message: message,
                company_name: companyName
            })
        },

        async ncmApiLogin(wallet) {
            let results = []
            let apiUrl = url + '/login/' + wallet
            if (wallet) {
                await axios.get(apiUrl).then(response => {
                    if (response.data.success) {
                        results = response.data.data;
                    }
                }).catch(err => {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            // eslint-disable-next-line no-console
                            console.error(err)
                            resolve('resolved');
                        }, 2000);
                    });
                })
                return results;
            }

        },

        async ncmApiVerifyLogin(wallet, signature) {
            let results = []
            let apiUrl = url + '/verify/login'
            if (wallet) {
                await axios.post(apiUrl, {
                    wallet_address: wallet,
                    signature: signature,
                }).then(response => {
                    if (response.data.success) {
                        results = response.data;
                    }
                }).catch(err => {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            // eslint-disable-next-line no-console
                            console.error(err)
                            resolve('resolved');
                        }, 2000);
                    });
                })
                return results;
            }

        },

        async getMyWishList(wallet, filter, page, limit) {
            let results = []
            let apiUrl = url + '/api/product/wishlist?'
            if (filter) {
                apiUrl = apiUrl + 'order=' + filter + '&'
            }
            if (page) {
                apiUrl = apiUrl + 'page=' + page + '&'
            }
            if (limit) {
                apiUrl = apiUrl + 'per_page=' + limit + '&'
            }
            if (wallet) {
                const config = {
                    headers: {Authorization: store.getters[vuexTypes.accountAuthentication]}
                };
                await axios.get(apiUrl, config).then(response => {
                    if (response.data.success) {
                        results = response.data.data.list;
                    }
                }).catch(err => {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            // eslint-disable-next-line no-console
                            console.error(err)
                            resolve('resolved');
                        }, 2000);
                    });
                })
                return results;
            }
        },

        async setMyWishList(wallet, productId, productPriceId) {
            let results = []
            let apiUrl = url + '/api/product/wishlist'
            if (wallet) {
                const config = {
                    headers: {Authorization: store.getters[vuexTypes.accountAuthentication]}
                };
                await axios.post(apiUrl, {
                    product_id: productId,
                    product_price_id: productPriceId,
                }, config).then(response => {
                    if (response.data.success) {
                        results = response.data.data;
                    }
                }).catch(err => {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            // eslint-disable-next-line no-console
                            console.error(err)
                            resolve('resolved');
                        }, 2000);
                    });
                })
                return results;
            }
        },

    }
}

function _cloneAxios(axios) {
    return axios.create()
}
