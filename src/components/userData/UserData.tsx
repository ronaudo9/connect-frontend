import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
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

const UserData = ({ user }: Props) => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <>
      <Link
        to={`/profile/${user?.username}`}
        //Linkコンポーネントで囲った事による文字の色の変更を防ぐ
        style={{ textDecoration: "none", color: "black" }}
      >
        <li>
          <img
            src={
              user.profilePicture
                ? PUBLIC_FOLDER + user.profilePicture
                : PUBLIC_FOLDER + "/person/noAvatar.png"
            }
            alt=""
            className="userInfoImg"
          />
          <span className="userName">{user.username}</span>
          <div className="userInfoIcon">
            <ArrowForwardIosIcon />
          </div>
        </li>
      </Link>
    </>
  );
};

export default UserData;
