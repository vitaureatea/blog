import { resolve } from "path";
import { rejects } from "assert";
import axios from "axios";
import store from "store";
import {observable} from 'mobx'


store.addPlugin(require('stor/plugins/expire'));

//由于不用于前端展示，所以不用继承那个 React.Component 是纯es6 类,不是组件
export default class UserService {
    @observable ret = -1;

    login(email,password) {

        axios.post('/api/user/login', {
            'email': email,
            'password': password
            // api 为react的路由
        }).then(response => {
            console.log(response.data);
            this.ret = Math.random() * 100;
        }).catch( error => {
            console.log(error);
        })
    }
}



