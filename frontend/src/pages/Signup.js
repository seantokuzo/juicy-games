import React from 'react'

export default function Signup() {
  

  return (
    <section className="signup page">
      <form className="form form__login">
        <div className="form__group">
          <label className="form__label" htmlFor="login-email">
            Email
          </label>
          <input
            className="form__input"
            id="login-email"
            type="email"
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="login-password">
            Password
          </label>
          <input
            className="form__input"
            id="login-password"
            type="password"
            placeholder="••••••••"
            minLength="8"
            required
          />
        </div>
      </form>
    </section>
  )
}
