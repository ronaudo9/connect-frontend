import React, { useContext, useEffect, useState } from "react";
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Timeline from '../../components/timeline/Timeline'
import Topbar from '../../components/topbar/Topbar'
import { useParams } from "react-router-dom";
import { AuthContext } from "../../state/AuthContext";
import "./UserList.css"
import axios from "axios";
import UserInfo from "../../components/userInfo/UserInfo";

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

const UserList = () => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const [user, setUser] = useState<User | null>(null);
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/users?username=${username}`);
      const fetchedUser = response.data;
      setUser(fetchedUser);
    };
    fetchUser();
  }, [username]);

  const { user:users } = useContext(AuthContext);

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

  return (
    <>
    <Topbar/>
    <div className="profile">
      <Sidebar />
      <div className="profileRight">
        <div className="profileRightTop">
          <div className="profileCover">
            <img
              src={ PUBLIC_FOLDER + "/post/5.jpeg"}
              alt=""
              className="profileCoverImg"
            />
          </div>
          <div className="profileInfo">
            {/* <h4 className="profileInfoName">{user?.username}</h4>
            <span className="profileInfoDesc">{user?.desc}</span>
            <span className = "profileInfoButton">{query?"":<Follow username={username}/>}</span> */}
          </div>
        </div>
        <div className="profileRightBottom">
          <UserInfo />
          <Rightbar user={user}/>
        </div>
      </div>
    </div>
  </>
  )
}

export default UserList
