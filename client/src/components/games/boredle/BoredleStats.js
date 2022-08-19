import React from 'react'
import { StatsModal } from './game/components'
import MenuButton from './MenuButton'

const BoredleStats = () => {
  return (
    <div className="boredle__stats page">
      <h1 className="title">Boredle Stats</h1>
      <StatsModal page={true} />
      <MenuButton />
    </div>
  )
}

export default BoredleStats
