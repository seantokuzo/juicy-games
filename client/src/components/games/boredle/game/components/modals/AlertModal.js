import React from 'react'
import { useBoredleContext } from '../../../../../../context/boredle-context/boredleContext'

const AlertModal = ({ text }) => {
  const { alertText } = useBoredleContext()

  return (
    <div className={`boredle__alert theme-color theme-border`}>
      <h3>{alertText || text}</h3>
    </div>
  )
}

export default AlertModal
