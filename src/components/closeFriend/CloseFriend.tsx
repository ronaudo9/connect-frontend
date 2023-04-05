import React from "react";

type Props = {
  user: {
    id: number;
    profilePicture: string;
    username: string;
  }
};

const CloseFriend = ({user}:Props) => {
  return (
    <li className="sidebarFriend">
      <img src={user.profilePicture} alt="" className="sidebarFriendImg" />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
};

export default CloseFriend;
