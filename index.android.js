'use strict';

var React = require('react-native');
var Navigation = require('./src/navigation');

var easyship = React.createClass({
  render: function() {
    return (
      <Navigation/>
    );
  }
});

React.AppRegistry.registerComponent('easyship', () => easyship);
