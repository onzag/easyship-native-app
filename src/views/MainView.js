let React = require('react-native');

let {
  View,
  StyleSheet
} = React;
let ShipmentListSent = require('./mviews/ShipmentListSent');
let ShipmentListIncoming = require('./mviews/ShipmentListIncoming');
let Navbar = require('./elements/Navbar');
let TabBar = require('./elements/TabBar');

let MainView = React.createClass({
  propTypes:{
    'badconnection':React.PropTypes.bool,
    'username':React.PropTypes.string,
    'userRequester':React.PropTypes.any,
    'apiRequester':React.PropTypes.any
  },
  getInitialState:function(){
    return {
      'activeIndex':0
    };
  },
  render:function(){
    let content = <ShipmentListSent apiRequester={this.props.apiRequester}/>;
    if (this.state.activeIndex === 1) {
      content = <ShipmentListIncoming apiRequester={this.props.apiRequester}/>;
    }

    return (
      <View style={styles.main}>
        <Navbar/>
        <TabBar elements={['Sent','Incoming']} activeIndex={this.state.activeIndex} onIndexChange={(nind) => {
            this.setState({'activeIndex':nind});
          }}/>
        <View style={styles.content}>
          {content}
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  main:{
    flex:1,
    flexDirection:"column"
  },
  content:{
    flex:5,
    flexDirection:"column"
  }
});

module.exports = MainView;
