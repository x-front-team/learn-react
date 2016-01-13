import React from 'react';
import {Route, IndexRoute} from 'react-router';

import HelloWorld from './views/hello-world.jsx';
import Props from './views/props.jsx';

let Layout = React.createClass({

  render() {
    return (
      <div>
        <h1>examples</h1>
        {this.props.children}
      </div>
    );
  }

});

let Menus = React.createClass({

  goTo(e, path) {
    e.preventDefault();
    this.props.history.push(path);
  },

  render() {
    return (
      <ul>
        <li><a href="/example" onClick={(e) => this.goTo(e, '/example1')}>hello world</a></li>
        <li><a href="/example2" onClick={(e) => this.goTo(e, '/example2')}>props</a></li>
      </ul>
    );
  }

});

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={Menus} />
    <Route path="example1" component={HelloWorld} />
    <Route path="example2" component={Props} />
  </Route>
);