import { UPDATE_MODE } from './triviaActions'

import { initialState } from './triviaContext'

const triviaReducer = (state, action) => {
  if (action.type === UPDATE_MODE) {
    return {
      ...state,
      mode: action.payload.mode
    }
  }

  throw new Error(`No such action: ${action.type}`)
}

export default triviaReducer
