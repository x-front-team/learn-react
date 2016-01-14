import React, { Component } from 'react';
//import fetch from 'whatwg-fetch';

/**
 * form:
 * form处理是react的弱项，相比angular，react的form处理就象jquery和原生js的差别一样
 * 而且react的controlled form又会带来一些新的问题，
 * 当然redux-form也给出了一个比较靠谱的方案，解决了react处理form的很多问题
 *
 * 问题1：不用controlled from，那么只能给form赋一个defaultValue初始值，而且必须是在input render完成前,
 * 那么我们就没办法把异步取来的数据赋值给form
 *
 * 问题2：使用controlled form，那么每次的数据变化就需要通过setState来完成，而setState是异步的，这个时候如果
 * 我们有一个select，希望在select改变的时候提交form，我们就需要在setState中加callback的方式来处理，如果form表单够大，
 * 而且这样的需求较多，那么我们就很难进行封装
 *
 * 问题3：validation，本身react是没有表单验证支持的，所以要自己封装，有两种思考
 * 一是封装表单组件，通过props配置进行验证，存在局限性，比如联动验证比较难实现
 * 二是基于state进行验证，也就是redux-form的做法，redux-form管理了form得值，所以是对整个state进行校验
 *
 */

class Child extends Component{

  constructor(props) {
    super(props);
  }

  editField(e, field) {
    this.props.onEdit(field, e.target.value);
  }

  render() {
    return (
      <div>
        <p>name: <input type="text" value={this.props.name} name="name" onChange={(e) => this.editField(e, 'name')} /></p>
        <p>pass: <input type="password" value={this.props.password} name="password" onChange={(e) => this.editField(e, 'password')} /></p>
      </div>
    );
  }

}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: 'name',
        password: 'password'
      }
    };

    this.editValue.bind(this);
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

  editValue(field, value) {
    console.log(field + ':' + value);
    this.setState({
      [field]: value
    });
  }

  render() {
    return (

      <div>
        <h1>Forms</h1>
        <Child formData={this.state.formData} onEdit={(field, value) => this.editValue(field, value)}></Child>
      </div>

    );
  }

}

export default App;
