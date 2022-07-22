import React, { useState } from 'react'

const MyPassword = () => {
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const handlePasswordChange = (e) => {
    e.preventDefault()
    console.log(e.target)
  }

  return (
    <div className="password">
      <form className="form password-form" onSubmit={handlePasswordChange}>
        <FormRow
          type="password"
          name="password"
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
        />
        <FormRow
          type="password"
          name="passwordConfirm"
          value={passwordConfirm}
          handleChange={(e) => setPasswordConfirm(e.target.value)}
        />
      </form>
    </div>
  )
}

export default MyPassword
