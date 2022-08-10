import React from 'react'
import {
  FaRegArrowAltCircleLeft,
  FaRegQuestionCircle,
  FaChartBar,
  FaCog
} from 'react-icons/fa'
import { useBoredleContext } from '../../../../../context/boredle-context/boredleContext'

const BoredleHeader = () => {
  const { mode, updateBoredleMode, toggleHelp, toggleSettings } =
    useBoredleContext()
  // const { toggleHelp, toggleStats, toggleSettings } = useBoredleContext()

  const header = (
    <header className="boredle__header">
      <div className="boredle__header-icons">
        <FaRegArrowAltCircleLeft
          className="boredle__header-icon"
          onClick={() => updateBoredleMode('menu')}
        ></FaRegArrowAltCircleLeft>
        <FaRegQuestionCircle
          className="boredle__header-icon"
          onClick={toggleHelp}
        ></FaRegQuestionCircle>
      </div>
      <h3 className="boredle__header-title subtitle">
        {mode === 'gotd' ? 'BOREDLE' : 'PRACTICE'}
      </h3>
      <div className="boredle__header-icons">
        <FaChartBar
          className="boredle__header-icon"
          // onClick={toggleStats}
        ></FaChartBar>
        <FaCog
          className="boredle__header-icon"
          onClick={toggleSettings}
        ></FaCog>
      </div>
    </header>
  )

  return <>{header}</>
}

export default BoredleHeader
