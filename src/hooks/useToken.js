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
    if (provider && address) {
      try {
        const res = await getToken({ provider, address })
        return res
      } catch (error) {
        debugger
        setLoading(false)
      } finally {
        setToken({})
        setLoading(false)
      }
    } else {
      setToken({})
      setLoading(false)
    }
  }

  const searchToken = async ({ current, tokenAddress }) => {
    try {
      setToken({})
      setLoading(true)
      const { provider, networkType } = current
      const address = isAddress(tokenAddress)
      if (tokenList[networkType]) {
        const tokenResult = tokenList[networkType].filter(i => i.address === address)
        if (tokenResult.length > 0) {
          setToken({ ...tokenResult[0], custom: true, systemType: networkType, image: tokenResult[0]?.logoURI })
        } else {
          const res = await findToken({ provider, address })
          setToken( { ...res, systemType: networkType, custom: true, image: null })
        }
      }
    } finally {
      setLoading(false)
    }
  }

  return {isAddress, token, setToken, loading, searchToken}
}
