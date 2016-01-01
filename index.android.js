'use strict';

var React = require('react-native');
var Navigation = require('./src/Navigation');

var easyship = React.createClass({
  render: function() {
    return (
      <Navigation/>
    );
  }
});

React.AppRegistry.registerComponent('easyship', () => easyship);
