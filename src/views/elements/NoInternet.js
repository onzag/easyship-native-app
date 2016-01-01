let React = require('react-native');

let {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableHighlight
} = React;

let NoInternet = React.createClass({
  propTypes:{
    'message':React.PropTypes.string,
    'onReload':React.PropTypes.func
  },
  render:function(){
    return (
      <View style={styles.view}>
        <View style={styles.container}>
          <Text>{this.props.message}</Text>
          <TouchableHighlight onPress={this.props.onReload} style={styles.button}
            activeOpacity={0.8} underlayColor="#B71C1C">
            <Text style={[styles.buttontext,{marginTop:7}]}>reload</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  view:{
    flex:1,
    flexDirection:'row',
    alignItems:'center'
  },
  container:{
    flex:1,
    flexDirection:'column',
    alignItems:'center'
  },
  buttontext:{
    fontFamily:'sans-serif',
    fontSize: 14,
    fontWeight: 'bold',
    color:'white',
  },
  button:{
    flex:0.5,
    flexDirection:'column',
    alignItems:'center',
    width:175,
    height: 40,
    borderWidth: 1,
    marginLeft:25,
    marginRight:25,
    backgroundColor:'#F44336',
    borderColor:'#B71C1C',
    borderWidth:1,
    marginTop:25
  }
});

module.exports = NoInternet;
