let React = require('react-native');

let {
  View,
  StyleSheet
} = React;
let Navbar = require('./elements/Navbar');
let TabBar = require('./elements/TabBar');

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
        <TabBar elements={['Sent','Incoming']} activeIndex={0} onIndexChange={this.onIndexChange}/>
      </View>
    );
  },
  onIndexChange:function(nind){
    
  }
});

var styles = StyleSheet.create({

});

module.exports = MainView;
