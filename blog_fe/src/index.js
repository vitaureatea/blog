import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './comporents/login';

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
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route path="/about" component={About} />
      </div>
    </Router>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('root'))

//exact 严格匹配