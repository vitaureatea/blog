import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../css/login.css'
import UserService from '../service/user';

const service = new UserService();

//这是爹
export default class Reg extends React.Component {
    render () {
        return <_Reg service={service} />;
    }
}

//从爹拿props
class _Reg extends React.Component {
    
    handleClick(event) {
        event.preventDefault();
        let fm = event.target.form;
        let ret = this.props.service.login(fm[0].value,fm[1].value)
        //React中的每一个组件，都包含有一个属性（props），属性主要是从父组件传递给子组件的
        //，在组件内部，我们可以通过this.props获取属性对象
    }

    render () {
      return (
        <div className="login-page">
            <div className="form">
                <form className="login-form">
                    <input type="text" placeholder="昵称" />
                    <input type="email" placeholder="邮箱" />
                    <input type="password" placeholder="密码" />
                    <input type="password" placeholder="确认密码" />
                    <button onClick={this.handleClick.bind(this)}>注册</button>
                    <p className="message">如果已注册<a href="/login">请登录</a></p>
                </form>
            </div>
        </div>
      );
    }
  }