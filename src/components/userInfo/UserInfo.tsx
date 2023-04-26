import React, { useContext, useEffect, useState } from 'react'
import "./UserInfo.css"
import axios from 'axios';
import { AuthContext } from '../../state/AuthContext';
import UserData from '../userData/UserData';

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

const UserInfo = () => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const [userAllData,setUserAllData] = useState<User[]>([]);
 

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
    const UserAll = async () => {
      try{
      const response = await axios.get(`/users/${currentUser?._id}/userList`);
      setUserAllData(response.data);
    }catch(err){
      console.log(err);
    }
    }
    UserAll();
  },[]);
  return (
    <div className="userInfo">
      <div className="userInfoWrapper">
       <ul className="userIndex">
       {userAllData.map((user) => (
            <UserData user={user} key={user._id} />
          ))}
       </ul>
      </div>
    </div>
  )
}

export default UserInfo;
