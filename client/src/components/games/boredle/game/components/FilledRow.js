import React from 'react'
import { useBoredleContext } from '../../../../../context/boredleContext/boredleContext'

const FilledRow = ({ guess, row }) => {
  const { mode, isRevealing, didWin, prevGuesses } = useBoredleContext()
  const {
    [mode]: { answer }
  } = useBoredleContext()

  console.log(answer, prevGuesses)

  // const delay = (ind) => WIN_ANIME_DELAY * ind

  return (
    <div className="boredle__guess-row">
      {guess.map((letter, i) => (
        <div
          className={
            letter === answer[i] &&
            didWin &&
            !isRevealing &&
            row === prevGuesses.length
              ? 'boredle__guess-box boredle__guess-box-win boredle__correct'
              : letter === answer[i]
              ? 'boredle__guess-box boredle__correct'
              : answer.includes(letter)
              ? 'boredle__guess-box boredle__wrong-spot'
              : 'boredle__guess-box boredle__incorrect'
          }
          style={{
            animationDelay: `${delay(i)}ms`,
            animationDuration: `${WIN_ANIME_DURATION}ms`
          }}
          key={nanoid()}
        >
          <h3>{letter}</h3>
        </div>
      ))}
    </div>
  )
}

export default FilledRow
