import React from 'react'
import { useBoredleContext } from '../../../../../context/boredle-context/boredleContext'
import { FaBackspace } from 'react-icons/fa'
import { getLettersArray } from '../utils/gameUtils'

const Keyboard = () => {
  // const { answer, prevGuesses, handleBoredleKeyboard, handleBackspace, handleEnter } =
  //   props
  const { mode, handleBoredleKeyboard } = useBoredleContext()
  const {
    [mode]: { answer, prevGuesses }
  } = useBoredleContext()

  const correctLetters = getLettersArray('correct', answer, prevGuesses)
  const wrongSpotLetters = getLettersArray('wrong spot', answer, prevGuesses)
  const incorrectLetters = getLettersArray('incorrect', answer, prevGuesses)

  const areYouCorrect = (letter) => correctLetters.includes(letter)
  const areYouWrongSpot = (letter) => wrongSpotLetters.includes(letter)
  const areYouIncorrect = (letter) => incorrectLetters.includes(letter)

  const getKeyClassName = (key) => {
    return areYouCorrect(key)
      ? 'boredle__keys-key boredle__keys-key-letter boredle__box-correct boredle__keys-key--filled'
      : areYouWrongSpot(key)
      ? 'boredle__keys-key boredle__keys-key-letter boredle__box-wrong-spot boredle__keys-key--filled'
      : areYouIncorrect(key)
      ? 'boredle__keys-key boredle__keys-key-letter boredle__box-incorrect boredle__keys-key--filled'
      : 'btn boredle__keys-key boredle__keys-key-letter'
  }

  const enterKey = (
    <div
      key="Enter"
      className="btn boredle__keys-key boredle__keys-key-btn boredle__keys-key-enter"
      onClick={() => handleBoredleKeyboard('Enter')}
    >
      <p>ENTER</p>
    </div>
  )

  const backspaceKey = (
    <div
      key="backspace"
      className="btn boredle__keys-key boredle__keys-key-btn"
      onClick={() => handleBoredleKeyboard('Backspace')}
    >
      {/* <i className="fa-solid fa-delete-left boredle__keys-key-backspace"></i> */}
      <FaBackspace className="fa-solid fa-delete-left boredle__keys-key-backspace" />
    </div>
  )

  const topRow = (
    <div className="boredle__keys-row">
      {['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'].map((key) => (
        <div
          className={getKeyClassName(key)}
          id={`${key}`}
          onClick={() => handleBoredleKeyboard(key)}
          key={`keyboard-${key}`}
        >
          <p className="boredle__keys-key-text">{key}</p>
        </div>
      ))}
    </div>
  )

  const middleRow = (
    <div className="boredle__keys-row">
      {['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'].map((key) => (
        <div
          className={getKeyClassName(key)}
          id={`${key}`}
          onClick={() => handleBoredleKeyboard(key)}
          key={`keyboard-${key}`}
        >
          <p className="boredle__keys-key-text">{key}</p>
        </div>
      ))}
    </div>
  )

  const bottomRow = (
    <div className="boredle__keys-row">
      {enterKey}
      {['z', 'x', 'c', 'v', 'b', 'n', 'm'].map((key) => (
        <div
          className={getKeyClassName(key)}
          id={`${key}`}
          onClick={() => handleBoredleKeyboard(key)}
          key={`keyboard-${key}`}
        >
          <p className="boredle__keys-key-text">{key}</p>
        </div>
      ))}
      {backspaceKey}
    </div>
  )

  return (
    <div className="boredle__keys">
      {topRow}
      {middleRow}
      {bottomRow}
    </div>
  )
}

export default Keyboard
