import React from 'react'
import { nanoid } from 'nanoid'
import { useBoredleContext } from '../../../../../context/boredleContext/boredleContext'
import CurrentRow from './CurrentRow'
import EmptyRow from './EmptyRow'
import FilledRow from './FilledRow'
import { NUMBER_GUESSES } from '../data/gameSettings'

const GuessGrid = () => {
  const { mode, isRevealing, didWin, invalidGuessWiggle } = useBoredleContext()
  const {
    [mode]: { answer, currentGuess, prevGuesses }
  } = useBoredleContext()

  const filledRows = prevGuesses.map((guess, i) => (
    <FilledRow guess={guess} row={i + 1} key={nanoid()} />
  ))

  const emptyRows =
    prevGuesses.length < NUMBER_GUESSES ? (
      new Array(NUMBER_GUESSES - prevGuesses.length - 1)
        .fill('')
        .map((slot, i) => <EmptyRow key={nanoid()} />)
    ) : (
      <></>
    )

  const guessGrid = (
    <div className="boredle__guesses">
      {filledRows}
      {prevGuesses.length < NUMBER_GUESSES && <CurrentRow />}
      {emptyRows}
    </div>
  )

  return <>{guessGrid}</>
}

export default GuessGrid
