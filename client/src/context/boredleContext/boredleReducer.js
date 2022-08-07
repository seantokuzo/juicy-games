import { UPDATE_MODE } from './boredleActions'

import { initialState } from './boredleContext'

const boredleReducer = (state, action) => {
  if (action.type === UPDATE_MODE) {
    return {
      ...state,
      mode: action.payload.mode
    }
  }

  throw new Error(`No such action: ${action.type}`)
}

export default boredleReducer
