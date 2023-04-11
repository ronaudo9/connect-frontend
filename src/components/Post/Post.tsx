import { MoreVert } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Post.css";
// import { Users } from "../../dummyData";

// type Props = {
//   post: {
//     id: number;
//     desc?: string;//?とすることでnullも許容する
//     photo?: string;
//     date: string;
//     userId: number;
//     like: number;
//     comment: number;
//   }
// };
type Props = {
  post: {
    _id: string;
    userId: string;
    desc: string;
    img: string;
    likes: Array<string>;
    createdAt: number;
    updatedAt: number;
    __v: number;
  };
};

type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
  profilePicture: string;
  coverPicture: string;
  followers: string[];
  followings: string[];
  isAdmin: boolean;
  createdAt: number;
  updatedAt: number;
  __v: number;
};

const Post = ({ post }: Props) => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER || "";
  const [like, setLike] = useState<number>(post?.likes.length);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/users/${post.userId}`);
      const fetchedUser = response.data;
      setUser(fetchedUser);
    };
    fetchUser();
  }, []);

  const handleLike = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              src={user?.profilePicture || PUBLIC_FOLDER + "/person/noAvatar.png"}
              // {PUBLIC_FOLDER + Users.filter((user) => user.id === post.userId)[0].profilePicture}
              alt=""
              className="postProfileImg"
            />
            <span className="postUsername">{user?.username}</span>
            <span className="postDate">{post?.createdAt}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img src={PUBLIC_FOLDER + post?.img} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src={PUBLIC_FOLDER + "/heart.png"}
              alt=""
              className="likeIcon"
              onClick={() => handleLike()}
            />
            <span className="postLikeCounter">{`${like}人がいいねを押しました`}</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post?.__v}:コメント</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
