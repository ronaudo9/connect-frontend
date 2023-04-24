import {
  Bookmark,
  Home,
  MessageOutlined,
  Notifications,
  Person,
  Search,
  Settings,
} from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import CloseFriend from "../closeFriend/CloseFriend";
import "./Sidebar.css";
// import { Users } from "../../dummyData";
import { Link } from "react-router-dom";
import { AuthContext } from "../../state/AuthContext";
import axios from "axios";

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

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  const [closeFriend, setCloseFriend] = useState<User[]>([]);

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

  const currentUser = user ? user : defaultUser;

  useEffect(() => {
    const fetchPosts = async () => {
      //フォローしているユーザーの情報の取得
      const response = await axios.get(`/users/${currentUser?._id}/followings`);
      setCloseFriend(response.data);
    };
    fetchPosts();
  }, [currentUser?._id]);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Home className="sidebarIcon" />
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <span className="sidebarListItemText">ホーム</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Search className="sidebarIcon" />
            <span className="sidebarListItemText">検索</span>
          </li>
          <li className="sidebarListItem">
            <Notifications className="sidebarIcon" />
            <span className="sidebarListItemText">通知</span>
          </li>
          <li className="sidebarListItem">
            <MessageOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">メッセージ</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">ブックマーク</span>
          </li>
          <li className="sidebarListItem">
            <Person className="sidebarIcon" />
            <Link
              to={`/profile/${currentUser?.username}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <span className="sidebarListItemText">プロフィール</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Settings className="sidebarIcon" />
            <span className="sidebarListItemText">設定</span>
          </li>
        </ul>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {closeFriend.map((user) => (
            <CloseFriend user={user} key={user._id} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
