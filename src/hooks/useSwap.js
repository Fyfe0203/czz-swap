import { useEffect } from 'react'
import useGlobal from './useGlobal'
import useWallet from './useWallet'

export default function useSwap() {
  const { from, accounts, setState, networks } = useGlobal()
  const { wallet } = useWallet()
  const { networkId } = wallet
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
  
  const initSwap = () => {
    const currentNetwork =  networks.filter(i => i.networkId === networkId)
    const fromState = accounts && networkId ? currentNetwork : networks[0]
    debugger
    // const symbol = accounts ? 
    setState({ from: {...from,...fromState} })
  }

  useEffect(() => {
    initSwap()
  }, [])
  
  return [swapStatus]
}
