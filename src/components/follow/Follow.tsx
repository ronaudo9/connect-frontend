import { Button } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../state/AuthContext";
import "./Follow.css";

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

type Props = {
  username?: string; // usernameプロパティを追加
};

const Follow = (username:Props) => {
  const { user } = useContext(AuthContext);

  const [following, setFollowing] = useState<User[]>([]);

  const followingFind = () => {
    return following.find((user) => user.username === username.username)
  }

const result = followingFind();
// console.log(result?._id);


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

  const FollowingUser = {
    userId:currentUser?._id
  }

  useEffect(() => {
    const fetchPosts = async () => {
      //フォローしているユーザーの情報の取得
      const response = await axios.get(`/users/${currentUser?._id}/followings`);
      setFollowing(response.data);
    };
    fetchPosts();
  }, [currentUser?._id]);

  const UnFollowing = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try{
    await axios.put(`/users/${result?._id}/unfollow`,FollowingUser);
    window.location.reload();
  }catch(err){
    console.log(err);
  }
  };

  const Following = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try{
      const response = await axios.get(`/users?username=${username.username}`);
      const fetchData = response.data;
      const fetchDataId = fetchData._id;
      await axios.put(`/users/${fetchDataId}/follow`,FollowingUser);
      window.location.reload();
    }catch(err){
      console.log(err)
    }
  };


  return (
    <div className="follow">
      <div className="followWrapper">
        {result?
        (<button className="followButton" onClick={(e) => UnFollowing(e)}>フォロー解除</button>):
        (<button className="unFollowButton" onClick={(e) => Following(e)}>フォローする</button>)
      }
      </div>
    </div>
  );
};

export default Follow;
