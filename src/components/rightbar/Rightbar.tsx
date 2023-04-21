import React, { useContext, useEffect, useState } from "react";
import Online from "../online/Online";
import "./Rightbar.css";
import { Users } from "../../dummyData";
import { AuthContext } from "../../state/AuthContext";
import axios from "axios";
import ProfileRightbar from "../profileRightbar/ProfileRightbar";

type user = {
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
  //?がないとHome.tsxでエラー。nullがないとProfile.tsxでエラーが発生。
  user?: user | null;
};

const Rightbar = ({ user }: Props) => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const [onlineUsers, setOnlineUsers] = useState<user[]>([]);


  const { user:users } = useContext(AuthContext);

  const defaultUser: user = {
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

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(`/users/${currentUser?._id}/followings`); //ホームの場合
      setOnlineUsers(response.data);
    };
    fetchPosts();
  }, [currentUser?._id]);

  const HomeRightbar = () => {
    return (
      <>
        <div className="eventContainer">
          <img src={PUBLIC_FOLDER + "/star.png"} alt="" className="starImg" />
          <span className="eventText">
            <b>フォロワー限定</b>イベント開催中！
          </span>
        </div>
        <img src={PUBLIC_FOLDER + "/ad.jpeg"} alt="" className="eventImg" />
        <h4 className="rightbarTitle">オンラインの友達</h4>
        <ul className="rightbarFriendList">
          {onlineUsers.map((user) => (
            <Online user={user} key={user._id} />
          ))}
        </ul>
        <p className="promotionTitle">プロモーション広告</p>
        <img
          src={PUBLIC_FOLDER + "/promotion/promotion1.jpeg"}
          alt=""
          className="rightbarPromotionImg"
        />
        <p className="promotionName">ショッピング</p>
        <img
          src={PUBLIC_FOLDER + "/promotion/promotion2.jpeg"}
          alt=""
          className="rightbarPromotionImg"
        />
        <p className="promotionName">カーショップ</p>
        <img
          src={PUBLIC_FOLDER + "/promotion/promotion3.jpeg"}
          alt=""
          className="rightbarPromotionImg"
        />
        <p className="promotionName">messi株式会社</p>
      </>
    );
  };

  const ProfileRight = () => {
    return (
      <>
        <h4 className="rightbarTitle">ユーザー情報</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">出身：</span>
            <span className="rightbarInfoKey">アルゼンチン</span>
          </div>
          <h4 className="rightbarTitle">あなたの友達</h4>
          <ul className="rightbarFollowings">
          {onlineUsers.map((user) => (
            <ProfileRightbar user={user} key={user._id} />
          ))}
            {/* <div className="rightbarFollowing">
              <img
                src={PUBLIC_FOLDER + "/person/2.jpeg"}
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">Yamaki</span>
            </div>
            <div className="rightbarFollowing">
              <img
                src={PUBLIC_FOLDER + "/person/3.jpeg"}
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">Koga</span>
            </div>
            <div className="rightbarFollowing">
              <img
                src={PUBLIC_FOLDER + "/person/4.jpeg"}
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">Matukubo</span>
            </div>
            <div className="rightbarFollowing">
              <img
                src={PUBLIC_FOLDER + "/person/5.jpeg"}
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">Kikukawa</span>
            </div> */}
          </ul>
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRight /> : <HomeRightbar />}
      </div>
    </div>
  );
};

export default Rightbar;
