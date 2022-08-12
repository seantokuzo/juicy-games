import React from 'react'
import { useBoredleContext } from '../../../../../../context/boredle-context/boredleContext'

const AlertModal = () => {
  const { alertText } = useBoredleContext()

  return (
    <div className={`boredle__alert theme-color theme-border`}>
      <h3>{alertText}</h3>
    </div>
  )
}

export default AlertModal
