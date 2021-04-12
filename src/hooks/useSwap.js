import { useEffect } from 'react'
import useGlobal from './useGlobal'
import useBalance from './useBalance'

export default function useSwap() {
  const { from, accounts, setState, networks, pools, wallet } = useGlobal()
  const { getPoolBalance } = useBalance()
  const { chainId } = wallet

  const status = {
    NONE_AMOUNT: "Enter a Amount",
    NONE_TO_TOKEN: 'Select a Token',
    NONE_BALANCE: 'Insufficient balance',
    NONE_NETWORK: 'Switch NetWork',
    NONE_WALLET: 'Connect Wallet',
    APPROVE: 'Appove',
    APPROVE_ING: 'Approve in Pending',
    SWAP: 'SWAP NOW',
    SWAP_ING: 'Swap in Pending',
    SWAP_IMPACT_WARN: 'Swap Anyway',
    SWAP_IMPACT_HIGH: 'Price Impact Too High',
    FINDING_PRICE_ING: 'Finding a Best Price',
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
      pools.forEach(async (item, index) =>{
        lpList.splice(index, 1, { ...item, loading: true })
        try {
          const items = await getPoolBalance(item)
          lpList.splice(index, 1, { ...items, loading: false })
          setState({
            pools: lpList
          })
        } catch (error) {
          throw error
        }
    })
  }

  useEffect(() => {
    initSwap()
    poolsBalance()
  }, [])


  return {status,poolsBalance}
}
