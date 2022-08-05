import React, { useState, useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import MapFriends from './MapFriends'
import FormRow from '../FormRow'

const FriendFinder = () => {
  const [search, setSearch] = useState('')
  const {
    getUsers,
    friendFinderData: { users, totalUsers, numOfPages }
  } = useAppContext()
  console.log({ users, totalUsers, numOfPages })

  useEffect(() => {
    if (search) getUsers(search)
  }, [search])

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  return (
    <div className="friends__finder">
      <form className="friends__form">
        <FormRow
          first={true}
          type="text"
          name="search"
          value={search}
          handleChange={handleChange}
          labelText="Search by Username"
        />
      </form>
      <MapFriends dataArray={users} type="finder" />
    </div>
  )
}

export default FriendFinder
