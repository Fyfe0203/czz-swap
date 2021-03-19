import Web3 from 'web3'
import { ABI_ETH, ABI_HECO } from '../abi'

const networks = [
  {
    networkName:'ETH Ropsten',
    symbol:'ETH',
    chainId: '0x3',
    networkId: 3,
    abi:ABI_ETH,
    explorerUrl:'https://ropsten.etherscan.io/',
    router: "0x69d0904680A1D7142F06321E46fF4d207784562D",
    weth: '0x533c65434b96c533ae5A5590516303B8b7A2bB3B',
    czz:'0xd25b078A0c4B60C52f8f6D5620eeea94284Bef7A',
    provider:new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/9830cca0dde944d3a0e1100408fed9e4")
  },
  {
    networkName: 'HECO Test',
    symbol:'HT',
    abi:ABI_HECO,
    explorerUrl:'https://testnet.hecoinfo.com/',
    chainId: '0x100',
    networkId: 256,
    router: "0xf1e41979540BC776b2Fe8961f4C17E81Bf03894e",
    weth: '0x11D89c7966db767F2c933E7F1E009CD740b03677',
    czz: '0xE30d43717DB115D2f205acCfeCedec67aDfDE089',
    provider: new Web3.providers.HttpProvider("https://http-testnet.hecochain.com/"),
  },
  {
    networkName: 'BSC',
    symbol:'BSC',
    abi:ABI_HECO,
    explorerUrl:'https://testnet.hecoinfo.com/',
    chainId:'0x2',
    networkId: 2,
    router: "0xf1e41979540BC776b2Fe8961f4C17E81Bf03xxxx",
    weth: '0x11D89c7966db767F2c933E7F1E009CD740b0xxxx',
    czz: '0xE30d43717DB115D2f205acCfeCedec67aDfDxxxx',
    provider: new Web3.providers.HttpProvider("https://http-testnet.hecochain.com/"),
  }
]
export default networks