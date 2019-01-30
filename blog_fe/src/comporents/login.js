import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../css/login.css'

export default class Login extends React.Component {
    render () {
      return (
        <div className="login-page">
            <div className="form">
                <form className="login-form">
                    <input type="text" placeholder="邮箱" />
                    <input type="password" placeholder="密码" />
                    <button>登陆</button>
                    <p className="message">没有账号？<a href="#">注册用户</a></p>
                </form>
            </div>
        </div>
      );
    }
  }
  