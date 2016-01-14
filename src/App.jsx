import React, { Component } from 'react';
//import {Router} from 'react-router';
//import routes from './routes.jsx';


var App = React.createClass({
  getHelloWorld() {
    return 'hello world';
  },

  render() {
    return (

      <h1>Our first react component, <a href="#" onClick={() => alert(this.getHelloWorld())}>click me</a></h1>

    );
  }
});

//class App extends Component {
//
//  constructor(props) {
//    super(props);
//  }
//
//  getHelloWorld() {
//    return 'hello world';
//  }
//
//  render() {
//    return (
//
//      <h1>Our first react component, <a href="#" onClick={() => alert(this.getHelloWorld())}>click me</a></h1>
//
//    );
//  }
//
//}

export default App;
