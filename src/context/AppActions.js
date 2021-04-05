
export default function actions(state, dispatch) {
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
    setState(payload) {
      dispatch({
        type: 'SET_STATE',
        payload
      })
    },
    setButtonText(payload) {
      dispatch({
        type: 'SET_BUTTON_TEXT',
        payload
      })
    }
  }
}
