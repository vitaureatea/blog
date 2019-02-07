import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import '../css/login.css'
import UserService from '../service/user';
import {observer} from "mobx-react";


const service = new UserService();
//这是爹
export default class Reg extends React.Component {
    render () {
        return <_Reg service={service} />;
    }
}

//从爹拿props
@observer
class _Reg extends React.Component {
    
    handleClick(event) {
        event.preventDefault();
        let fm = event.target.form;
        //判断是不是邮箱
        let sReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (! sReg.test(fm[1].value)) {
            alert('邮箱地址错误');
        }
        else {
            if (fm[2].value.length >= 6 ) {
                if (fm[2].value == fm[3].value) {
                    this.props.service.reg(fm[0].value, fm[1].value, fm[2].value);
                    //React中的每一个组件，都包含有一个属性（props），属性主要是从父组件传递给子组件的
                    //，在组件内部，我们可以通过this.props获取属性对象
                } else {
                    alert('两次密码不一致！');
                    console.log('error');
                }
            }
            else {
                alert('密码长度不足6位');
                console.log('error')
            }
        }
    }

    render () {
        if (this.props.service.ret != -1) {
            return (<Redirect to='/login'/>);
        }
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