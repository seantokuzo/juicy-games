import React from 'react'
import { nanoid } from 'nanoid'
import { useBoredleContext } from '../../../../../context/boredle-context/boredleContext'
import { decryptBoredle } from '../../../../../utils/boredleEncrypt'
import { WIN_ANIME_DELAY, WIN_ANIME_DURATION } from '../data/gameSettings'

const FilledRow = ({ guess, row }) => {
  const { mode, isRevealing } = useBoredleContext()
  const {
    [mode]: { answer, didWin, prevGuesses }
  } = useBoredleContext()

  const decrypted = decryptBoredle(answer)

  const delay = (ind) => WIN_ANIME_DELAY * ind

  return (
    <div className="boredle__guess-row">
      {guess.map((letter, i) => (
        <div
          className={
            letter === decrypted[i] &&
            didWin &&
            !isRevealing &&
            row === prevGuesses.length
              ? 'boredle__guess-box boredle__box--win boredle__box-correct'
              : letter === decrypted[i]
              ? 'boredle__guess-box boredle__box-correct'
              : decrypted.includes(letter)
              ? 'boredle__guess-box boredle__box-wrong-spot'
              : 'boredle__guess-box boredle__box-incorrect'
          }
          style={{
            animationDelay: `${delay(i)}ms`,
            animationDuration: `${WIN_ANIME_DURATION}ms`
          }}
          key={nanoid()}
        >
          <h3 className="boredle__guess-box-text">{letter}</h3>
        </div>
      ))}
    </div>
  )
}

export default FilledRow
