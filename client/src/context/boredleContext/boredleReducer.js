import { TEMP_ACTION } from './boredleActions'

import { initialState } from './boredleContext'

const boredleReducer = (state, action) => {
  if (action.type === TEMP_ACTION) {
    console.log(`Boredle: Temp Action: ${state.msg}`)
    return
  }

  throw new Error(`No such action: ${action.type}`)
}

export default boredleReducer
