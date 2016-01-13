import React, {Component} from 'react';

/**
 * props 是不可更改的，0.13版本中又setProps方法，现在也已经被废除了
 * props一般对应某个组件的state
 * 类似react-redux这样的store组件基本原理就是放一个最上层组件<Provider>来监听store变化，然后转化为state传递到下层组件
 */

class Child extends Component{
  constructor(props) {
    super(props);
  }

  wrongChangeProps(e) {
    e.preventDefault();

    this.props.number += 1;

  }

  rightChangeProps(e) {
    e.preventDefault();

    this.props.onAdd();
  }

  render() {
    return (
      <div>
        <p>This is Child</p>
        <p>The props.number is: {this.props.number}</p>
        <button onClick={(e) => this.wrongChangeProps(e)}>number plus 1 the wrong way</button>
        <button onClick={(e) => this.rightChangeProps(e)}>number plus 1 the right way</button>
      </div>
    );
  }

}

export default class Props extends Component{

  constructor(props) {
    super(props);
    this.state = {
      number: 1
    };
  }

  plusOne() {
    this.setState({
      number: this.state.number + 1
    });
  }

  render() {
    return (
      <div>
        <h3>Pass props to child</h3>
        <Child number={this.state.number} onAdd={() => this.plusOne()}></Child>
      </div>
    );
  }

}