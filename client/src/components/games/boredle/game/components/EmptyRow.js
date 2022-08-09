import React from 'react'
import { nanoid } from 'nanoid'
import { WORD_LENGTH } from '../data/gameSettings'

const EmptyRow = () => {
  return (
    <div className="boredle__guess-row">
      {new Array(WORD_LENGTH).fill('').map((x, i) => (
        <div className="boredle__guess-box" key={nanoid()}></div>
      ))}
    </div>
  )
}

export default EmptyRow
