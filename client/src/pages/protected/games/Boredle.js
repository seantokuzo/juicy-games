import React, { useState } from 'react'
import {
  BoredleMenu,
  BoredleGOTD,
  BoredlePractice,
  BoredleFriends,
  BoredleStats,
  BoredleLeaderboard
} from '../../../components/games/boredle'
import { useBoredleContext } from '../../../context/boredle-context/boredleContext'

const Boredle = () => {
  const { mode } = useBoredleContext()

  return (
    <div className="boredle">
      {mode === 'gotd' && <BoredleGOTD />}
      {mode === 'practice' && <BoredlePractice />}
      {mode === 'friends' && <BoredleFriends />}
      {mode === 'stats' && <BoredleStats />}
      {mode === 'leaderboard' && <BoredleLeaderboard />}
      {mode === 'menu' && <BoredleMenu />}
    </div>
  )
}

export default Boredle
