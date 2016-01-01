let React = require('react-native');

let {
  Text,
  View,
  StyleSheet,
  TouchableHighlight
} = React;

let LoadLittle = require('../elements/LoadLittle');
let NoInternet = require('../elements/NoInternet');

let ShipmentListSent = React.createClass({
  propTypes:{
    'apiRequester':React.PropTypes.any
  },
  getInitialState:function(){
    return {
      'init':false,
      'data':null,

      'connectionerrors':[
        'Could not connect to server',
        'Sorry, we still cannot connect',
        'Check your connection',
        'No internet',
        'Still no Internet',
        'Check your connection and try again',
        'Call your ISP',
        'Or call your mobile provider',
        'Try high-speed wifi',
        'Plug an ethernet cable',
        'You\'re still offline',
        'Well the internet is awkard',
        'Nope, just not yet',
        'Try pigeons',
        'Or snail mail'
      ],
      'connectionerrorid':-1,
      'servererrors':[
        'Could not contact the easyship server',
        'Nope, the server is still not responding',
        'Not yet',
        'We may be having technical difficulties',
        'Ooops!... it keeps failing to connect'
      ],
      'servererrorid':-1,
      'error':null,
    };
  },
  render:function(){

    if (!this.state.init) {
      return (<LoadLittle/>);
    } else if (this.state.error !== null){
      return (<NoInternet message={this.state.error}
                onReload={this.load}/>);
    }

    let content;
    if (this.state.data.length === 0){
      content = [
        (<View style={styles.container} key="view">
          <Text>Send your first shipment</Text>
        </View>)
      ];
    } else {
      content = [
        (<View style={styles.container} key="view">
          <Text>Whoops</Text>
        </View>)
      ];
    }

    content.push(<TouchableHighlight key="button" onPress={() => {}} style={styles.button}
      activeOpacity={0.8} underlayColor="#B71C1C">
      <View style={styles.container}>
        <Text style={styles.buttontext}>New Shipment</Text>
      </View>
    </TouchableHighlight>);

    return (
      <View style={styles.view}>
        {content}
      </View>
    );
  },
  componentDidMount:function(){
    this.load();
  },
  load:function(){
    this.props.apiRequester('GET','/self/shipments/sent').then((response)=>{
      if (!response.ok){
        let nerrorid = ((this.state.servererrorid + 1) % this.state.servererrors.length);
        this.setState({
          'error':this.state.servererrors[nerrorid],
          'connectionerrorid':-1,
          'init':true,
          'servererrorid':nerrorid
        });
      } else {
        return response.json().then((data) => {
          this.setState({
            'init':true,
            'data':data,
            'error':null
          });
        }).catch((error) => {
          this.setState({
            'error':'Loading Error',
            'connectionerrorid':-1,
            'init':true,
            'servererrorid':-1
          });
        });
      }
    }).catch((error) => {
      let nerrorid = ((this.state.connectionerrorid + 1) % this.state.connectionerrors.length);
      this.setState({
        'error':this.state.connectionerrors[nerrorid],
        'connectionerrorid':nerrorid,
        'init':true,
        'servererrorid':-1
      });
    });
  }
})

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
  buttontext:{
    fontFamily:'sans-serif',
    fontSize: 14,
    fontWeight: 'bold',
    color:'white',
  },
  button:{
    flex:0.25,
    flexDirection:'column',
    width:100000,
    alignItems:'center',
    borderWidth: 1,
    backgroundColor:'#F44336',
    borderColor:'#B71C1C',
    borderWidth:1
  }
});

module.exports = ShipmentListSent;
