import React, { useState, useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import accurateInterval from '../../utils/accurateInterval'

const Timer = () => {
  const { gameOptions, gameActive } = useAppContext()
  const [timeLeft, setTimeLeft] = useState(gameOptions.amount * 15 * 1000)
  const [myInterval, setMyInterval] = useState('')

  useEffect(() => {
    if (gameActive) {
      startTimer()
    }
  }, [gameActive])

  const formatTime = (time) => {
    const minutes = Math.floor(time / 1000 / 60)
    const secondsNum = Math.floor(time / 1000) - minutes * 60
    const seconds = secondsNum < 10 ? `0${secondsNum}` : secondsNum

    return `${minutes}:${seconds}`
  }

  function decrementTimeLeft() {
    setTimeLeft((prev) => prev - 1000)
  }

  const intervalLength = 1000

  // START THE TIMER USING ACCURATE INTERVAL HELPER FUNCTION
  function startTimer() {
    setMyInterval(
      accurateInterval(() => {
        decrementTimeLeft()
        // checkTimerStatus()
      }, intervalLength)
    )
  }

  return (
    <div className="timer">
      <h3 className="timer-title">Time Remaining</h3>
      <h3 className="timer-title">{formatTime(timeLeft)}</h3>
    </div>
  )
}

export default Timer
