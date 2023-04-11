import axios from "axios";
import React, { useEffect, useState } from "react";
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

// type Props = {
//   Posts: PostType[]; // 投稿オブジェクトの配列を表すプロパティ
// };

const Timeline = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(
        "/posts/timeline/6423ab27b2b09fbadf06372a"
      );
      const fetchedPosts = response.data;
      setPosts(fetchedPosts);
    };
    fetchPosts();
  }, []);
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
