import { RETRIEVE_CATEGORIES, START_GAME, UPDATE_GAME_OPTIONS } from './actions'

const reducer = (state, action) => {
  if (action.type === RETRIEVE_CATEGORIES) {
    return {
      ...state,
      categories: action.payload.cats
    }
  }
  if (action.type === START_GAME) {
    return {
      ...state,
      showOptions: false,
      gameActive: true
    }
  }
  if (action.type === UPDATE_GAME_OPTIONS) {
    console.log('update game options')
    return {
      ...state,
      gameOptions: {
        ...state.gameOptions,
        [action.payload.name]: action.payload.value
      }
    }
  }
  throw new Error(`No such action : ${action.type}`)
}

export default reducer
