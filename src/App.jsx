import React, { Component } from 'react';
//import fetch from 'whatwg-fetch';

/**
 * props:
 * 上层组件传递下来的数据，
 * 不可修改
 *
 * 大部分情况下，我们不会把所有功能放在一个组件里面，这个时候就需要拆分组件
 * 父子组件使用props进行数据传递，组件无法修改props，只能通过上级进行修改
 *
 * 如果在使用input组件的时候指定了value得值，那么input就是controlled form
 * 这个时候再执行输入的时候如果没有改变赋值到value得变量，那么input将不会变化
 * 出现异常就是另外的情况了-。-
 */

class Child extends Component{

  constructor(props) {
    super(props);
  }

  //changeName(e) {
  //  this.props.onNameChange(e.target.value);
  //}

  changeName(e) {
    this.props.name = e.target.value
  }

  render() {
    return (
      <div>
        <h3>This is Child component</h3>
        <p>name is:<span style={{color: 'red'}}>{this.props.name}</span></p>
        <p>input name: <input type="text" value={this.props.name} onChange={(e) => this.changeName(e)} /></p>
      </div>
    );
  }

}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: 'state',
      server: 'no'
    };
  }

  fetchData() {
    fetch('/test', {
      method: 'post'
    })
      .then((resp) => {
        return resp.text();
      })
      .then(json => {
        this.setState({server: json});
      })
  }

  render() {
    return (

      <div>
        <h1>Props</h1>
        <p>data from server: <span style={{color: 'blue'}}>{this.state.server}</span></p>
        <button onClick={() => this.fetchData()}>click to get the data</button>
        <Child name={this.state.name} onNameChange={value => this.setState({name: value})}></Child>
      </div>

    );
  }

}

export default App;
