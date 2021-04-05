import { useEffect, useState, useCallback} from 'react'
import { Token, Route, TokenAmount, Pair} from '@uniswap/sdk'
import { getCreate2Address } from '@ethersproject/address'
import { pack, keccak256 } from '@ethersproject/solidity'
import IUniswapV2Pair from '../abi/IUniswapV2Pair.json'
import useGlobal from './useGlobal'
import Web3 from "web3"

export function getAddress(tokenA, tokenB, factoryAddreaa, initCodeHash) {
  let PAIR_ADDRESS_CACHE = {}
  const tokens = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA] // does safety checks
  if (PAIR_ADDRESS_CACHE?.[tokens[0].address]?.[tokens[1].address] === undefined) {
    PAIR_ADDRESS_CACHE = {
      ...PAIR_ADDRESS_CACHE,
      [tokens[0].address]: {
        ...PAIR_ADDRESS_CACHE?.[tokens[0].address],
        [tokens[1].address]: getCreate2Address(
            factoryAddreaa,
            keccak256(['bytes'], [pack(['address', 'address'], [tokens[0].address, tokens[1].address])]),
            initCodeHash
        )
      }
    }
  }
  return PAIR_ADDRESS_CACHE[tokens[0].address][tokens[1].address]
}

export const fetchPairData = async (tokenA, tokenB, factoryAddress, initCodeHash, provider) => {
  const address = getAddress(tokenA, tokenB, factoryAddress, initCodeHash)
  const infoContract = new Web3(provider)
  const lpContract = new infoContract.eth.Contract(
      IUniswapV2Pair,
      address
  )
  try{
    const result = await lpContract.methods.getReserves().call(null)
    const reserves0 = result[0]
    const reserves1 = result[1]
    const balances = tokenA.sortsBefore(tokenB) ? [reserves0, reserves1] : [reserves1, reserves0]
    return new Pair(new TokenAmount(tokenA, balances[0]), new TokenAmount(tokenB, balances[1]))
  }catch (error) {
    console.log(error)
  }
}
export default function useMidPrice() {
  const { from, to, setButtonText } = useGlobal()
  const [loading, setLoading] = useState(false)
  const [impactPrice, setImpactPrice] = useState(0)
  const [swapStatus, setSwapStatus] = useState(0)

  const fetchPair = async (lp) => {
    const { networkId, currency, czz, weth, provider, factoryAddress, initCodeHash } = lp
    const From = new Token(Number(networkId), currency?.tokenAddress, 18)
    const Eczz = new Token(Number(networkId), czz, 18)
    const WETH = new Token(Number(networkId), weth, 18)
    try {
      const FromPair = await fetchPairData(WETH, From, factoryAddress, initCodeHash, provider)
      const route0 = new Route([FromPair], WETH)
      const ToPair = await fetchPairData(WETH, Eczz, factoryAddress, initCodeHash,  provider)
      const route1 = new Route([ToPair], WETH)
      // console.log(route0)
      // console.log(route0.midPrice.toSignificant(6))
      // console.log(route1.midPrice.toSignificant(6))
      const from_weth =  route0.midPrice.toSignificant(6)
      const eczz_weth = route1.midPrice.toSignificant(6)
      return eczz_weth / from_weth
    } catch (error) {
      console.log(error)
    }
  }
  const fetchPrice = useCallback(async () => {
    // debugger
    if (from.tokenValue) {
      try {
        setLoading(true)
        const ethRes = await fetchPair(from)
        const czzRes = await fetchPair(to)
        const midPrice = ethRes / czzRes
        console.log('midPrice',midPrice)
        const price = Number(((midPrice - to.tokenValue) / midPrice) * 100).toFixed(2)
        setImpactPrice(price)
        changeStatus(price)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      } finally {
        setLoading(false)
      }
    }
  }, [from.tokenValue])

  const swapStatusList = [
    'Swap Now',
    'Swap Anyway',
    'Swap Anyway',
    'Price Impact Too High'
  ]

  const changeStatus = val => {
    let price = Number(val)
    if(price > 15) {
      setSwapStatus(3)
    }else if (price > 5 && price < 15) {
      setSwapStatus(2)
    } else if (price > 3 && price < 5) {
      setSwapStatus(1)
    } else if (price < 3) {
      setSwapStatus(0)
    }
  }

  useEffect(() => {
    fetchPrice()
  }, [from.tokenValue])

  return {loading, impactPrice, swapStatusList, swapStatus}
}

