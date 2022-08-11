import React, { useEffect } from 'react'
import { nanoid } from 'nanoid'
import {
  WORD_LENGTH,
  ANIME_DELAY,
  ANIME_DURATION,
  WIN_ANIME_DURATION
} from '../data/gameSettings'
import { useBoredleContext } from '../../../../../context/boredle-context/boredleContext'

const CurrentRow = () => {
  const { mode, isRevealing, guessWiggle } = useBoredleContext()
  const {
    [mode]: { answer, currentGuess }
  } = useBoredleContext()

  // useEffect(() => {
  //   const flippers = document.getElementsByClassName('box-flip')
  //   if (isRevealing) {
  //     if (flippers) {
  //       ;[...flippers].forEach((flipper, index) => {
  //         setTimeout(() => {
  //           if (flipper.textContent === answer[index]) {
  //             flipper.classList.add('correct')
  //           } else if (answer.includes(flipper.textContent)) {
  //             flipper.classList.add('wrong-spot')
  //           } else {
  //             flipper.classList.add('incorrect')
  //           }
  //         }, ANIME_DELAY * index + ANIME_DELAY + ANIME_DELAY / 4)
  //       })
  //     }
  //   }
  // }, [isRevealing])

  // useEffect(() => {
  //   const wigglers = document.getElementsByClassName('current-box')
  //   if (wigglers && guessWiggle) {
  //     ;[...wigglers].forEach((wiggler) => {
  //       setTimeout(() => {
  //         wiggler.classList.add('guess')
  //       }, ANIME_DURATION)
  //     })
  //   }
  // }, [guessWiggle])

  return (
    <div
      className={
        guessWiggle
          ? 'boredle__guess-row boredle__guess-row-wiggle'
          : 'boredle__guess-row'
      }
      style={{
        animationDuration: `${WIN_ANIME_DURATION}ms`
      }}
    >
      {new Array(WORD_LENGTH).fill('').map((x, i) => (
        <div
          className={
            isRevealing ? 'boredle__guess-box box-flip' : 'boredle__guess-box'
          }
          style={{
            animationDelay: `${ANIME_DELAY * (i + 1)}ms`,
            animationDuration: `${ANIME_DURATION}ms`
          }}
          key={nanoid()}
        >
          <h3 className='boredle__guess-box-text'>{currentGuess[i]}</h3>
        </div>
      ))}
    </div>
  )
}

export default CurrentRow
