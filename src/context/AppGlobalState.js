import React, { useReducer, useEffect } from 'react'
import initState from './AppState'
import appReducer from './AppReducer'
import appActions from './AppActions'
import Web3 from 'web3'
export const AppContext = React.createContext(initState)
  
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer,initState)
  const actions = appActions(state, dispatch)
  
  const initSwap = async() => { 
    let web3Provider
    if (window.ethereum) {
      web3Provider = window.ethereum
      try {
        window.ethereum.enable()
      } catch (error) {
        console.error("User denied account access")
      }
    } else if (window.web3) {
      web3Provider = window.web3.currentProvider
      console.log("MetaMask Legacy dapp browsers")
    }
    try {
      let provider = new Web3()
      provider.setProvider(web3Provider)
      const accounts = await provider.eth.getAccounts()
      actions.updateAccounts(accounts[0])
      actions.setProvider(provider)
    } catch (err) { 
      console.log('error',err)
    }
   
  }
  useEffect(() => {
    initSwap()
  }, [window.ethereum])

  return (
    <AppContext.Provider value={{...state, ...actions, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}
