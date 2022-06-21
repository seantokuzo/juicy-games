import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import { gsap } from 'gsap'

export default function Welcome() {
  const { categories, retrieveCategories, updateGameOptions } = useAppContext()
  const welcomeRef = useRef()
  const q = gsap.utils.selector(welcomeRef)
  console.log(categories)
  
  useEffect(() => {
    gsap.from(q('.welcome__title'), { x: -100 })
  }, [])

  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then((res) => res.json())
      .then((data) => {
        // setGameOptions((prev) => ({
        //   ...prev,
        //   category: data.trivia_categories[0].id.toString()
        // }))
        updateGameOptions('category', data.trivia_categories[0].id.toString())
        retrieveCategories(
          data.trivia_categories.slice(0, data.trivia_categories.length - 2)
        )
      })
      .catch((err) => console.log(err))
  }, [])

  // const loginForm = (
  //   <form className="form form__login">
  //     <div className="form__group">
  //       <label className="form__label" htmlFor="login-email">
  //         Email
  //       </label>
  //       <input
  //         className="form__input"
  //         id="login-email"
  //         type="email"
  //         placeholder="you@example.com"
  //         required
  //       />
  //     </div>
  //     <div className="form__group">
  //       <label className="form__label" htmlFor="login-password">
  //         Password
  //       </label>
  //       <input
  //         className="form__input"
  //         id="login-password"
  //         type="password"
  //         placeholder="••••••••"
  //         minLength="8"
  //         required
  //       />
  //     </div>
  //   </form>
  // )

  return (
    <section className="welcome page" ref={welcomeRef}>
      <h1 className="welcome__title page__title">Trivial Trivia</h1>
      <div className="welcome__links-div">
        {/* {loginForm} */}
        {/* <Link to="/signup">
          <h3 className="welcome__link welcome__link--signup">
            Create an Account
          </h3>
        </Link> */}
        <Link to="/game">
          <h3 className="welcome__link welcome__link--guest">Play as Guest</h3>
        </Link>
      </div>
    </section>
  )
}
