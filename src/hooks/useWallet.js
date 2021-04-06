import { useState, useEffect,  useRef } from 'react'
import MetaMaskOnboarding from '@metamask/onboarding'
import useGlobal from './useGlobal'
import { formatAddress } from '../utils'

export default function useWallet() {
  const { setState, from, wallet, accounts, updateAccounts } = useGlobal()
  const [loading, setLoading] = useState(false)
  const onboarding = useRef()
  const ONBOARD_TEXT = 'Click here to install MetaMask!'
  const CONNECT_TEXT = 'Connect'
  const [buttonText, setButtonText] = useState(ONBOARD_TEXT)
  var storage = window.localStorage

  const handleNewAccounts = newAccounts => {
    updateAccounts(newAccounts[0])
    storage.setItem('address',newAccounts[0])
  }

  const handlenNewChainId = chainId => {
    setState({
      wallet: {
        ...wallet,
        networkId: parseInt(chainId, 16),
        chainId
      },
      networkStatus:chainId === from.chainId
    })
  }

  const initWallet = () => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined' && MetaMaskOnboarding.isMetaMaskInstalled() && storage.getItem('address')) {
      window.ethereum.request({ method: 'eth_accounts' }).then(accounts => {
        handleNewAccounts(accounts)
        handlenNewChainId(window.ethereum.chainId)
      })
      window.ethereum.on('chainIdChanged', handlenNewChainId)
      window.ethereum.on('chainChanged', handlenNewChainId)
      window.ethereum.on('accountsChanged', handleNewAccounts)
      window.ethereum.on('connect', () => {
        console.log('connect')
      })
      window.ethereum.on('disconnect', () => {
        console.log('wallet disconnect')
      })
      window.ethereum.on('message', message => {
        console.log('wallet message', message)
      })
      window.ethereum.on('notification', message => {
        console.log('wallet notification', message)
      })
      return () => {
        window.ethereum.off('accountsChanged', handleNewAccounts)
      }
    }
  }
  // network chainchange
  
  const disConnect = async () => {
    if (window.ethereum.on) { 
      await window.ethereum.request({
        method: "eth_requestAccounts",
        params: [
          {
            eth_accounts: {}
          }
        ]
      })
      storage.removeItem('address')
      setState({
        accounts: null,
        wallet: {},
      })
    }
  }

  const connectWallet = async () => {
    try {
      if (MetaMaskOnboarding.isMetaMaskInstalled()) {
        setLoading(true)
        const newAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        handleNewAccounts(newAccounts)
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
  const addEthereum = async (pool = from) => {
    const { chainId, rpcUrls, networkName: chainName, decimals, explorerUrl, symbolName, currency} = pool
    const nativeCurrency = { name:symbolName, decimals, symbol:symbolName }
    const params = [{
      chainId,
      rpcUrls: [rpcUrls],
      chainName,
      nativeCurrency,
      blockExplorerUrls: [explorerUrl],
    }]
    // debugger
    console.log(params)
    if (window.ethereum) {
      try {
        setNewLoading(true)
        const res = await window.ethereum.request({ method: 'wallet_addEthereumChain', params })
        watchAsset(currency)
        console.log(res)
      } catch (error) {
        console.log(error)
      } finally {
        setNewLoading(false)
      }
    }
  }

  // watch walletAsset token
  const watchAsset = async (pool) => {
    const { symbol, tokenAddress:address, decimals} = pool
    const options = {
      address,
      symbol,
      decimals,
      image:'https://cryptologos.cc/logos/global-social-chain-gsc-logo.svg'
    }
    try {
      const success = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options
        },
        id: Math.round(Math.random() * 100000),
      })
      if (success) {
        console.log(`${symbol} successfully added to wallet!`)
      } else {
        throw new Error('Something went wrong.')
      }
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts?.length > 0) {
        setButtonText(formatAddress(accounts))
        onboarding.current?.stopOnboarding()
      } else {
        setButtonText(CONNECT_TEXT)
      }
    }
  }, [accounts])

  useEffect(() => {
    initWallet()
  }, [from])

  return {connectWallet,loading,addEthereum,newLoading,buttonText,disConnect}
}
