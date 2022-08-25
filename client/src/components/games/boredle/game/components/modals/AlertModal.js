import React from 'react'
import NewGameBtn from '../NewGameBtn'
import { useBoredleContext } from '../../../../../../context/boredle-context/boredleContext'

const AlertModal = ({ text, practiceOver }) => {
  const { alertText } = useBoredleContext()

  return (
    <div className={`boredle__alert theme-color theme-border`}>
      <h3>{alertText || text}</h3>
      {practiceOver && <NewGameBtn />}
    </div>
  )
}

export default AlertModal
