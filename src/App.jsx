import React, { Component } from 'react';
//import fetch from 'whatwg-fetch';

/**
 * state:
 * 组件内状态，一般用来存储组件状态
 */


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: 'state',
      server: 'no'
    };
    this.name = 'xxx';
  }

  fetchData() {
    fetch('/test', {
      method: 'post'
    })
      .then((resp) => {
        console.log(resp);
        return resp.text();
      })
      .then(json => {
        this.setState({server: json});
      })
  }

  render() {
    return (

      <div>
        <h1>name is:<span style={{color: 'red'}}>{this.state.name}</span></h1>
        <p>data from server: <span style={{color: 'blue'}}>{this.state.server}</span></p>
        <p>input name: <input type="text" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} /></p>
        <button onClick={() => this.fetchData()}>click to get the data</button>
      </div>

    );
  }

}

export default App;
