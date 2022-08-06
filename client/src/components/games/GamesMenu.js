import React from 'react'
import { Link } from 'react-router-dom'

const GamesMenu = () => {
  return (
    <div className="form">
      <h1 className=" form-title">Games</h1>
      <Link
        to="/me/games/trivial-trivia"
        className="btn btn-theme link account__links-link"
        // style={{ pointerEvents: isLoading || showAlert ? 'none' : '' }}
      >
        <h3>Trivial Trivia</h3>
      </Link>
      <Link
        to="/me/games/boredle"
        className="btn btn-theme link account__links-link"
        // style={{ pointerEvents: isLoading || showAlert ? 'none' : '' }}
      >
        <h3>Boredle</h3>
      </Link>
    </div>
  )
}

export default GamesMenu
