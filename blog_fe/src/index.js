import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './comporents/login';
import Reg from './comporents/reg';
import { Layout,Menu,Icon } from "antd";

import 'antd/lib/layout/style';
import 'antd/lib/menu/style';
import 'antd/lib/icon/style';


const { Header, Content, Footer } = Layout;

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

//前端 静态路由
class Root extends React.Component {
  render () {
    return (
    <Router>
      <Layout className="layout">
        <Header>
        <Menu mode="horizontal" theme="dark">
            <Menu.Item key="home">
              <Icon type="home" /><a href="/">主页</a>
            </Menu.Item>
            <Menu.Item key="login">
              <Icon type="login" /><a href="/login">登录</a>
            </Menu.Item>
            <Menu.Item key="reg">
              <Icon type="reg" /><a href="/reg">注册</a>
            </Menu.Item>
            <Menu.Item key="about">
              <Icon type="about" /><a href="/about">关于</a>
            </Menu.Item>
        </Menu>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/reg" component={Reg} />
        <Route exact path="/about" component={About} />
        </Header>
         <Content style={{ padding: '0 50px' }}></Content>
         <footer></footer>
      </Layout>
    </Router>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('root'))
//exact 严格匹配