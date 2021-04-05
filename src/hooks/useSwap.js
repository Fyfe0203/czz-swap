import { useEffect,useState } from 'react'
import useGlobal from './useGlobal'
import useWallet from './useWallet'

export default function useSwap() {
  const { from, accounts, setState, networks, pools} = useGlobal()
  const { wallet } = useWallet()
  const { chainId } = wallet

  const status = {
    NONE_AMOUNT: "Enter a Amount",
    NONE_TO_TOKEN: 'Select a Token',
    NONE_BALANCE: 'Insufficient balance',
    NONE_NETWORK: 'Unlock Wallet',
    NONE_WALLET: 'Connect Wallet',
    APPROVE: 'Appove',
    APPROVE_ING: 'Approve in Pending',
    SWAP: 'SWAP NOW',
    SWAP_ING: 'Swap in Pending',
    SWAP_IMPACT_WARN: 'Swap Anyway',
    SWAP_IMPACT_HIGH: 'Price Impact Too High',
    FINDING_PRICE_ING: 'Finding a Best Price',
  }

  // Insufficient liquidity for this trade.
  // Insufficient BNB balance

  const initSwap = () => {
    const chainId = window.ethereum?.chainId
    const currentNetwork = networks.filter(i => i.chainId === chainId)
    // debugger
    const fromState = accounts && window.ethereum && chainId ? currentNetwork[0] : networks[0]
    const currency = pools.filter(i=>i.systemType === fromState.networkType)[0]
    setState({ from: {...from,...fromState, currency},networkStatus: fromState.chainId === wallet.chainId})
  }
  useEffect(() => {
    initSwap()
  }, [])

  return {status}
}
