import React, { useState } from 'react'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'
import { useAppContext } from '../../context/appContext'
import MapFriends from './MapFriends'

const FriendsList = () => {
  const [page, setPage] = useState(1)
  const {
    friendsData: { friends }
  } = useAppContext()

  const limit = 3
  const numPages = Math.ceil(friends.length / limit)

  const changePage = (arg) => {
    if (typeof arg === 'number') {
      setPage(arg)
      return
    }
    if (arg === 'prev') {
      if (page > 1) return setPage(page - 1)
      if (page === 1) return setPage(numPages)
    }
    if (arg === 'next') {
      if (page < numPages) return setPage(page + 1)
      if (page === numPages) return setPage(1)
    }
  }

  const pageToggles = numPages > 1 && (
    <div className="toggles">
      {numPages > 1 && (
        <AiFillCaretLeft
          className="toggles__page toggles__page-caret"
          onClick={() => changePage('prev')}
        />
      )}
      {new Array(numPages).fill(1).map((x, i) => {
        return (
          <p
            key={`friend-list-toggle${i + 1}`}
            className={
              i + 1 === page
                ? 'toggles__page toggles__page-number--current'
                : 'toggles__page toggles__page-number'
            }
            onClick={() => changePage(i + 1)}
          >
            {i + 1}
          </p>
        )
      })}
      <AiFillCaretRight
        className="toggles__page toggles__page-caret"
        onClick={() => changePage('next')}
      />
    </div>
  )

  return (
    <div className="friends__map">
      <MapFriends dataArray={friends} type="list" page={page} limit={limit} />
      {pageToggles}
    </div>
  )
}

export default FriendsList
