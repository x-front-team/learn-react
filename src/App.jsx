import React, { Component } from 'react';
//import fetch from 'whatwg-fetch';
import Dom from './views/dom.jsx';

/**
 * 操作dom:
 */

function log(msg) {
  console.log(msg);
}

class Child extends Component{

  constructor(props) {
    log('constructor');
    super(props);
  }

  changeName(e) {
    this.props.onNameChange(e.target.value);
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
      server: 'no',
      showChild: true
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

  toggleShowChild() {
    this.setState({
      showChild: !this.state.showChild
    })
  }

  render() {
    return (

      <div>
        <Dom></Dom>
      </div>

    );
  }

}

export default App;
