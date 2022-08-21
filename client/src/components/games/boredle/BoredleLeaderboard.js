import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { useBoredleContext } from '../../../context/boredle-context/boredleContext'
import Avatar from '../../Avatar'
import MenuButton from './MenuButton'
import { useAppContext } from '../../../context/appContext'

const BoredleLeaderboard = () => {
  const [sortBy, setSortBy] = useState('streak')
  const { leaderboard, getBoredleLeaderboard } = useBoredleContext()
  const { user } = useAppContext()

  useEffect(() => {
    getBoredleLeaderboard(sortBy)
  }, [sortBy])

  console.log('🧘🏽‍♀️', leaderboard)

  const leaderboardMap = leaderboard.map((leader) => (
    <div
      className={
        leader.username === user.username
          ? 'boredle__leaderboard-leader boredle__leaderboard-leader--me friends__map-person'
          : 'boredle__leaderboard-leader friends__map-person'
      }
      key={nanoid()}
    >
      <Avatar
        type={leader.avatar}
        avatarClass={`friends__avatar clr-${leader.avatar}`}
        defaultClass="friends__avatar--default"
      />
      <p className="friends__map-username">{leader.username}</p>
      <p className="friends__map-username">{`${sortBy}: ${leader[sortBy]}`}</p>
    </div>
  ))

  return (
    <div className="boredle__leaderboard page">
      <h1 className="title">Leaderboard</h1>
      <div className="boredle__leaderboard-container form">
        <div className="boredle__leaderboard-sorters">
          <button
            type="button"
            className={
              sortBy === 'wins'
                ? 'btn boredle__leaderboard-sorters-btn boredle__leaderboard-sorters-btn--selected'
                : 'btn boredle__leaderboard-sorters-btn'
            }
            onClick={() => setSortBy('wins')}
          >
            WINS
          </button>
          <button
            type="button"
            className={
              sortBy === 'streak'
                ? 'btn boredle__leaderboard-sorters-btn boredle__leaderboard-sorters-btn--selected'
                : 'btn boredle__leaderboard-sorters-btn'
            }
            onClick={() => setSortBy('streak')}
          >
            STREAK
          </button>
          <button
            type="button"
            className={
              sortBy === 'maxStreak'
                ? 'btn boredle__leaderboard-sorters-btn boredle__leaderboard-sorters-btn--selected'
                : 'btn boredle__leaderboard-sorters-btn'
            }
            onClick={() => setSortBy('maxStreak')}
          >
            MAX STREAK
          </button>
        </div>
        {leaderboardMap}
      </div>
      <MenuButton />
    </div>
  )
}

export default BoredleLeaderboard
