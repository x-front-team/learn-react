import React from 'react';

var mixin = {
  componentDidMount: function () {
    console.log('mixin did mount');
  },
  getData: function () {
    return 'This is mixin data';
  }
};

export default React.createClass({

  mixins: [mixin],

  componentDidMount: function () {
    console.log('component did mount')
  },

  render() {
    return <h3>The mixin example: {this.getData()}</h3>
  }

});