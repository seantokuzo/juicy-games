import React from 'react'

export default function Login() {
  return (
    <section className="login page">
      <h1>Login</h1>
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

// .form__group
//           label.form__label(for='signup-name') Name
//           input#signup-name.form__input(type='name', required)
//         .form__group
//           label.form__label(for='signup-email') Email address
//           input#signup-email.form__input(type='email', placeholder='you@example.com', required)
//         .form__group.ma-bt-md
//           label.form__label(for='signup-password') Password (minimum 8 characters)
//           input#signup-password.form__input(type='password', placeholder='••••••••', required, minlength='8')
//         .form__group.ma-bt-md
//           label.form__label(for='signup-password-confirm') Confirm your password
//           input#signup-password-confirm.form__input(type='password', placeholder='••••••••', required, minlength='8')
//         .form__group
//           button.btn.btn--green Signup
