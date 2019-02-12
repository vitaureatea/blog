import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import '../css/login.css'
import PostService from '../service/post';
import {observer} from "mobx-react";
import {message} from 'antd'
import 'antd/lib/message/style'
import {
    Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';


const service = new PostService();

export default class Pub extends React.Component {
    render () {
        return <_Pub service={service} />;
    }
}

class _Pub extends React.Component {
    render() {
        return (
            <div></div>
        );
    };
}
