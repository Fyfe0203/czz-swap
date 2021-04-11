import MetaMaskOnboarding from '@metamask/onboarding'
import React, { useEffect,useRef,useState } from 'react'

const ONBOARD_TEXT = 'Click here to install MetaMask!'
const CONNECT_TEXT = 'Connect'
const CONNECTED_TEXT = 'Connected'

export function OnboardingButton() {
  const [buttonText, setButtonText] = useState(ONBOARD_TEXT)
  const [isDisabled, setDisabled] = useState(false)
  const [accounts, setAccounts] = useState([])
  const onboarding = useRef()

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

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        setButtonText(accounts)
        setDisabled(true)
        onboarding.current.stopOnboarding()
      } else {
        setButtonText(CONNECT_TEXT)
        setDisabled(false)
      }
    }
  }, [accounts])

  const handleNewAccounts = newAccounts => {
    setAccounts(newAccounts)
  }

  const initAccounts = async() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      const newAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      handleNewAccounts(newAccounts)
      window.ethereum.on('accountsChanged', handleNewAccounts)
    }
  }

  // init connect wallet
  useEffect(() => {
     if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding()
    }
    initAccounts()
    return () => {
      window.ethereum.off('accountsChanged', handleNewAccounts)
    }
  }, [])

  const onClick = async () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      const newAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      setAccounts(newAccounts)
    } else {
      onboarding.current.startOnboarding()
    }
  }

  return (
    <button disabled={isDisabled} onClick={onClick}>
      {buttonText}
    </button>
  )
}