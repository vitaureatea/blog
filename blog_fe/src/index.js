import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './comporents/login';
import Reg from './comporents/reg';

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

//前端 静态路由
class Root extends React.Component {
  render () {
    return (
      <Router>
      <div>
        <ul>
          <li><a href="/">主页</a></li>
          <li><a href="/login">登录</a></li>
          <li><a href="/reg">注册</a></li>
          <li><a href="/about">关于</a></li>
        </ul>

        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/reg" component={Reg} />
        <Route exact path="/about" component={About} />
      </div>
    </Router>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('root'))
//exact 严格匹配