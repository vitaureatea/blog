import { resolve } from "path";
import { rejects } from "assert";
import axios from "axios";


//由于不用于前端展示，所以不用继承那个 React.Component 是纯es6 类,不是组件
export default class UserService {
    login(email,password,obj) {
        // new Promise((resolve,reject)=>{
        //     setTimeout(()=>{
        //         console.log('timeout');
        //         resolve('ok');
        //     }, 5*1000);
        // }).then(value =>{
        //     obj.setState({'ret': parseInt(Math.random() * 100)})
        //     console.log('...')
        // })
//Promise一建立，setTimeout就执行了，setTimeout的执行是卡5秒，由于Promise是异步的，所以Promise函数直接就通过了，程序会去执行其他的步骤了
//，然后这面在等5秒 setTimeout执行成功 resolve返回ok then就可以执行，大体就是这个流程

        axios.post('/api/user/login', {
            'email': email,
            'password': password
            // api 为react的路由
        }).then(function (response) {
            console.log(response.data);
            obj.setState({ret: 100})
        }).catch(function (error) {
            console.log(error);
        })
    }
}



