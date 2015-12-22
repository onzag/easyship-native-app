let React = require('react-native');

let {
  Text,
  View,
  StyleSheet,
  Platform,
  Image
} = React;

let Navbar = React.createClass({
  render:function(){
    return (
      <View style={styles.navbar}>
        <Image source={require('./img/user.jpg')}
          style={styles.photo} />
        <View style={styles.logoparent}>
          <Image source={require('./img/easyship.png')}
            style={styles.logo} />
        </View>
        <Image source={require('./img/chat.png')}
          style={styles.chat} />
      </View>
    )
  }
})

var styles = StyleSheet.create({
  navbar:{
    flex:1,
    backgroundColor:'white',
    borderBottomColor:'#0D47A1',
    borderBottomWidth:1,
    flexDirection:'row',
    alignItems:'center',
    height:75
  },
  logo:{
    flex:0,
    marginTop:5,
    alignSelf:'center',
    width:92.5,
    height:25
  },
  logoparent:{
    flex:1,
    flexDirection:'column',
    alignItems:'center',
    height:75,
    marginTop:45
  },
  photo:{
    flex:0,
    marginLeft:15,
    alignSelf:'center',
    height:50,
    width:50,
    borderRadius:50
  },
  chat:{
    flex:0,
    marginRight:15,
    alignSelf:'center',
    height:50,
    width:50,
    borderRadius:50
  }
});

module.exports = Navbar;
