let React = require('react-native');

let {
  View,
  StyleSheet,
  Image,
  Animated,
  Easing
} = React;

let LoadLittle = React.createClass({
  getInitialState:function(){
    return {
      'angle':new Animated.Value(0),
    };
  },
  animate:function(){
    this.state.angle.setValue(0);
    Animated.timing(
       this.state.angle,
       {
         toValue: 360,
         duration: 2000,
         easing: Easing.linear
       },
    ).start();
  },
  render:function(){
    return(
      <View style={styles.view}>
        <View style={styles.container}>
          <Animated.Image source={require('./img/spinner-black.png')}
            style={[styles.anim,{
              'transform':[{'rotate': this.state.angle.interpolate({
                  inputRange: [0, 360],
                  outputRange: [
                    '0deg', '360deg'
                  ],
                })}]
            }]}></Animated.Image>
        </View>
      </View>
    )
  },
  componentDidMount:function(){
    this.animate();
    this.animation = setInterval(this.animate,2000);
  },
  componentWillUnmount:function(){
    clearInterval(this.animation);
  }
});

var styles = StyleSheet.create({
  view:{
    flex:1,
    flexDirection:'column',
    alignItems:'center'
  },
  container:{
    flex:1,
    flexDirection:'row',
    alignItems:'center'
  },
  anim:{
    width:50,
    height:50,
  }
});

module.exports = LoadLittle;
