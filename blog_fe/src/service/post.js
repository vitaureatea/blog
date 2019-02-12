import { resolve } from "path";
import { rejects } from "assert";
import axios from "axios";
import store from "store";
import {observable} from 'mobx'

store.addPlugin(require('store/plugins/expire'));//token过期插件


export default class PostService {
    @observable msg = "";

    pub (title,content) {
        axios.post('/api/post/pub', {
            'title': title,
            'content': content
        })
            .then(response => {
                console.log(response.data);
                console.log(response.status);
                this.msg = '提交成功';
            })
            .catch(error =>{
                this.msg = '登录超时';
        })

    }
}