import React from 'react'
import { Link } from 'react-router-dom'
import ButtonLink from '../ButtonLink'

const GamesMenu = () => {
  return (
    <div className="form games__menu">
      <h1 className="games__menu-title title">Games</h1>
      <ButtonLink
        path="/me/games/boredle"
        btnClass="btn-theme link account__links-link fs-boredle"
        text="Boredle"
      />
      <ButtonLink
        path="/me/games/trivial-trivia"
        btnClass="btn-theme link account__links-link fs-trivia"
        text="Trivial Trivia"
      />
    </div>
  )
}

export default GamesMenu
