import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'

export default function Welcome() {
  const welcomeRef = useRef()
  const q = gsap.utils.selector(welcomeRef)

  useEffect(() => {
    gsap.from(q('.welcome__title'), { x: -100 })
  }, [])

  return (
    <section className="welcome page" ref={welcomeRef}>
      <h1 className="welcome__title page__title">Welcome to Shnoggle</h1>
      <div className="welcome__links-div">
        <Link to="/login">
          <h3 className="welcome__link welcome__link--login">Login</h3>
        </Link>
        <Link to="/signup">
          <h3 className="welcome__link welcome__link--signup">
            Create an Account
          </h3>
        </Link>
        <Link to="/game">
          <h3 className="welcome__link welcome__link--guest">Play as Guest</h3>
        </Link>
      </div>
    </section>
  )
}
