import { useState } from 'react'
import { getAddress } from '@ethersproject/address'
import { getToken } from '../utils/erc20'
import HECO from '../constants/token/heco.json'
import BSC from '../constants/token/bsc.json'
import ETH from '../constants/token/eth.json'

export default function useToken() {
  // const { pools } = useGlobal()
  const isAddress = (value) => {
    try {
      return getAddress(value)
    } catch {
      return false
    }
  }
  const [token,setToken] = useState({})
  const [loading, setLoading] = useState(false)
  const tokenList = { HECO, BSC, ETH }
  // const activeAction = item => {
  //   setToken(pools.some(i=>i.tokenAddress === item?.address))
  // }

  const findToken = async ({ provider, address }) => {
    try {
      setLoading(true)
      const res = await getToken({ provider, address })
      setToken(res)
      return res
    } catch (error) {
      setToken(null)
    } finally {
      setLoading(false)
    }
  }
  const searchToken = async ({ current, tokenAddress }) => { 
    const { provider,networkType } = current
    const address = isAddress(tokenAddress)
    if (tokenList[networkType]) {
      const tokenResult = tokenList[networkType].filter(i => i.address === address)
      if (tokenResult.length > 0) {
        setToken(tokenResult[0])
      } else {
        findToken({provider,address})
      }
    } else {
      findToken({provider,address})
    }
  }

  return {isAddress, token, setToken, loading, searchToken}
}
