import React from "react";
import { Link } from "react-router-dom";

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
  };
};

const ProfileRightbar = ({ user }: Props) => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <Link
    to={`/profile/${user?.username}`}
    //Linkコンポーネントで囲った事による文字の色の変更を防ぐ
    style={{ textDecoration: "none", color: "black" }}
  >
    <li className="rightbarFollowing">
        <img
          src={
            user.profilePicture
              ? PUBLIC_FOLDER + user.profilePicture
              : PUBLIC_FOLDER + "/person/noAvatar.png"
          }
          alt=""
          className="rightbarFollowingImg"
        />
      <span className="rightbarFollowingName">{user.username}</span>
    </li>
    </Link>
  );
};

export default ProfileRightbar;
