import React from 'react'

type Props = {
  user: {
    id: number;
    profilePicture: string;
    username: string;
  }
};

const Online = ({user}:Props) => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="rightbarFriend">
    <div className="rightbarProfileImgContainer">
      <img
        src={PUBLIC_FOLDER + user.profilePicture}
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
