import {useEffect,useCallback,useState,useMemo} from 'react'
import useGlobal from './useGlobal'
import {getBalanceNumber} from '../utils'
import {getBalance} from '../utils/erc20'
import Web3 from 'web3'
import BigNumber from 'bignumber.js'

export default function useBalabce(pool) {
  const { accounts,networks }  = useGlobal()
  const [loading,setLoading]  = useState(false)
  const [balance,setBalance]  = useState(0)
  
  const getBalanceValue = useCallback( async (pool) => {
    try {
      setLoading(true)
      if (accounts && pool?.provider) {
        const res = pool.currency && pool.currency?.tokenAddress ? await getBalance(pool.provider, pool.currency?.tokenAddress, accounts) : await new Web3(pool.provider).eth.getBalance(accounts)
        const balances = getBalanceNumber(new BigNumber(Number(res)), pool.currency?.decimals)
        setBalance(balances)
      }
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }, [pool])

  useEffect(() => {
    getBalanceValue(pool)
  }, [pool])

  // pools balance
  const [itemLoading,setItemLoading] = useState(false)
  const [poolBalance,setPoolBalance] = useState(0)
  const getPoolBalance = async (item) => {
    // debugger
    const pools = networks.filter(i => i.networkType === item.systemType)[0]
    if (accounts && pools) {
      try {
        setItemLoading(true)
        const res = pools && item.tokenAddress ? await getBalance(pools.provider, item.tokenAddress, accounts) : await new Web3(pools.provider).eth.getBalance(accounts)
        const tokenBalance = getBalanceNumber(new BigNumber(Number(res)), item.decimals)
        setPoolBalance(tokenBalance)
        setItemLoading(false)
      } catch (error) {
        setPoolBalance(0)
      } finally {
        setItemLoading(false)
      }
    }
  }
  return { balance, loading, getBalanceValue, getPoolBalance,poolBalance, itemLoading }
}
