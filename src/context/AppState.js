import pools from './pools'
import networks from './networks'

const state = {
  theme: 1,
  accounts: null,
  walletBalance: null,
  pools,
  networks,
  networkStatus:true,
  showConnectWallet:false,
  pending: [],
  wallet: {},
  balanceStatus: true,
  from: {tokenValue:''},
  to: { tokenValue: '' },
  priceStatus: 0,
  impactPrice: 0,
  explorer:{
    ETH:'View on Etherscan',
    BSC:'View on Hecoscan',
    HECO:'View on Binancescan'
  },
  swapSetting: {
    router:null,
    tolerance:null,
    gas:null,
    deadline:null
  },
  links:[
    // {name: 'White Paper', link: 'http://docs.classzz.com/czz-whitepaper-v1.3.pdf',ico:'book-open'},
    {name: 'White Paper', link: 'https://docs.classzz.com/czz.whitepaper.v4.pdf',ico:'book-open'},
    {name: 'Github', link: 'https://github.com/classzz',ico:'github'},
    {name: 'Telegram', link: 'https://t.me/classzzoffical',ico:'send'},
    {name: 'Twitter', link: 'https://www.twitter.com/class_zz',ico:'twitter'},
    // { name: 'CZZ Audit', link: 'https://docs.classzz.com/CZZ_audit.pdf',ico:'shield' },
    // { name: 'CZZ Audit 2.0', link: 'https://docs.classzz.com/CZZ_audit 2.0.pdf',ico:'archive' },
    { name: 'CzzClub', link: 'http://czz.club', ico: 'message-square' },
    { name: 'CZZ Explorer', link: 'http://explorer.classzz.com', ico: 'globe' },
  ]
}
export default state
