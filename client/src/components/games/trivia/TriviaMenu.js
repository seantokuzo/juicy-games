import React from 'react'
import { useAppContext } from '../../../context/appContext'
import { useTriviaContext } from '../../../context/boredleContext/boredleContext'
import ButtonLink from '../../ButtonLink'

const TriviaMenu = () => {
  const { isLoading, showAlert } = useAppContext()
  const { updateMode } = useTriviaContext()

  return (
    <>
      <div className="boredle__menu form">
        <h1 className="title">Trivia</h1>
        <button
          className="btn btn-theme form-btn"
          onClick={() => updateMode('g-o-t-d')}
        >
          Trivia of the Day
        </button>
        <button
          className="btn btn-theme form-btn"
          onClick={() => updateMode('practice')}
        >
          Practice
        </button>
        <button
          className="btn btn-theme form-btn"
          onClick={() => updateMode('friends')}
        >
          Trivia with Friends
        </button>
        <button
          className="btn btn-theme form-btn"
          onClick={() => updateMode('stats')}
        >
          My Stats
        </button>
        <button
          className="btn btn-theme form-btn"
          onClick={() => updateMode('leaderboard')}
        >
          Leaderboard
        </button>
      </div>
      <ButtonLink path="/me/games" btnClass="form-btn" text="Games Menu" />
    </>
  )
}

export default TriviaMenu
