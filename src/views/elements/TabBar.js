let React = require('react-native');

let {
  Text,
  View,
  StyleSheet,
  TouchableHighlight
} = React;

let TabBar = React.createClass({
  propTypes:{
    'elements':React.PropTypes.arrayOf(React.PropTypes.string),
    'activeIndex':React.PropTypes.number,
    'onIndexChange':React.PropTypes.func
  },
  getInitialState:function(){
    return {'activeIndex':this.props.activeIndex}
  },
  render:function(){
    return (
      <View style={styles.tabbar}>
        {
          this.props.elements.map((element,index) => {
            if (index !== this.state.activeIndex){
              return (
                <TouchableHighlight key={'tab' + index} onPress={this.setActiveIndex.bind(this,index)}
                  style={styles.tab}
                  activeOpacity={1}
                  underlayColor="#0D47A1">
                    <View style={styles.textcontainer}>
                      <Text style={styles.tabtext}>{element}</Text>
                    </View>
                </TouchableHighlight>
              );
            } else {
              return (
                <View style={[styles.tab,styles.tab_active]} key={'tab' + index}>
                  <View style={styles.textcontainer}>
                    <Text style={[styles.tabtext,styles.tabtext_active]}>{element}</Text>
                  </View>
                </View>
              );
            }
          })
        }
      </View>
    );
  },
  setActiveIndex:function(index){
    this.props.onIndexChange(index);
    this.setState({'activeIndex':index});
  }
})

var styles = StyleSheet.create({
  tabbar:{
    flex:0.75,
    backgroundColor:'#2196F3',
    borderBottomColor:'#0D47A1',
    borderBottomWidth:1,
    flexDirection:'row',
    alignItems:'center',
    height:50
  },
  textcontainer:{
    flex:1,
    marginTop:3,
    flexDirection:'column',
    alignItems:'center'
  },
  tab:{
    flex:1,
    height:40,
    paddingTop:5,
    borderBottomWidth:2,
    borderBottomColor:'white',
    opacity:0.75
  },
  tab_active:{
    borderBottomWidth:4
  },
  tabtext:{
    color:'white'
  },
  tabtext_active:{
    fontWeight: 'bold'
  }
});

module.exports = TabBar;
