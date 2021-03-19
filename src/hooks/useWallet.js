import {useState,useEffect,useCallback} from 'react'
import useGlobal from './useGlobal'
export default function useWallet() {
  const [networkStatus, setNetworkStatus] = useState(false)
  const [loading, setLoading] = useState(false)
  const { wallet, setWallet, poolsList, accounts } = useGlobal()

  // network chainchange
  const getNetworkAndChainId = useCallback( async () => {
    try {
      const chainId = await window.ethereum.request({
        method: 'eth_chainId',
      })
      const networkId = await window.ethereum.request({
        method: 'net_version',
      })
      setWallet({chainId, networkId})
    } catch (err) {
      console.error(err)
    }
  }, [accounts])
  
  const listenWallet = () => {
    window.ethereum.on('chainChanged', (chainId) => {
      getNetworkAndChainId()
    })
  }

  const connectWallet = async () => {
    try {
      setLoading(true)
      const res = await window.ethereum.request({ method: 'eth_requestAccounts' })
      setWallet({accounts:res[0]})
    } catch (error) {
      console.warn(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    listenWallet()
  }, [accounts,window.ethereum])
  
  return {networkStatus,wallet,connectWallet,loading}
}
