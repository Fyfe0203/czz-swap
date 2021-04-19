import { useState, useEffect,  useRef } from 'react'
import MetaMaskOnboarding from '@metamask/onboarding'
import useGlobal from './useGlobal'
import useSwap from './useSwap'
import { formatAddress } from '../utils'
import intl from 'react-intl-universal'

export default function useWallet() {
  const { setState, from, to, wallet, accounts, updateAccounts, setButtonText } = useGlobal()
  const { switchChin } = useSwap()
  const [loading, setLoading] = useState(false)
  const onboarding = useRef()
  const ONBOARD_TEXT = intl.get('ClickHereToInstallMetaMask')
  const CONNECT_TEXT = 'Connect MetaMask'
  const [buttonText, setWalletButtonText] = useState(ONBOARD_TEXT)
  var storage = window.localStorage

  useEffect(() => {
    if (!onboarding.current) {
    onboarding.current = new MetaMaskOnboarding()
  }
  }, [])
  
  const handleNewAccounts = newAccounts => {
    updateAccounts(newAccounts[0])
    storage.setItem('address',newAccounts[0])
  }

  const handlenNewChainId = chainId => {
    console.log('chainId', chainId)
    setState({
      wallet: {
        ...wallet,
        networkId: parseInt(chainId, 16),
        chainId
      },
      networkStatus:chainId === from.chainId
    })
    // initSwap()
  }

  // init wallet
  const initWallet = () => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined' && MetaMaskOnboarding.isMetaMaskInstalled() && storage.getItem('address')) {
      window.ethereum.request({ method: 'eth_accounts' }).then(accounts => {
        handleNewAccounts(accounts)
        handlenNewChainId(window.ethereum.chainId)
      })
      window.ethereum.on('chainIdChanged', (chainId) => {
        console.log('chainIdChanged',chainId)
      })
      window.ethereum.on('chainChanged',switchChin)
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
      const state = {
        accounts: null,
        wallet: {},
      }
      setState(state)
      return state
    }
  }

  // connect wallet
  const connectWallet = async () => {
    try {
      if (MetaMaskOnboarding.isMetaMaskInstalled()) {
        setLoading(true)
        const newAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        handleNewAccounts(newAccounts)
        setLoading(false)
        return newAccounts
      } else {
        onboarding.current.startOnboarding()
      }
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }
  
  // switch networks
  const [switchLoading,setSwitchLoading] = useState(false)
  const [networkNode, setNetworkNode] = useState({})

  const getNetworkNode = () => {
    const {  chainId, rpcUrls, networkName: chainName, decimals, explorerUrl, symbolName } = from
    // debugger
    const nativeCurrency = { name: symbolName, decimals, symbol: symbolName }
    return {
      chainId,
      rpcUrls: [rpcUrls],
      chainName,
      nativeCurrency,
      blockExplorerUrls: [explorerUrl],
    }
  }
  
  useEffect(() => {
    if (from.currency) setNetworkNode(getNetworkNode())
  }, [from.currency])
  
  // wallet new network
  const addEthereum = async (pool = from) => {
    const item = getNetworkNode()
    const params = [item]
    const chinIdSwitch = [
      {
        chainId:pool.chainId
      }
    ]
    // debugger
    if (window.ethereum) {
      try {
        setSwitchLoading(true)
        setButtonText('SWITCH_ING')
        const res = pool.chainId === '0x1' || pool.chainId === '0x3' || pool.chainId === '0x4' 
          ? await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: chinIdSwitch })
        : await window.ethereum.request({ method: 'wallet_addEthereumChain', params })
        setButtonText('SWAP')
        const { currency } = pool
        setState({networkStatus: true})
        watchAsset(currency)
        return res
      } catch (error) {
        setButtonText('NONE_NETWORK')
        throw error
      } finally {
        setSwitchLoading(false)
      }
    }
  }

  // watch walletAsset token
  const watchAsset = async (pool) => {
    const { symbol, tokenAddress: address, decimals, image } = pool
    // debugger
    const options = {
      address,
      symbol,
      decimals,
      image
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
        setWalletButtonText(formatAddress(accounts))
        onboarding.current?.stopOnboarding()
      } else {
        setWalletButtonText(CONNECT_TEXT)
      }
    }
  }, [accounts])

  useEffect(() => {
    initWallet()
  }, [])

  return {connectWallet,loading,addEthereum,switchLoading,buttonText,disConnect,networkNode}
}
