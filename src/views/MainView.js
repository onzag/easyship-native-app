let React = require('react-native');

let {
  Text,
  View
} = React;
let Navbar = require('./elements/Navbar');

let MainView = React.createClass({
  propTypes:{
    'badconnection':React.PropTypes.bool,
    'username':React.PropTypes.string,
    'userRequester':React.PropTypes.any
  },
  getInitialState:function(){
    return {};
  },
  render:function(){
    return (
      <View>
        <Navbar/>
      </View>
    );
  }
});

module.exports = MainView;
