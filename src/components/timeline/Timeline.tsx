import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../state/AuthContext";
import Post from "../Post/Post";
import Share from "../share/Share";
import "./Timeline.css";
// import { Posts } from "../../dummyData";

type Post = {
  _id: string;
  userId: string;
  desc: string;
  img: string;
  likes: Array<string>;
  createdAt: number;
  updatedAt: number;
  __v: number;
};

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

// type Props = {
//   Posts: PostType[]; // 投稿オブジェクトの配列を表すプロパティ
// };
type Props = {
  username?: string; // usernameプロパティを追加
};

const Timeline = ({ username }: Props) => {
  const [posts, setPosts] = useState<Post[]>([]);

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

  const { user } = useContext(AuthContext);

  const currentUser = user ? user : defaultUser;

  useEffect(() => {
    const fetchPosts = async () => {
      const response = username
        ? await axios.get(`/posts/profile/${username}`) //プロフィールの場合
        : await axios.get(`/posts/timeline/${currentUser?._id}`); //ホームの場合
      setPosts(
        response.data.sort((post1:Post, post2:Post) => {
          return new Date(post2.createdAt).getTime() - new Date(post1.createdAt).getTime();
        })
      );
    };
    fetchPosts();
  }, [username, currentUser?._id]);
  return (
    <div className="timeline">
      <div className="timelineWrapper">
        <Share />
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
};

export default Timeline;
