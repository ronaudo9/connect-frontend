import React from 'react'

type Props = {
  user: {
    id: number;
    profilePicture: string;
    username: string;
  }
};

const Online = ({user}:Props) => {
  return (
    <li className="rightbarFriend">
    <div className="rightbarProfileImgContainer">
      <img
        src={user.profilePicture}
        alt=""
        className="rightbarProfileImg"
      />
      <span className="rightbarOnline"></span>
    </div>
    <span className="rightbarUsername">{user.username}</span>
  </li>
  )
}

export default Online
