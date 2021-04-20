import { useEffect } from 'react'
import useGlobal from './useGlobal'
import useBalance from './useBalance'
import intl from 'react-intl-universal'

export default function useSwap() {
  const { from, accounts, setState, networks, pools, wallet, to } = useGlobal()
  const { getPoolBalance } = useBalance()

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

  const initSwap = () => {
    const id = window.ethereum.chainId
    const currentNetwork = networks.filter(i => i.chainId === id)
    const fromState = accounts && window.ethereum && id && currentNetwork.length ? currentNetwork[0] : networks[0]
    const currency = pools.filter(i => i.systemType === fromState?.networkType)[0]
    setState({ from: { ...from, ...fromState, currency }, to: {tokenValue:''}, priceStatus:null })
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

  const setNetworksStatus = () => {
    if (from?.chainId && window.ethereum && wallet?.chainId) {
      const status = from?.chainId === wallet?.chainId
      setState({
        networkStatus: status
      })
    }
  }

  useEffect(() => {
    setNetworksStatus()
  }, [from, wallet])

  useEffect(() => {
    initSwap()
    return () => {
      setState({
        from: { tokenValue: '' },
        to: {tokenValue:''}
      })
    }
  }, [])

  // chain change pools need change
  const switchChin = chainId => {
    const currentNetwork = networks.filter(i => i.chainId === chainId)
    const fromValue = from?.tokenValue || ''
    const fromState = accounts && window.ethereum && chainId && currentNetwork.length ? currentNetwork[0] : from
    const currency = currentNetwork.length ? pools.filter(i => i.systemType === fromState?.networkType)[0] : from.currency
    const toState = fromState.chainId === to.chainId ? {} : to
    setState({
      from: { ...fromState, currency,tokenValue:fromValue },
      to: { ...toState, tokenValue: '' },
      networkStatus: fromState.chainId === chainId,
      wallet: {
        ...wallet,
        networkId: parseInt(chainId, 16),
        chainId
      }
    })
  }

  return {status, poolsBalance, switchChin}
}
