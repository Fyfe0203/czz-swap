import pools from './pools'
import networks from './networks'
import {ABI_ETH, ABI_TOKEN as MASTER_ABI, ABI_HECO, ABI_BSC} from '../abi'
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
  from: {tokenValue:''},
  to: {},
  swapSetting: {
    router:null,
    tolerance:null,
    gas:null,
    deadline:null
  },
  poolsList: [{}, {}],
}
export default state
