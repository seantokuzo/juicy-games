import React from 'react'
import { nanoid } from 'nanoid'
import {
  helpTitle,
  helpSubtitle,
  helpText,
  exampleIndices,
  exampleWords
} from '../../data/helpPageData'
import { useBoredleContext } from '../../../../../../context/boredle-context/boredleContext'

const HelpModal = () => {
  const { toggleHelp } = useBoredleContext()

  const helpBoxClasses = (mapIndex, target, boxStatus) => {
    if (mapIndex === target) {
      return `boredle__help-box boredle__box boredle__box-filled boredle__box-${boxStatus}`
    } else return 'boredle__help-box boredle__box boredle__box-empty'
  }

  const exampleOne = (
    <div className="boredle__help-eg">
      {exampleWords[0].map((item, index) => {
        return (
          <div
            key={nanoid()}
            className={helpBoxClasses(index, exampleIndices[0], 'correct')}
          >
            <h2 className="help__eg-text">{item}</h2>
          </div>
        )
      })}
    </div>
  )

  const exampleTwo = (
    <div className="boredle__help-eg">
      {exampleWords[1].map((item, index) => {
        return (
          <div
            key={nanoid()}
            className={helpBoxClasses(index, exampleIndices[1], 'wrong-spot')}
          >
            <h2 className="help__eg-text">{item}</h2>
          </div>
        )
      })}
    </div>
  )

  const exampleThree = (
    <div className="boredle__help-eg">
      {exampleWords[2].map((item, index) => {
        return (
          <div
            key={nanoid()}
            className={helpBoxClasses(index, exampleIndices[2], 'incorrect')}
          >
            <h2 className="help__eg-text">{item}</h2>
          </div>
        )
      })}
    </div>
  )

  return (
    <div className="boredle__modal bg-theme">
      <h3 className="subtitle">{helpTitle}</h3>
      <div className="boredle__help-rules">
        <h4 className="modal__close" onClick={toggleHelp}>
          X
        </h4>
        <p className="boredle__help-text">{helpText[0]}</p>
        <p className="boredle__help-text">{helpText[1]}</p>
        <p className="boredle__help-text">{helpText[2]}</p>
      </div>
      <div className="boredle__help-examples border-bottom">
        <h3 className="subtitle">{helpSubtitle}</h3>
        {exampleOne}
        <p className="boredle__help-text">
          {helpText[3]}
          <strong>{exampleWords[0][exampleIndices[0]]}</strong>
          {helpText[4]}
        </p>
        {exampleTwo}
        <p className="boredle__help-text">
          {helpText[3]}
          <strong>{exampleWords[1][exampleIndices[1]]}</strong>
          {helpText[5]}
        </p>
        {exampleThree}
        <p className="boredle__help-text">
          {helpText[3]}
          <strong>{exampleWords[2][exampleIndices[2]]}</strong>
          {helpText[6]}
        </p>
      </div>
      <div>
        <h4 className="boredle__help-text-last">
          <strong>{helpText[7]}</strong>
        </h4>
      </div>
    </div>
  )
}

export default HelpModal
