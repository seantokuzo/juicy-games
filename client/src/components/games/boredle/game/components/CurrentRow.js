import React, { useEffect } from 'react'
import { nanoid } from 'nanoid'
import {
  WORD_LENGTH,
  ANIME_DELAY,
  ANIME_DURATION,
  WIN_ANIME_DURATION
} from '../data/gameSettings'
import { useBoredleContext } from '../../../../../context/boredle-context/boredleContext'
import { decryptBoredle } from '../../../../../utils/boredleEncrypt'

const CurrentRow = () => {
  const { mode, isRevealing, invalidGuessWiggle } = useBoredleContext()
  const {
    [mode]: { answer, currentGuess }
  } = useBoredleContext()

  useEffect(() => {
    const flippers = document.getElementsByClassName('anim__boredle-box-flip')
    if (isRevealing) {
      if (flippers) {
        ;[...flippers].forEach((flipper, index) => {
          setTimeout(() => {
            if (flipper.textContent === decryptBoredle(answer)[index]) {
              flipper.classList.add('boredle__box-correct')
            } else if (decryptBoredle(answer).includes(flipper.textContent)) {
              flipper.classList.add('boredle__box-wrong-spot')
            } else {
              flipper.classList.add('boredle__box-incorrect')
            }
          }, ANIME_DELAY * index + ANIME_DELAY + ANIME_DELAY / 4)
        })
      }
    }
  }, [isRevealing])

  // useEffect(() => {
  //   const wigglers = document.getElementsByClassName('current-box')
  //   if (wigglers && invalidGuessWiggle) {
  //     ;[...wigglers].forEach((wiggler) => {
  //       setTimeout(() => {
  //         wiggler.classList.add('guess')
  //       }, ANIME_DURATION)
  //     })
  //   }
  // }, [invalidGuessWiggle])

  return (
    <div
      className={
        invalidGuessWiggle
          ? 'boredle__guess-row anim__boredle-wiggle'
          : 'boredle__guess-row'
      }
      style={{
        animationDuration: `${WIN_ANIME_DURATION}ms`
      }}
    >
      {new Array(WORD_LENGTH).fill('').map((x, i) => (
        <div
          className={
            isRevealing
              ? 'boredle__guess-box anim__boredle-box-flip'
              : 'boredle__guess-box'
          }
          style={{
            animationDelay: `${ANIME_DELAY * (i + 1)}ms`,
            animationDuration: `${ANIME_DURATION}ms`
          }}
          key={nanoid()}
        >
          <h3 className="boredle__guess-box-text">{currentGuess[i]}</h3>
        </div>
      ))}
    </div>
  )
}

export default CurrentRow
