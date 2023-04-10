import React from "react";

type Props = {
  user: {
    id: number;
    profilePicture: string;
    username: string;
  }
};

const CloseFriend = ({user}:Props) => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
      <img src={PUBLIC_FOLDER + user.profilePicture} alt="" className="sidebarFriendImg" />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
};

export default CloseFriend;
