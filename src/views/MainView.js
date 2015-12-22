let React = require('react-native');

let {
  Text,
  View,
  StyleSheet
} = React;
let Navbar = require('./elements/Navbar');

let MainView = React.createClass({
  render:function(){
    return (
      <View>
        <Navbar/>
      </View>
    );
  }
});

module.exports = MainView;
