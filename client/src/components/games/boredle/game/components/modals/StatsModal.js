import React from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useBoredleContext } from '../../../../../../context/boredle-context/boredleContext'
import StatsBarChart from '../StatsBarChart'

const StatsModal = () => {
  const { toggleStats } = useBoredleContext()

  const statsTitleDiv = (
    <div className="boredle__setting-title">
      <h3 className="boredle__settings-title modal__title subtitle">Stats</h3>
      <AiFillCloseCircle className="modal__close" onClick={toggleStats} />
      <h1>💩</h1>
    </div>
  )

  return (
    <div className="boredle__modal--dimmer">
      <div className="boredle__modal boredle__stats bg-theme">
        {statsTitleDiv}
        <StatsBarChart />
      </div>
    </div>
  )
}

export default StatsModal
