import React from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../../context/appContext'
import { useBoredleContext } from '../../../context/boredleContext/boredleContext'
import ButtonLink from '../../ButtonLink'

const BoredleMenu = () => {
  const { isLoading, showAlert } = useAppContext()
  const { updateMode } = useBoredleContext()

  return (
    <>
      <div className="boredle__menu form">
        <h1 className="title">Boredle</h1>
        <button
          className="btn btn-theme form-btn"
          onClick={() => updateMode('g-o-t-d')}
        >
          Boredle of the Day
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
          Boredle with Friends
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

export default BoredleMenu