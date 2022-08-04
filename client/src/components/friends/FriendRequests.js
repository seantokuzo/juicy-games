import React, { useState } from 'react'
import { useAppContext } from '../../context/appContext'
import MapFriends from './MapFriends'
// import { FaUserPlus, FaRegTrashAlt } from 'react-icons/fa'
// import Avatar from '../Avatar'

const FriendRequests = () => {
  const { friendsData, showAlert, isLoading } = useAppContext()
  const { friendRequestsSent, friendRequestsReceived } = friendsData
  const [view, setView] = useState('received')

  const toggleRequests = () => {
    if (view === 'sent') return setView('received')
    if (view === 'received') return setView('sent')
  }

  return (
    <div className="friends__map">
      <h1 className="friends__title title">
        {view === 'sent' && 'Sent Requests'}
        {view === 'received' && 'Requested You'}
      </h1>
      {/* {view === 'sent' && requestList(friendRequestsSent)}
      {view === 'received' && requestList(friendRequestsReceived, 'received')} */}
      {view === 'sent' && (
        <MapFriends dataArray={friendRequestsSent} type="sent" />
      )}
      {view === 'received' && (
        <MapFriends dataArray={friendRequestsReceived} type="received" />
      )}
      <button
        type="button"
        className="btn btn-theme form-btn"
        onClick={toggleRequests}
        disabled={isLoading || showAlert}
      >
        {view === 'sent' && 'Requested You'}
        {view === 'received' && 'Requests Sent'}
      </button>
    </div>
  )
}

export default FriendRequests

// const requestList = (requestArray, type) => {
//   if (requestArray && requestArray.length > 0) {
//     return requestArray.map((req) => (
//       <div key={req.username} className="friends__map-request">
//         <div className="friends__map-details">
//           <div className="friends__map-details-top">
//             <Avatar
//               type={req.avatar}
//               avatarClass="friends__avatar"
//               defaultClass="friends__avatar--default"
//             />
//             <p className="friends__map-username">{req.username}</p>
//           </div>
//           <p className="friends__map-email text-mini">{req.email}</p>
//         </div>
//         {type === 'received' && (
//           <div className="friends__map-btns">
//             <button
//               type="button"
//               className="btn friends__map-btns-btn btn friends__map-btns-btn-add"
//               onClick={() => respondToFriendRequest(req.email, 'accept')}
//             >
//               <FaUserPlus />
//             </button>
//             <button
//               type="button"
//               className="btn friends__map-btns-btn"
//               onClick={() => respondToFriendRequest(req.email, 'reject')}
//             >
//               <FaRegTrashAlt />
//             </button>
//           </div>
//         )}
//       </div>
//     ))
//   }
//   return <p className="friends__map-nada text">Nothing to see here</p>
// }
