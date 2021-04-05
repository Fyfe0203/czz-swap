import pools from './pools'
import networks from './networks'

const state = {
  theme: 1,
  accounts: null,
  walletBalance: null,
  pools,
  networks,
  networkStatus:false,
  pending: [],
  wallet: {},
  from: {tokenValue:''},
  to: {tokenValue:''},
  swapSetting: {
    router:null,
    tolerance:null,
    gas:null,
    deadline:null
  },
}
export default state
