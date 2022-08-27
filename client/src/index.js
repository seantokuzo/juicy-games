import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppContextProvider } from './context/appContext'
import { BoredleContextProvider } from './context/boredle-context/boredleContext'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <AppContextProvider>
    <BoredleContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </BoredleContextProvider>
  </AppContextProvider>
)
