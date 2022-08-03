import React from 'react'
import { useAppContext } from '../context/appContext'

const Modal = ({ msg }) => {
  return <div className="modal">{msg}</div>
}

export default Modal
