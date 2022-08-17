import React from 'react'
import ThemeMenu from '../../../../../ThemeMenu'
import AvatarMenu from '../../../../../AvatarMenu'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useBoredleContext } from '../../../../../../context/boredle-context/boredleContext'

const StatsModal = () => {
  const { mode, toggleStats } = useBoredleContext()

  const statsTitleDiv = (
    <div className="boredle__setting-title">
      <h3 className="boredle__settings-title modal__title subtitle">Stats</h3>
      <AiFillCloseCircle className="modal__close" onClick={toggleStats} />
    </div>
  )

  return (
    <div className="boredle__modal--dimmer">
      <div className="boredle__modal boredle__settings bg-theme">
        {statsTitleDiv}
      </div>
    </div>
  )
}

export default StatsModal
