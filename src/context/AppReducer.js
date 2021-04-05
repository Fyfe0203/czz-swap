

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
    case 'SET_BUTTON_TEXT':
      return {
      ...state,
      swapButtonText: action.payload
    }
    case 'SET_WALLET':
      return {
        ...state,
        wallet: { ...state.wallet, ...action.payload },
      }
    case 'SET_SWAP_SETTING':
      return {
        ...state,
    }
    default: return state
  }
};
