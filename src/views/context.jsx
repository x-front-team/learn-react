import React, {Component} from 'react';

/**
 * context也是用来在组件之间传递数据的，但不限定在父子之间，只要父级声明了，子孙组件就可以获取，
 * 获取方式通过声明contextTypes来获取，实际使用例子：
 * https://github.com/rackt/react-redux/blob/master/src/components/Provider.js
 */

class SubChild extends Component{
  constructor(props) {
    super(props)
  }

  render() {
    return <p>SubChild Context Msg: {this.context.string}</p>
  }
}

SubChild.contextTypes = {
  string: React.PropTypes.string
};

class Child extends Component{

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <p>The Context Msg: {this.context.string}</p>
        <SubChild></SubChild>
      </div>
    )
  }
}

Child.contextTypes = {
  string: React.PropTypes.string
};

export default class Context extends Component{

  getChildContext() {
    return {string: "context msg"};
  }

  constructor(props) {
    super(props);
  }

  render() {

    return <Child></Child>

  }

}

Context.childContextTypes = {
  string: React.PropTypes.string
};