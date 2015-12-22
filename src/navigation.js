'use strict';

let React = require('react-native');
let {
  View,
  StyleSheet,
  Navigator
} = React;

let MainView = require('./views/MainView');
let Navigation = React.createClass({
  render:function(){

    return (
      <Navigator
        style={styles.navigator}
        renderScene={this.renderScene}
        initialRoute={{
          component: MainView
        }}
      />
    );

  },

  renderScene:function(route,navigator){
    let Component = route.component;

    return (
      <View style={styles.appContainer}>
        <Component
          navigator={navigator}
          route={route}
        />
      </View>
    );

  }
});

const styles = StyleSheet.create({
  navigator: {
    flex: 1
  },
  navColor: {
    'backgroundColor': '#3B5998'
  },
  appContainer: {
    flex: 1,
    backgroundColor: 'white'
  }
});

module.exports = Navigation;
