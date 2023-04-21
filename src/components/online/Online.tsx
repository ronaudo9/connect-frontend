import React from 'react'

type Props = {
  user: {
    _id: string;
  username: string;
  email: string;
  profilePicture: string;
  coverPicture: string;
  followers: string[];
  followings: string[];
  isAdmin: boolean;
  createdAt: number;
  __v: number;
  desc?: string;
  }
};

const Online = ({user}:Props) => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="rightbarFriend">
    <div className="rightbarProfileImgContainer">
      <img
        src={user.profilePicture?PUBLIC_FOLDER + user.profilePicture:PUBLIC_FOLDER + "/person/noAvatar.png"}
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
