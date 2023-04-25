import { Analytics, Face, Gif, Image, TransgenderTwoTone } from "@mui/icons-material";
import axios from "axios";
import React, { FormEvent, useContext, useRef, useState } from "react";
import { AuthContext } from "../../state/AuthContext";
import "./Share.css";

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

const Share = () => {
  //Fileは、TypeScriptに組み込まれた型定義
  const [file,setFile] = useState<File | null>(null);


  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const desc = useRef<HTMLInputElement | null>(null);

  const { user } = useContext(AuthContext);

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newPost = {
      userId: currentUser?._id,
      desc: desc.current?.value,
      img:"",
    };

    if(file) {
      //FormData()はキーとvalueを合わせてデータとして残しておくJavaScriptの組み込み関数
      const data = new FormData();
      //Date.now()は現在の時間をミリ秒単位で表す数値を返すJavaScriptの組み込み関数
      const fileName = Date.now() + file.name;
      //fileNameをkeyに設定
      data.append("name",fileName);
      //fileをvalueに設定
      data.append("file",file);
      newPost.img = fileName;
      try {
        //画像APIを叩く
        await axios.post("/upload",data);
      }catch(err){
        console.log(err);
      }
    }

    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={
              currentUser?.profilePicture
                ? PUBLIC_FOLDER + currentUser?.profilePicture
                : PUBLIC_FOLDER + "/person/noAvatar.png"
            }
            alt=""
            className="shareProfileImg"
          />
          <input
            type="text"
            className="shareInput"
            placeholder="今何してるの？"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />

        <form className="shareButtons" onSubmit={(e) => handleSubmit(e)}>
          <div className="shareOptions">
            <label className="shareOption" htmlFor="file">
              <Image className="shareIcon" htmlColor="blue" />
              <span className="shareOptionText">写真</span>
              <input
                type="file"
                id="file"
                accept=".png, .jpeg, .jpg"
                style={{ display: "none" }}
                onChange = {(e) => e.target.files && setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Gif className="shareIcon" htmlColor="hotpink" />
              <span className="shareOptionText">GIF</span>
            </div>
            <div className="shareOption">
              <Face className="shareIcon" htmlColor="green" />
              <span className="shareOptionText">気持ち</span>
            </div>
            <div className="shareOption">
              <Analytics className="shareIcon" htmlColor="red" />
              <span className="shareOptionText">投票</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            投稿
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
