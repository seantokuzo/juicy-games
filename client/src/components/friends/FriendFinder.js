import React, { useState } from 'react'
import FormRow from '../FormRow'

const FriendFinder = () => {
  const [search, setSearch] = useState('')

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
    </div>
  )
}

export default FriendFinder
