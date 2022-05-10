import React from 'react'

export default function Header() {
  const pfp = <i className="fa-solid fa-user header__pfp-icon"></i>

  return (
    <header className="header">
      <div className="header__pfp-div">{pfp}</div>
    </header>
  )
}
