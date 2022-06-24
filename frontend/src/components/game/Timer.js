import React, { useState } from 'react'
import { useAppContext } from '../../context/appContext'

const Timer = () => {
  const { gameOptions, gameActive } = useAppContext()
  const [timeLeft, setTimeLeft] = useState(gameOptions.amount * 15 * 1000)

  const formatTime = (time) => {
    const minutes = Math.floor(time / 1000 / 60)
    const secondsNum = Math.floor(time / 1000) - minutes * 60
    const seconds = secondsNum < 10 ? `0${secondsNum}` : secondsNum

    return `${minutes}:${seconds}`
  }

  return (
    <div className="timer">
      <h3 className="timer-title">Time Remaining</h3>
      <h3 className="timer-title">{formatTime(timeLeft)}</h3>
    </div>
  )
}

export default Timer
