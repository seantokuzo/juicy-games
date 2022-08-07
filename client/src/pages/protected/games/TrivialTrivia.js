import React from 'react'
import { TriviaMenu } from '../../../components/games/trivia'
import { useTriviaContext } from '../../../context/triviaContext/triviaContext'

const TrivialTrivia = () => {
  const { mode, updateTriviaMode } = useTriviaContext()

  return (
    <div className="trivia page">
      <TriviaMenu />
    </div>
  )
}

export default TrivialTrivia