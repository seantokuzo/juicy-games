import React, { useReducer, useContext } from 'react'
import reducer from './reducer'
import { RETRIEVE_CATEGORIES, START_GAME, UPDATE_GAME_OPTIONS } from './actions'

const initialState = {
  categories: undefined,
  showOptions: true,
  gameOptions: {
    amount: '5',
    category: '',
    difficulty: 'easy',
    type: 'multiple'
  },
  trivia: undefined,
  gameActive: false
}

const AppContext = React.createContext()

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // useEffect(() => {
  //   fetch('https://opentdb.com/api_category.php')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setCategories(
  //         data.trivia_categories.slice(0, data.trivia_categories.length - 2)
  //       )
  //       setGameOptions((prev) => ({
  //         ...prev,
  //         category: data.trivia_categories[0].id.toString()
  //       }))
  //     })
  //     .catch((err) => console.log(err))
  // }, [])

  const retrieveCategories = (cats) => {
    dispatch({ type: RETRIEVE_CATEGORIES, payload: { cats } })
  }

  const startGame = () => {
    dispatch({ type: START_GAME })
  }

  const updateGameOptions = (e) => {
    const { name, value } = e.target
    dispatch({
      type: UPDATE_GAME_OPTIONS,
      payload: {
        name,
        value
      }
    })
  }

  return (
    <AppContext.Provider value={{ ...state, startGame, retrieveCategories, updateGameOptions }}>
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { initialState, AppContextProvider, useAppContext }
