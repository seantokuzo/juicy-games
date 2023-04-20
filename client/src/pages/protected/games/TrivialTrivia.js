import React from 'react'
import { TriviaMenu } from '../../../components/games/trivia'
import { useTriviaContext } from '../../../context/trivia-context/triviaContext'
import TriviaPractice from '../../TriviaPractice'

const TrivialTrivia = () => {
  const { mode } = useTriviaContext()

  return (
    <div className="">
      {mode === 'menu' && <TriviaMenu />}
      {mode === 'practice' && <TriviaPractice />}
    </div>
  )
}

export default TrivialTrivia
