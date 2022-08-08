import React from 'react'
import { useBoredleContext } from '../../../../../context/boredleContext/boredleContext'

const Keyboard = () => {
  // const { answer, prevGuesses, handleKeyClick, handleBackspace, handleEnter } =
  //   props
  const { mode } = useBoredleContext()

  // const correctLetters = getLettersArray('correct', answer, prevGuesses)
  // const wrongSpotLetters = getLettersArray('wrong spot', answer, prevGuesses)
  // const incorrectLetters = getLettersArray('incorrect', answer, prevGuesses)

  // const areYouCorrect = (letter) => correctLetters.includes(letter)
  // const areYouWrongSpot = (letter) => wrongSpotLetters.includes(letter)
  // const areYouIncorrect = (letter) => incorrectLetters.includes(letter)

  // const getKeyClassName = (key) => {
  //   return areYouCorrect(key)
  //     ? 'btn boredle__keys-key boredle__keys-key-letter correct key--guessed'
  //     : areYouWrongSpot(key)
  //     ? 'btn boredle__keys-key boredle__keys-key-letter wrong-spot key--guessed'
  //     : areYouIncorrect(key)
  //     ? 'btn boredle__keys-key boredle__keys-key-letter incorrect key--guessed'
  //     : 'btn boredle__keys-key boredle__keys-key-letter'
  // }

  const enterKey = (
    <div
      key="Enter"
      className="btn boredle__keys-key boredle__keys-key-btn boredle__keys-key-enter"
      // onClick={handleEnter}
    >
      <p>ENTER</p>
    </div>
  )

  const backspaceKey = (
    <div
      key="backspace"
      className="btn boredle__keys-key boredle__keys-key-btn"
      // onClick={handleBackspace}
    >
      <i className="fa-solid fa-delete-left boredle__keys-key-backspace"></i>
    </div>
  )

  const topRow = (
    <div className="boredle__keys-row">
      {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((key) => (
        <div
          // className={getKeyClassName(key)}
          className="btn boredle__keys-key boredle__keys-key-letter"
          id={`${key}`}
          // onClick={() => handleKeyClick(key)}
          key={`keyboard-${key}`}
        >
          <p className="boredle__keys-key-text">{key}</p>
        </div>
      ))}
    </div>
  )

  const middleRow = (
    <div className="boredle__keys-row">
      {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((key) => (
        <div
          // className={getKeyClassName(key)}
          className="btn boredle__keys-key boredle__keys-key-letter"
          id={`${key}`}
          // onClick={() => handleKeyClick(key)}
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
      {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((key) => (
        <div
          // className={getKeyClassName(key)}
          className="btn boredle__keys-key boredle__keys-key-letter"
          id={`${key}`}
          // onClick={() => handleKeyClick(key)}
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
