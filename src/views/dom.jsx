import React, {Component} from 'react';

export default class DomComponent extends Component{
  constructor(props) {
    super(props);
    this.state = {
      array: ['aaa', 'bbb']
    };
  }

  componentDidMount() {
    document.getElementById('item0').addEventListener('click', () => alert('clicked'));
  }

  getChildren() {
    return this.state.array.map((item, index) => {
      return <p key={index} id={'item' + index}>{item}</p>
    });
  }

  pop() {
    this.setState({
      array: ['bbb']
    });
  }

  unshift() {
    this.setState({
      array: ['aaa', 'bbb']
    });
  }

  render() {
    return (
      <div>
        <h3>The Dom Example</h3>
        {this.getChildren()}
        <button onClick={() => this.pop()}>delete</button>
        <button onClick={() => this.unshift()}>add</button>
      </div>
    );
  }

}