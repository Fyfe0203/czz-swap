import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import useBlock from './useBlock'
import useGlobal from './useGlobal'
import { getBalance } from '../utils/erc20'

export function useBalance ({tokenAddress,abi}) {
  const [balance, setBalance] = useState(new BigNumber(0))
  const [ethBalance, setEthBalance] = useState(new BigNumber(0))
  const { accounts } = useGlobal()
  const ethereum = window.ethereum
  const block = useBlock()
  const fetchBalance = useCallback(async () => {
    const balance = await getBalance({tokenAddress, accounts, abi})
    setBalance(new BigNumber(balance))
  }, [accounts, tokenAddress])

  useEffect(() => {
    if (account && ethereum) {
      fetchBalance()
    }
  }, [accounts, ethereum, block, tokenAddress])
  return {balance,block}
}
