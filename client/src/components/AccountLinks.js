import React from 'react'
import { useLocation } from 'react-router-dom'
import ButtonLink from './ButtonLink'

const AccountLinks = () => {
  const { pathname } = useLocation()

  const accountLinkClasses = 'btn-theme link account__links-link'

  return (
    <div className="links-div">
      {pathname !== '/me/account' && (
        <ButtonLink
          path="/me/account"
          btnClass={accountLinkClasses}
          text="Account"
        />
      )}
      {pathname !== '/me/friends' && (
        <ButtonLink
          path="/me/friends"
          btnClass={accountLinkClasses}
          text="Friends"
        />
      )}
      {pathname !== '/me/games' && (
        <ButtonLink
          path="/me/games"
          btnClass={accountLinkClasses}
          text="Games"
        />
      )}
    </div>
  )
}

export default AccountLinks
