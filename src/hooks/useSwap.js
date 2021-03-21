import { useEffect, useState} from 'react'
import useGlobal from './useGlobal'
import useGetTokenValue from './useGetTokenValue'
import useMidPrice from './useMidPrice'

export default function useSwap() {
  const { poolsList } = useGlobal()
  const { loading:tokenLoading, authorization, approveActions, approveLoading } = useGetTokenValue()
  const {loading: pirceLoading, impactPrice, swapStatus, swapStatusList} = useMidPrice(poolsList)
  const [actions,setActions] = useState(null)
  const [status, setStatus] = useState(null)
  
  const swapStatus = {
    NONE_AMOUNT: "Enter a Amount",
    NONE_FROM_TOKEN: 'Select a Token',
    NONE_TO_TOKEN: 'Select a Token',
    NETWORK_ERROR: 'NetWork Error',
    APPROVE_ING: 'Appove in Pending',
    SWAP_ING: 'Swap in Pending',
    FINDING_PRICE: 'Finding a Best Price',
    WALLET_ERROR: 'Connect Wallet',
    SWAP_OK: 'SWAP NOW',
    SWAP_IMPACT_WARN: 'Swap Anyway',
    SWAP_IMPACT_HIGH: 'Price Impact Too High',
    SWAP_FAILED: 'Swap Failed',
    NONE_BALANCE: 'Insufficient ETH balance',
  }

  useEffect(() => {
    
  }, [poolsList[0].tokenValue,poolsList[1].tokenValue])
  
  return [swapStatus]
}
