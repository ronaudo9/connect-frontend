import React, { useContext } from "react";
import { Search } from "@mui/icons-material";
import { Chat } from "@mui/icons-material";
import { Notifications } from "@mui/icons-material";
import "./Topbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../state/AuthContext";

type User = {
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

const Topbar = () => {
  const { user: users } = useContext(AuthContext);

  const defaultUser: User = {
    _id: "",
    username: "",
    email: "",
    profilePicture: "",
    coverPicture: "",
    followers: [],
    followings: [],
    isAdmin: false,
    createdAt: 0,
    __v: 0,
    desc: "",
  };

  const currentUser = users ? users : defaultUser;

  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER || "";

  const logOut = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    localStorage.setItem("user", JSON.stringify(null));
    window.location.reload();
  };
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Connect</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            type="text"
            className="searchInput"
            placeholder="探し物は何ですか？"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarItemIcons">
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">2</span>
          </div>
          {/* <Link to={`/profile/${currentUser?.username}`}> */}
          <div className="topbarImage">
            <div className="logOut">
              <img
                src={
                  currentUser?.profilePicture
                    ? PUBLIC_FOLDER + currentUser?.profilePicture
                    : PUBLIC_FOLDER + "/person/noAvatar.png"
                }
                alt=""
                className="topbarImg"
                onClick={(e) => logOut(e)}
              />
            </div>
          </div>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
