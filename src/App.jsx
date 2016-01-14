import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
//import fetch from 'whatwg-fetch';

/**
 * Lifecycle:
 * 组件生命周期，从开始到结束,
 * constructor也会在每次重新渲染的时候再次执行，唯独getDefaultProps只会在第一次渲染的时候执行一次,
 * 使用ES6 Class来写组件的话没有getDefaultProps方法，只需要写Child.defaultProps = {...}就行
 *
 * 可以在shouldComponentUpdate里面对比新旧的state和props来阻止render，以此减少render次数，提高效率，
 * 但是对比需要注意问题，fb实现了一个叫pureRenderMixin得mixin来帮助提高效率，但是他的对比并不是diff，
 * 所以如果我们直接改变过state中某个对象的某个值，并且使用了pureRenderMixin，那么就会出现组件不更新的情况
 *
 */

function log(msg) {
  console.log(msg);
}

var Child = React.createClass({

  mixins: [PureRenderMixin],

  getInitialState() {
    return {
      obj: {name: 'aaaa'}
    };
  },

  componentWillMount: function() {
    log('child will mount');
  },

  componentDidMount: function() {
    log('child did mount');
  },

  componentWillReceiveProps: () => {
    log('child will receive props');
  },

  componentWillUpdate() {
    log('child will update');
  },

  componentDidUpdate() {
    log('child did update');
  },

  componentWillUnmount() {
    log('child will unmont');
  },

  changeName(e) {
    this.props.onNameChange(e.target.value);
  },

  testPureRenderMixin() {
    this.state.obj.name = 'bbbbbbbbb';
    this.setState(this.state, () => console.log(this.state));
  },

  render() {
    return (
      <div>
        <h3>This is Child component</h3>
        <p>name is:<span style={{color: 'red'}}>{this.props.name}</span></p>
        <p>input name: <input type="text" value={this.props.name} onChange={(e) => this.changeName(e)} /></p>
        <button onClick={this.testPureRenderMixin}>test pure render: {this.state.obj.name}</button>
      </div>
    );
  }

});

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: 'state',
      server: 'no',
      showChild: true
    };
  }

  componentWillMount() {
    log('parent will mount');
  }

  componentDidMount() {
    log('parent did mount');
  }

  componentWillReceiveProps() {
    log('parent will receive props');
  }

  shouldComponentUpdate() {
    log('parent should update');
    return true;
  }

  componentWillUpdate() {
    log('parent will update');
  }

  componentDidUpdate() {
    log('parent did update');
  }

  componentWillUnmount() {
    log('parent will unmont');
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
        <h1>Props</h1>
        <p>data from server: <span style={{color: 'blue'}}>{this.state.server}</span></p>
        <button onClick={() => this.fetchData()}>click to get the data</button>
        {
          this.state.showChild &&
          <Child name={this.state.name} onNameChange={value => this.setState({name: value})}></Child>
        }
        <button onClick={() => this.toggleShowChild()}>toggle child</button>
      </div>

    );
  }

}

export default App;
