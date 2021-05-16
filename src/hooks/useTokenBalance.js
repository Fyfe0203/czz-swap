import { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import useBlock from './useBlock'
import useGlobal from './useGlobal'
import { getBalance } from '../utils/erc20'

const useTokenBalance = ({tokenAddress,abi}) => {
  const { accounts: account } = useGlobal()
  const ethereum = window.ethereum
  const block = useBlock()
  
  return useMemo(async () => {
    if (account && ethereum) {
      const balance = await getBalance({ ethereum, tokenAddress, account, abi })
      return new BigNumber(balance)
    } else {
      return 0
    }
  }, [account, ethereum, block, tokenAddress])
}

export default useTokenBalance
