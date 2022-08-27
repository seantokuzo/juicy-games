import React, { useEffect } from 'react'
import {
  BoredleMenu,
  BoredleGOTD,
  BoredleBattle,
  BoredleTeam,
  BoredleFriends,
  BoredleStats,
  BoredleLeaderboard,
  BoredlePractice
} from '../../../components/games/boredle'
import { useBoredleContext } from '../../../context/boredle-context/boredleContext'

const Boredle = () => {
  const { mode, getMyBoredle } = useBoredleContext()

  useEffect(() => {
    getMyBoredle()
  }, [])

  return (
    <div className="boredle">
      {mode === 'menu' && <BoredleMenu />}
      {mode === 'gotd' && <BoredleGOTD />}
      {mode === 'battle' && <BoredleBattle />}
      {mode === 'team' && <BoredleTeam />}
      {mode === 'friends' && <BoredleFriends />}
      {mode === 'stats' && <BoredleStats />}
      {mode === 'leaderboard' && <BoredleLeaderboard />}
      {mode === 'practice' && <BoredlePractice />}
    </div>
  )
}

export default Boredle
