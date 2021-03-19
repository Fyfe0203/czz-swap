

export default function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
      ...state,
      theme: state.theme === 0 ? 1 : 0
    }
    case 'UPDATE_ACCOUNTS':
      return {
      ...state,
      accounts:action.payload
    }
    case 'SET_PROVIDER':
      return {
      ...state,
      currentProvider:action.payload
      }
    case 'SET_PENDING':
      return {
      ...state,
      pending:action.payload
      }
    case 'SET_STATE':
      return {
      ...state,
      ...action.payload
      }
    case 'CHANGE_POOLS':
      let list = Array.from(state.poolsList)
      const {networkId} = list[0]
      list[1].tokenValue = ''
      return {
        ...state,
        poolsList: list,
        networkStatus:networkId === state.wallet?.networkId
      }
    case 'SET_WALLET':
      return {
        ...state,
        wallet: { ...state.wallet, ...action.payload },
        networkStatus: action.payload?.networkId === state.poolsList[0].networkId
      }
    case 'SET_SWAP_SETTING':
      return {
        ...state,
        swapSetting: { ...state.swapSetting, ...action.payload },
    }
    case 'SET_POOLS_LIST':
      // console.log('SET_POOLS_LIST', action.payload)
      return {
        ...state,
        poolsList: action.payload,
        networkStatus:action.payload[0]?.networkId === state.wallet?.networkId
      }
    default: return state
  }
};
