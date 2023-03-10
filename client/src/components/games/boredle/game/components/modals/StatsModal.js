import React from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useBoredleContext } from '../../../../../../context/boredle-context/boredleContext'
import StatsBarChart from '../StatsBarChart'

const StatsModal = ({ page }) => {
  const {
    stats,
    toggleStats,
    updateBoredleMode,
    mode,
    handleShare,
    gotd: { didWin, didLose }
  } = useBoredleContext()
  // console.log(stats)
  const { wins, losses, streak, maxStreak } = stats

  const statsTitleDiv = (
    <div className="boredle__setting-title">
      <h3 className="boredle__settings-title modal__title subtitle">Stats</h3>
      <AiFillCloseCircle
        className="modal__close"
        onClick={page ? () => updateBoredleMode('menu') : toggleStats}
      />
    </div>
  )

  const statsEl = (
    <div className="boredle__stats-top">
      <div className="boredle__stats-stat">
        <h2 className="boredle__stats-stat-value">{wins + losses}</h2>
        <p className="boredle__stats-stat-label">Played</p>
        <br />
      </div>
      <div className="boredle__stats-stat">
        <h2 className="boredle__stats-stat-value">
          {wins + losses === 0 ? 0 : Math.floor((wins / (wins + losses)) * 100)}
        </h2>
        <p className="boredle__stats-stat-label">Win %</p>
        <br />
      </div>
      <div className="boredle__stats-stat">
        <h2 className="boredle__stats-stat-value">{streak}</h2>
        <p className="boredle__stats-stat-label min-content">Current Streak</p>
      </div>
      <div className="boredle__stats-stat">
        <h2 className="boredle__stats-stat-value">{maxStreak}</h2>
        <p className="boredle__stats-stat-label min-content">Max Streak</p>
      </div>
    </div>
  )

  const shareButton = (
    <div className="btn boredle__btn boredle__btn-share fs-boredle" onClick={handleShare}>
      <h3>SHARE</h3>
    </div>
  )

  return (
    <div className="boredle__modal--dimmer">
      <div className="boredle__modal boredle__stats bg-theme">
        {statsTitleDiv}
        {statsEl}
        <StatsBarChart />
        {mode === 'gotd' && (didWin || didLose) && shareButton}
      </div>
    </div>
  )
}

export default StatsModal
