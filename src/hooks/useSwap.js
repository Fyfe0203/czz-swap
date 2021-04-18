import { useEffect } from 'react'
import useGlobal from './useGlobal'
import useBalance from './useBalance'
import intl from 'react-intl-universal'

export default function useSwap() {
  const { from, accounts, setState, networks, pools, wallet } = useGlobal()
  const { getPoolBalance } = useBalance()
  const { chainId } = wallet

  const status = {
    NONE_AMOUNT: "Enter a Amount",
    NONE_TO_TOKEN: 'Select a Token',
    NONE_BALANCE: 'Insufficient balance',
    NONE_NETWORK: 'Unlock Wallet',
    NONE_WALLET: intl.get('ConnectWallet'),
    APPROVE: 'Appove',
    APPROVE_ING: 'Approve in Pending',
    SWAP: intl.get('SWAPNOW'),
    SWAP_ING: 'Swap in Pending',
    SWAP_IMPACT_WARN: intl.get('SwapAnyway'),
    SWAP_IMPACT_HIGH: intl.get('PriceImpactTooHigh'),
    FINDING_PRICE_ING: intl.get('FindingaBestPrice'),
    SWITCH_ING: 'Swich Network in Pending',
    NONE_TRADE:'Insufficient liquidity for this trade.',
  }

  // Insufficient liquidity for this trade.
  // Insufficient BNB balance

  const initSwap = async () => {
    const id = chainId || window.ethereum?.chainId
    // debugger
    const currentNetwork = networks.filter(i => i.chainId === id)
    const fromState = accounts && window.ethereum && id && currentNetwork.length ? currentNetwork[0] : networks[0]
    const currency = pools.filter(i => i.systemType === fromState?.networkType)[0]
    setState({ from: { ...from, ...fromState, currency }, networkStatus: fromState.chainId === id})
  }

  const poolsBalance = () => {
    let lpList = Array.from(pools)
    if (accounts) { 
      lpList.forEach(async (item, index) =>{
        try {
          const items = await getPoolBalance(item)
          lpList.splice(index, 1, { ...items, loading: false })
        } catch (error) {
          throw error
        }
      })
      setState({
        pools: lpList
      })
    }
  }

  useEffect(() => {
    initSwap()
    // poolsBalance()
  }, [])


  return {status,poolsBalance}
}
