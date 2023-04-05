import React from "react";
import Post from "../Post/Post";
import Share from "../share/Share";
import "./Timeline.css"
import { Posts } from "../../dummyData";


// type PostType = {
//   id: number;
//   desc: string;
//   photo: string;
//   date: string;
//   userId: number;
//   like: number;
//   comment: number;
// };

// type Props = {
//   Posts: PostType[]; // 投稿オブジェクトの配列を表すプロパティ
// };

const Timeline = () => {

  return(
  <div className="timeline">
  <div className="timelineWrapper">
    <Share />
    {Posts.map((post) => (
      <Post post={post} key={post.id}/>
    ))}
  </div>
  </div>
  );
};

export default Timeline;
