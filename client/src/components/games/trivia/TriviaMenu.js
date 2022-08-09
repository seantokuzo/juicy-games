import React from 'react'
import { useAppContext } from '../../../context/appContext'
import { useTriviaContext } from '../../../context/trivia-context/triviaContext'
import ButtonLink from '../../ButtonLink'

const TriviaMenu = () => {
  const { isLoading, showAlert } = useAppContext()
  const { updateTriviaMode } = useTriviaContext()

  return (
    <>
      <div className="trivia__menu form">
        <h1 className="title">Trivia</h1>
        <button
          className="btn btn-theme form-btn"
          onClick={() => updateTriviaMode('g-o-t-d')}
        >
          Trivia of the Day
        </button>
        <button
          className="btn btn-theme form-btn"
          onClick={() => updateTriviaMode('practice')}
        >
          Practice
        </button>
        <button
          className="btn btn-theme form-btn"
          onClick={() => updateTriviaMode('friends')}
        >
          Trivia with Friends
        </button>
        <button
          className="btn btn-theme form-btn"
          onClick={() => updateTriviaMode('stats')}
        >
          My Stats
        </button>
        <button
          className="btn btn-theme form-btn"
          onClick={() => updateTriviaMode('leaderboard')}
        >
          Leaderboard
        </button>
      </div>
      <ButtonLink path="/me/games" btnClass="form-btn" text="Games Menu" />
    </>
  )
}

export default TriviaMenu
