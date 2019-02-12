import { resolve } from "path";
import { rejects } from "assert";
import axios from "axios";
import store from "store";
import {observable} from 'mobx'

store.addPlugin(require('store/plugins/expire'));//token过期插件


//由于不用于前端展示，所以不用继承那个 React.Component 是纯es6 类,不是组件
export default class UserService {
    @observable ret = -1;
    @observable errMsg = '';

    login(email,password) {

        axios.post('/api/user/login', {
            'email': email,
            'password': password
            // api 为react的路由
        }).then(response => {
            console.log(response.data);
            //localstorage 本地化存储token 和 过期设定 固定写法
            store.set('token',response.data.token,(new Date()).getTime() + (2*3600*1000));
            this.ret = Math.random() * 100;
        }).catch( error => {
            this.errMsg = '登录失败，请检查登录信息';
            console.log(error);
        })
    }


    reg(name,email,password) {

        axios.post('/api/user/reg', {
            'name': name,
            'email': email,
            'password': password
            // api 为react的路由
        }).then(response => {
            console.log(response.data);
            //localstorage 本地化存储token 和 过期设定 固定写法
            //store.set('token',response.data.token,(new Date()).getTime() + (15*60*1000));
            this.ret = Math.random() * 100;
        }).catch( error => {
            this.errMsg = '注册失败，请检查数据';
            console.log(error);
        })
    }
}

