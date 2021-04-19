import Web3 from 'web3'
import { ABI_ETH, ABI_HECO, ABI_BSC } from '../abi'

const networks = [
  {
    networkName:'ETH',
    networkType:'ETH',
    symbolName: 'ETH',
    tokenValue: '',
    abi:ABI_ETH,
    symbol: null,
    currency: null,
    networkId: "1",
    chainId: '0x1',
    ntype:1,
    decimals:18,
    swaprouter: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    factoryAddress:   "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    initCodeHash: "0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f",
    router: "0x9AC88c5136240312f8817dBB99497aCe62b03F12",
    weth: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    czz: '0x150BbCfF6b1B4D528b48f1A300585Dea0b6490B6',
    explorerUrl: 'https://etherscan.io/',
    rpcUrls:'https://cloudflare-eth.com/',
    provider: new Web3.providers.HttpProvider("https://cloudflare-eth.com/"),
    image:'https://cryptologos.cc/logos/ethereum-eth-logo.svg'
  },
  {
    networkName: 'HECO',
    networkType:'HECO',
    symbolName: 'HT',
    tokenValue: '',
    abi:ABI_HECO,
    networkId:"128",
    chainId: '0x80',
    ntype:2,
    decimals:18,
    symbol: null,
    currency: null,
    swaprouter: "0xED7d5F38C79115ca12fe6C0041abb22F0A06C300",
    factoryAddress:   "0xb0b670fc1F7724119963018DB0BfA86aDb22d941",
    initCodeHash: "0x2ad889f82040abccb2649ea6a874796c1601fb67f91a747a80e08860c73ddf24",
    router: "0x711D839CD1E6E81B971F5b6bBB4a6BD7C4B60Ac6",
    weth: '0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f',
    czz:'0x112489c758D405874e9Ece0586FD50B315216fcA',
    explorerUrl:'https://hecoinfo.com/',
    rpcUrls:'https://http-mainnet.hecochain.com',
    provider: new Web3.providers.HttpProvider("https://http-mainnet.hecochain.com"),
    image:'https://cryptologos.cc/logos/huobi-token-ht-logo.svg'
  },
  {
    networkName: 'BSC',
    networkType:'BSC',
    symbolName: 'BNB',
    tokenValue: '',
    abi:ABI_BSC,
    networkId:"56",
    chainId:'0x38',
    ntype: 3,
    decimals:18,
    symbol: null,
    currency: null,
    swaprouter: "0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F",
    factoryAddress:   "0xBCfCcbde45cE874adCB698cC183deBcF17952812",
    initCodeHash: "0xd0d4c4cd0848c93cb4fd1f498d7013ee6bfb25783ea21593d5834f5d250ece66",
    router: "0x007c98F9f2c70746a64572E67FBCc41a2b8bba18",
    weth: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    czz:'0x2Fb9376cFf6fb7f5fe99665aE1Ec2FdDD5099134',
    explorerUrl:'https://bscscan.com/',
    rpcUrls:'https://bsc-dataseed1.ninicoin.io',
    provider: new Web3.providers.HttpProvider("https://bsc-dataseed1.ninicoin.io"),
    image:'https://cryptologos.cc/logos/binance-coin-bnb-logo.svg'
  }
]
export default networks
