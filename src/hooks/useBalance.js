import {useEffect,useCallback,useState} from 'react'
import useGlobal from './useGlobal'
import {getBalanceNumber} from '../utils'
import {getBalance} from '../utils/erc20'
import Web3 from 'web3'
import BigNumber from 'bignumber.js'

export default function useBalabce(pool) {
  const { accounts }  = useGlobal()
  const [loading,setLoading]  = useState(false)
  const [balance,setBalance]  = useState(0)
  
  const balanceGet = useCallback( async (pool) => {
    try {
      setLoading(true)
      if (accounts && pool.provider) {
        const res = pool.currency && pool.currency?.tokenAddress ? await getBalance(pool.provider, pool.currency?.tokenAddress, accounts) : await new Web3(pool.provider).eth.getBalance(accounts)
        const balances = getBalanceNumber(new BigNumber(Number(res)), pool.currency.decimals)
        setBalance(balances)
      }
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }, [pool])

  useEffect(() => {
    balanceGet(pool)
  },[pool])
  
  return {balance,loading}
}
