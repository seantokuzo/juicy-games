import React from 'react'
import {
  FaRegArrowAltCircleLeft,
  FaRegQuestionCircle,
  FaChartBar,
  FaCog
} from 'react-icons/fa'

const BoredleHeader = () => {
  // const { toggleHelp, toggleStats, toggleSettings } = useBoredleContext()

  const header = (
    <header className="boredle__header">
      <div className="boredle__header-icons">
        <FaRegArrowAltCircleLeft
          className="boredle__header-icon"
          // onClick={toggleHelp}
        ></FaRegArrowAltCircleLeft>
        <FaRegQuestionCircle
          className="boredle__header-icon"
          // onClick={toggleHelp}
        ></FaRegQuestionCircle>
      </div>
      <h3 className="boredle__header-title subtitle">BOREDLE</h3>
      <div className="boredle__header-icons">
        <FaChartBar
          className="boredle__header-icon"
          // onClick={toggleStats}
        ></FaChartBar>
        <FaCog
          className="boredle__header-icon"
          // onClick={toggleSettings}
        ></FaCog>
      </div>
    </header>
  )

  return <>{header}</>
}

export default BoredleHeader
