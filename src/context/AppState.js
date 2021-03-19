import pools from './pools'
import networks from './networks'
import {ABI_ETH, ABI_TOKEN as MASTER_ABI, ABI_HECO } from '../abi'
import Web3 from 'web3'

const state = {
  theme: 1,
  accounts: null,
  pools,
  walletBalance: null,
  MASTER_ABI,
  networks,
  networkStatus:false,
  pending: [],
  wallet: {},
  swapSetting: {
    router:null,
    tolerance:null,
    gas:null,
    deadline:null
  },
  poolsList: [{
      type: 'ETH',
      tokenValue: '',
      abi:ABI_ETH,
      symbol: null,
      networkId: "3",
      ntype:1,
      swaprouter: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      factoryAddress:   "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
      initCodeHash: "0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f",
      router: "0xabD6bFC53773603a034b726938b0dfCaC3e645Ab",
      weth: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
      czz: '0xa0d786dD929e5207045C8F4aeBe2Cdb4F4885beD',
      explorerUrl:'https://ropsten.etherscan.io/',
      provider:new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/9830cca0dde944d3a0e1100408fed9e4")
    },
    {
      type: 'HECO',
      tokenValue: '',
      abi:ABI_HECO,
      networkId:"256",
      ntype:2,
      symbol: null,
      swaprouter: "0x539A9Fbb81D1D2DC805c698B55C8DF81cbA6b350",
      factoryAddress:   "0x0419082bb45f47Fe5c530Ea489e16478819910F3",
      initCodeHash: "0x06d32be9fe9b1c75a1ce7e2b362c735bcb731596b9330b99412fde52d753e3f0",
      router: "0x034d0162892893e688DC53f3194160f06EBf265E",
      weth: '0xA9e7417c676F70E5a13c919e78FB1097166568C5',
      czz:'0xF8444BF82C634d6F575545dbb6B77748bB1e3e19',
      explorerUrl:'https://testnet.hecoinfo.com/',
      provider:new Web3.providers.HttpProvider("https://http-testnet.hecochain.com/")
    }
  ],
}
export default state
