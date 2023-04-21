import React, { useContext, useRef } from "react";
import "./Login.css";
import { FormEvent } from 'react';
import { loginCall } from "../../state/ActionCalls";
import { AuthContext } from "../../state/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const email = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const {user,isFetching,error,dispatch} = useContext(AuthContext)
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    //フォームが送信された時にページがリロードされるのを防ぐ
    e.preventDefault();
  //  console.log(email.current?.value)
  //  console.log(password.current?.value)
  loginCall(
    {
      email: email.current?.value,
      password: password.current?.value,
    },
    dispatch
  )
  };
  // console.log(user)
  const register=(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    navigate("/register");
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Connect</h3>
          <span className="loginDesc">本格的なSNSを、自分の手で。</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit = {(e) => handleSubmit(e)}>
            <p className="loginMsg">ログインはこちら</p>
            <input
              type="email"
              className="loginInput"
              placeholder="Eメール"
              required
              ref = {email}
            />
            <input
              type="password"
              className="loginInput"
              placeholder="パスワード"
              required
              minLength={6}
              ref={password}
            />
            <button className="loginButton">ログイン</button>
            <span className="loginForgot">パスワードを忘れた方へ</span>
            <button className="loginRegisterButton" onClick={(e) => register(e)}>アカウント作成</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
