import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import '../css/login.css'
import UserService from '../service/user';
import {observer} from 'mobx-react'
import {message} from 'antd'
import 'antd/lib/message/style'


@observer
export default class Login extends React.Component {

    constructor (props) {
        super(props)
        this.service = new UserService();
    }

    handleClick(event) {
        event.preventDefault();
        //preventDefault() 方法阻止元素发生默认的行为（例如，当点击提交按钮时阻止对表单的提交）。
        //event.target 是触发事件 是button按钮  event.target.form 是form区间这一大堆 event.target.form[0] 就是form区间里的第一个组件 第一个input so！！！！
        let fm = event.target.form;
        //fm[0].value email
        //fm[1].value password
        //就拿到了input里的值,然后传给 userservice类
        this.service.login(fm[0].value, fm[1].value, this)
    }

    render () {
        if (this.service.ret != -1) {
            return (<Redirect to='/' />);
        }
        if (this.service.errMsg) {
            message.info(this.service.errMsg,3,()=>{
                this.service.errMsg = '';
            });
        }
      return (
        <div className="login-page">
            <div className="form">
                <form className="login-form">
                    <input type="text" placeholder="邮箱" />
                    <input type="password" placeholder="密码" />
                    <button onClick={this.handleClick.bind(this)}>登陆</button>
                    <p className="message">没有账号？<a href="/reg">注册用户</a></p>
                </form>
            </div>
        </div>
      );
    }
  }
  