import { useState, useEffect, useCallback, useRef } from 'react'
import MetaMaskOnboarding from '@metamask/onboarding'
import useGlobal from './useGlobal'
import { formatAddress } from '../utils'

export default function useWallet() {
  const [loading, setLoading] = useState(false)
  const [networkStatus, setNetworkStatus] = useState(false)
  const { wallet, setWallet, poolsList, accounts, updateAccounts } = useGlobal()
  const onboarding = useRef()
  const [isDisabled, setDisabled] = useState(false)

  const ONBOARD_TEXT = 'Click here to install MetaMask!'
  const CONNECT_TEXT = 'Connect'
  const CONNECTED_TEXT = 'Connected'

  const [buttonText, setButtonText] = useState(ONBOARD_TEXT)

  const handleNewAccounts = newAccounts => {
    updateAccounts(newAccounts[0])
  }

  const initAccounts = async() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      const newAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      handleNewAccounts(newAccounts)
      window.ethereum.on('accountsChanged', handleNewAccounts)
    }
  }

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
  
  const connectWallet = async () => {
    try {
      if (MetaMaskOnboarding.isMetaMaskInstalled()) {
        setLoading(true)
        const newAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        handleNewAccounts(newAccounts)
        // setAccounts(newAccounts[0])
        setLoading(false)
      } else {
        onboarding.current.startOnboarding()
      }
    } catch (error) {
      console.warn(error)
    } finally {
      setLoading(false)
    }
  }
  
  // new networks loading
  const [newLoading, setNewLoading] = useState(false)
  
  // wallet new network
  const addEthereum = async (params) => {
    if (window.ethereum) {
      try {
        setNewLoading(true)
        const res = await window.ethereum.request({ method: 'wallet_addEthereumChain', params })
        console.log(res)
      } catch (error) {
        console.log(error)
      } finally {
        setNewLoading(false)
      }
    }
  }

  // init swap wallet
  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum.on('chainChanged', (chainId) => {
        getNetworkAndChainId()
      })
      if (accounts?.length > 0) {
        setButtonText(formatAddress(accounts))
        setDisabled(true)
        onboarding.current?.stopOnboarding()
      } else {
        setButtonText(CONNECT_TEXT)
        setDisabled(false)
      }
    }
  }, [accounts])

  // init connect wallet
  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(handleNewAccounts)
      window.ethereum.on('accountsChanged', handleNewAccounts);
      return () => {
        window.ethereum.off('accountsChanged', handleNewAccounts);
      }
    }
  }, [])

  return {networkStatus,wallet,connectWallet,loading,addEthereum,newLoading,isDisabled,buttonText}
}
