import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import useBlock from './useBlock'
import useGlobal from './useGlobal'
import { getBalance } from '../utils/erc20'

const useTokenBalance = ({tokenAddress,abi}) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { accounts: account } = useGlobal()
  const ethereum = window.ethereum
  const block = useBlock()
  const fetchBalance = useCallback(async () => {
    const balance = await getBalance({ethereum, tokenAddress, account, abi})
    setBalance(new BigNumber(balance))
  }, [account, ethereum, tokenAddress])

  useEffect(() => {
    if (account && ethereum) {
      fetchBalance()
    }
  }, [account, ethereum, block, tokenAddress])

  return balance
}

export default useTokenBalance
