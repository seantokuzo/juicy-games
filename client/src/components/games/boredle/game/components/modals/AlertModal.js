import React from 'react'
import { useBoredleContext } from '../../../../../../context/boredle-context/boredleContext'

const AlertModal = () => {
  const { alertType, alertText } = useBoredleContext()

  return (
    <div className={`boredle__alert boredle__alert-${alertType} theme-color theme-border`}>
      <h3>{alertText}</h3>
    </div>
  )
}

export default AlertModal
