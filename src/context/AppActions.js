
export default function actions(state, dispatch) {
  console.log('state====',state)
  return {
    toggleTheme() {
     dispatch({
        type: 'TOGGLE_THEME',
      })
    },
    setProvider(payload) {
      dispatch({
        type: 'SET_PROVIDER',
        payload
      })
    },
    setPending(payload) {
      dispatch({
        type: 'SET_PENDING',
        payload
      })
    },
    changePools(payload) {
      dispatch({
        type: 'CHANGE_POOLS',
      })
    },
    updateAccounts(payload){
      dispatch({
        type: 'UPDATE_ACCOUNTS',
        payload
      })
    },
    setWallet(payload){
      dispatch({
        type: 'SET_WALLET',
        payload
      })
    },
    setSwapSetting(payload){
      dispatch({
        type: 'SET_SWAP_SETTING',
        payload
      })
    },
    setPoolsList(payload) {
      // debugger
      dispatch({
        type: 'SET_POOLS_LIST',
        payload
      })
    },
    setState(payload) {
      dispatch({
        type: 'SET_STATE',
        payload
      })
    }
  }
}
