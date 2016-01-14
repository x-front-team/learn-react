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
 *
 * props虽然不能直接修改，但是props里面的对象是可以修改的，例如this.props.obj.name = 'xxx';
 * 所以如果直接进行修改就会破坏元数据，这也是fb一直希望将props做成immutable的原因
 *
 * 很多时候我们希望在本组件内进行修改数据，数据改完了提交到服务器保存成功之后再覆盖元数据，
 * 那么这时候我们需要在组件内深拷贝一份数据进行修改，
 * 同时如果有新的props进来的时候我们要进行对比前两次的props是否相同，如果不同考虑是否要覆盖已经修改的数据
 *
 */

class Child extends Component{

  constructor(props) {
    super(props);
  }

  changeName(e) {
    this.props.obj.name = e.target.value;
    this.props.onNameChange(e.target.value);
  }

  //changeName(e) {
  //  this.props.obj.name = e.target.value;
  //  this.props.name = e.target.value
  //}

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
      obj: {name: 'state'}
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
        <Child name={this.state.name} onNameChange={value => {
            this.setState({name: value});
            console.log(this.state.obj);
          }
        } obj={this.state.obj}></Child>
      </div>

    );
  }

}

export default App;
