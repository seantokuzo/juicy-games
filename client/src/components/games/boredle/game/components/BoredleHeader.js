import React from 'react'
import {
  FaRegArrowAltCircleLeft,
  FaRegQuestionCircle,
  FaChartBar,
  FaCog
} from 'react-icons/fa'
import { useBoredleContext } from '../../../../../context/boredle-context/boredleContext'

const BoredleHeader = () => {
  const { mode, updateBoredleMode, toggleHelp, toggleStats, toggleSettings } =
    useBoredleContext()

  const header = (
    <header className="boredle__header">
      <div className="boredle__header-icons">
        <FaRegArrowAltCircleLeft
          className="boredle__header-icon"
          onClick={() => updateBoredleMode('menu')}
        />
        <FaRegQuestionCircle
          className="boredle__header-icon"
          onClick={toggleHelp}
        />
      </div>
      <h3 className="boredle__header-title subtitle">
        {mode === 'gotd' ? 'BOREDLE' : 'PRACTICE'}
      </h3>
      <div className="boredle__header-icons">
        <FaChartBar className="boredle__header-icon" onClick={toggleStats} />
        <FaCog className="boredle__header-icon" onClick={toggleSettings} />
      </div>
    </header>
  )

  return <>{header}</>
}

export default BoredleHeader
