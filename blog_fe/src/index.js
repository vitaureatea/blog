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
class Index extends React.Component {
  render () {
    return (
    <Router>
      <Layout>
        <Header>
        <Menu mode="horizontal" theme="dark">
            <Menu.Item key="home"><Link to="/">主页</Link></Menu.Item>
            <Menu.Item key="login"><Link to="/login">登录</Link></Menu.Item>
            <Menu.Item key="reg"><Link to="/reg">注册</Link></Menu.Item>
            <Menu.Item key="about"><Link to="/about">关于</Link></Menu.Item>
        </Menu>
        </Header>
         <Content style={{ padding: '8px 50px' }}>
           <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
             <Route exact path="/" component={Home} />
             <Route exact path="/login" component={Login} />
             <Route exact path="/reg" component={Reg} />
             <Route exact path="/about" component={About} /></div>
         </Content>
         <Footer style={{ textAlign: 'center' }}>
           Ant Design ©2018 Created by Ant UED
         </Footer>
      </Layout>
    </Router>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('index'));
//exact 严格匹配