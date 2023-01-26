import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppContextProvider } from './context/appContext'
import { BoredleContextProvider } from './context/boredle-context/boredleContext'
import App from './App'
import { TriviaContextProvider } from './context/trivia-context/triviaContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <AppContextProvider>
    <BoredleContextProvider>
      <TriviaContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TriviaContextProvider>
    </BoredleContextProvider>
  </AppContextProvider>
)
