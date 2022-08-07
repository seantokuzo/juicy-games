import React from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../../context/appContext'
import { useBoredleContext } from '../../../context/boredleContext/boredleContext'

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
      <div className="links-div">
        <Link
          to="/me/games"
          className="btn form-btn"
          style={{ pointerEvents: isLoading || showAlert ? 'none' : '' }}
        >
          <h3>Games Menu</h3>
        </Link>
      </div>
    </>
  )
}

export default BoredleMenu
