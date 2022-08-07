import React from 'react'
import { useBoredleContext } from '../../../context/boredleContext/boredleContext'
import ButtonLink from '../../ButtonLink'

const BoredleMenu = () => {
  const { updateBoredleMode } = useBoredleContext()

  return (
    <>
      <div className="boredle__menu form">
        <h1 className="title">Boredle</h1>
        <button
          className="btn btn-theme form-btn"
          onClick={() => updateBoredleMode('g-o-t-d')}
        >
          Boredle of the Day
        </button>
        <button
          className="btn btn-theme form-btn"
          onClick={() => updateBoredleMode('practice')}
        >
          Practice
        </button>
        <button
          className="btn btn-theme form-btn"
          onClick={() => updateBoredleMode('friends')}
        >
          Boredle with Friends
        </button>
        <button
          className="btn btn-theme form-btn"
          onClick={() => updateBoredleMode('stats')}
        >
          My Stats
        </button>
        <button
          className="btn btn-theme form-btn"
          onClick={() => updateBoredleMode('leaderboard')}
        >
          Leaderboard
        </button>
      </div>
      <ButtonLink path="/me/games" btnClass="form-btn" text="Games Menu" />
    </>
  )
}

export default BoredleMenu
