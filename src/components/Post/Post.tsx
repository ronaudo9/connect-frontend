import { MoreVert } from "@mui/icons-material";
import React, { useState } from "react";
import "./Post.css";
import { Users } from "../../dummyData";


type Props = {
  post: {
    id: number;
    desc?: string;//?とすることでnullも許容する
    photo?: string;
    date: string;
    userId: number;
    like: number;
    comment: number;
  }
};

const Post = ({ post }: Props) => {
  const [like, setLike ] = useState<number>(post.like);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleLike = () => {
    setLike(isLiked? like -1 : like + 1);
    setIsLiked(!isLiked);
  }
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              src={Users.filter((user) => user.id === post.userId)[0].profilePicture}
              alt=""
              className="postProfileImg"
            />
            <span className="postUsername">{Users.filter((user) => user.id === post.userId)[0].username}</span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          <img src={post.photo} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img src="./assets/heart.png" alt="" className="likeIcon" onClick = {() => handleLike()}/>
            <span className="postLikeCounter">{`${like}人がいいねを押しました`}</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment}:コメント</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
