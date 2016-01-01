let React = require('react-native');

let {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableHighlight
} = React;
let Navbar = require('./elements/Navbar');
let LoadView = require('./elements/LoadView');

let LoginView = React.createClass({
  getInitialState:function(){
    return {
      'init':false,

      'email':'',
      'password':'',
      'password_confirm':'',

      'step':'enter-email',

      'username':null,
      'id':null,

      'pet_name':'',

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
      'error':null
    };
  },

  propTypes:{
    'userRequester':React.PropTypes.any,
    'onUserLogged':React.PropTypes.func
  },

  render:function(){

    if (!this.state.init){
      return (<LoadView/>);
    }

    let spacer1 = (<View style={styles.spacer1}></View>);
    if (this.state.error !== null){
      spacer1 = (<View style={styles.spacer1}>
          <Text style={styles.error}>{this.state.error}</Text>
        </View>);
    }

    let spacer2 = <View style={styles.spacer2}/>;

    let content;
    if (this.state.step === 'enter-email'){
      content = [
        (<View key="logo" style={styles.logocontainer}>
          <View style={styles.logoarea}>
            <Image source={require('./elements/img/easyship.png')}
              style={styles.logo} />
          </View>
        </View>),
        (<TextInput key="email"
          ref="email"
          style={styles.input}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
          keyboardType="email-address"
          placeholder="email"
          autoCorrect={false}
          onSubmitEditing={this.findUserByEmail}
        />),
        (<TouchableHighlight style={styles.button} key="next" onPress={this.findUserByEmail}
          activeOpacity={0.8} underlayColor="#B71C1C">
          <Text style={[styles.buttontext,{marginTop:7}]}>Ok</Text>
        </TouchableHighlight>)
      ];
    } else if (this.state.step === 'enter-password'){
      content = [
        (<View key="logo" style={styles.logocontainer}>
          <View style={styles.logoarea}>
            <Image source={require('./elements/img/easyship.png')}
              style={styles.logo} />
          </View>
        </View>),
        (<Text key="wbtext" style={[styles.title,{marginTop:10}]}>Welcome back {this.state.username}!</Text>),
        (<TextInput key="password"
          ref="l_password"
          style={styles.input2}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          keyboardType="default"
          placeholder="password"
          autoCorrect={false}
          onSubmitEditing={this.tryLogin}
          secureTextEntry={true}
        />),
        (<TouchableHighlight key="next" onPress={this.tryLogin} style={styles.button}
          activeOpacity={0.8} underlayColor="#B71C1C">
          <Text style={[styles.buttontext,{marginTop:7}]}>Login</Text>
        </TouchableHighlight>)
      ];
    } else {
      content = [
        (<Text key="sutext" style={styles.title}>Sign Up</Text>),
        (<TextInput key="email"
          ref="s_email"
          style={styles.input2}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
          keyboardType="email-address"
          placeholder="email"
          autoCorrect={false}
          onSubmitEditing={() => {
            this.refs.s_password.focus();
          }}
        />),
        (<TextInput key="password"
          ref="s_password"
          style={styles.input2}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          keyboardType="default"
          placeholder="password"
          autoCorrect={false}
          onSubmitEditing={() => {
            this.refs.s_password_confirm.focus();
          }}
          secureTextEntry={true}
        />),
        (<TextInput key="password_confirm"
          ref="s_password_confirm"
          style={styles.input2}
          onChangeText={(password_confirm) => this.setState({password_confirm})}
          value={this.state.password_confirm}
          keyboardType="default"
          placeholder="confirm password"
          autoCorrect={false}
          onSubmitEditing={() => {
            this.refs.s_pet_name.focus();
          }}
          secureTextEntry={true}
        />),
        (<TextInput key="pet_name"
          ref="s_pet_name"
          style={styles.input2}
          onChangeText={(pet_name) => this.setState({pet_name})}
          value={this.state.pet_name}
          keyboardType="default"
          placeholder="your pet name"
          autoCorrect={false}
          onSubmitEditing={this.trySignup}
          secureTextEntry={true}
        />),
        (<TouchableHighlight key="next" onPress={this.trySignup} style={styles.button2}
          activeOpacity={0.8} underlayColor="#B71C1C">
          <Text style={[styles.buttontext,{marginTop:2}]}>Sign Up</Text>
        </TouchableHighlight>)
      ];
    }

    return (
      <View style={styles.view}>
        {spacer1}
        {content}
        {spacer2}
      </View>
    );
  },

  DOINIT:function(error){
    if (typeof(error) === "string"){
      this.setState({'init':true,'error':error});
    } else if (error){
      let nerrorid = ((this.state.connectionerrorid + 1) % this.state.connectionerrors.length)
      this.setState({
        'init':true,
        'error':this.state.connectionerrors[nerrorid],
        'connectionerrorid':nerrorid,
      });
    } else {
      this.setState({'init':true});
    }
  },

  findUserByEmail:function(){
    let email = this.state.email;
    this.props.userRequester('GET','/api/users',{
			'page':1,
			'amount':1,
			'criteria':JSON.stringify({
				'provider':'local',
				'email':email
			}),
			'fields':JSON.stringify(['username','ID'])
		}).then((response) => {

      if (this.state.error !== null){
        this.setState({'connectionerrorid':0,'error':null})
      }

      if (response.ok) {
        response.json().then((users) => {

          if (users[0]){
            this.setState({
              'id':users[0].ID,
              'username':users[0].username,
              'step':'enter-password',
              'password':''
            });
          } else {
            this.setState({
              'step':'signup',
              'password':'',
              'password_confirm':'',
              'pet_name':''
            });
          }

        }).catch((err) => {
          this.setState({
            'error':'Loading Error',
            'connectionerrorid':0,
          });
        });

      } else {
        response.text().then((statusText) => {
          this.setState({
            'error':statusText,
            'connectionerrorid':0,
          });
        }).catch((err) => {
          this.setState({
            'error':'Loading Error',
            'connectionerrorid':0,
          });
        });
      }
    }).catch((err) => {
      let nerrorid = ((this.state.connectionerrorid + 1) % this.state.connectionerrors.length)
      this.setState({
        'error':this.state.connectionerrors[nerrorid],
        'connectionerrorid':nerrorid,
      });
    });
  },

  gatherCode:function(){
    this.props.userRequester('GET','/api/self/token/default').then((response) => {
      if (response !== null && response.ok){
        return response.json();
      } else {
        this.setState({
          'error':response.statusText,
          'connectionerrorid':0,
        });
      }
    }).then((token) => {
      if (token !== null){
        this.props.onUserLogged(this.state.username,token);
      }
    }).catch((err)=>{
      let nerrorid = ((this.state.connectionerrorid + 1) % this.state.connectionerrors.length);
      this.setState({
        'error':this.state.connectionerrors[nerrorid],
        'connectionerrorid':nerrorid,
      });
    });
  },

  tryLogin:function(){
    let email = this.state.email;
    let password = this.state.password;

    this.props.userRequester('POST','/auth/local/role/client/login',
      {'noredirect':true},
      {'email':email,'password':password}
    ).then((response) => {

        if (this.state.error !== null){
          this.setState({'connectionerrorid':0,'error':null})
        }

        if (response.ok){
          this.gatherCode();
        } else {

          response.text().then((statusText) =>{
            this.setState({
              'error':statusText,
              'connectionerrorid':0,
            });
          }).catch((err) => {
            this.setState({
              'error':'Loading Error',
              'connectionerrorid':0,
            });
          });

        }
    }).catch((err)=>{

      let nerrorid = ((this.state.connectionerrorid + 1) % this.state.connectionerrors.length)
      this.setState({
        'error':this.state.connectionerrors[nerrorid],
        'connectionerrorid':nerrorid,
      });

    });
  },

  trySignup:function(){
    let email = this.state.email;
    let password = this.state.password;
    let password_confirm = this.state.password_confirm;
    let pet_name = this.state.pet_name;
    if (password !== password_confirm){
      this.setState({
        'error':'The password and its confirmation do not match',
        'connectionerrorid':0
      });
    } else {
      this.setState({
        'error':null,
        'connectionerrorid':0
      });

      security = JSON.stringify({
        'pet':pet_name
      });

      this.props.userRequester('POST','/auth/local/role/client/signup',{
        'data':security,
        'noredirect':true
      },{
        'email':email,
        'password':password
      }).then((response) => {
          if (response.ok){
            this.gatherCode();
          } else {
            this.setState({
              'error':response.statusText,
              'connectionerrorid':0,
            });
            return null;
          }
      }).catch((err)=>{
        let nerrorid = ((this.state.connectionerrorid + 1) % this.state.connectionerrors.length);
        this.setState({
          'error':this.state.connectionerrors[nerrorid],
          'connectionerrorid':nerrorid,
        });
      });

    }
  }
});

var styles = StyleSheet.create({
  view:{
    flex:1,
    backgroundColor:'#64B5F6',
    flexDirection:'column',
    alignItems:'center'
  },
  spacer1:{
    flex:0.25
  },
  error:{
    color:'red'
  },
  title:{
    fontSize: 20,
    fontWeight: 'bold'
  },
  spacer2:{
    flex:0.4
  },
  logocontainer:{
    flex:0.25,
    width:250,
    flexDirection:'column',
    alignItems:'center',
    backgroundColor:'white',
    height:75,
    borderRadius:25
  },
  logoarea:{
    flex:1,
    flexDirection:'row',
    alignItems:'center'
  },
  logo:{
    width:150,
    height:40.5
  },
  input:{
    flex:0.1,
    height: 40,
    borderWidth: 1,
    marginLeft:25,
    marginRight:25,
    backgroundColor:'white',
    borderColor:'#ccc',
    borderWidth:1,
    marginTop:25
  },
  input2:{
    flex:0.1,
    height: 40,
    borderWidth: 1,
    marginLeft:25,
    marginRight:25,
    backgroundColor:'white',
    borderColor:'#ccc',
    borderWidth:1,
    marginTop:15
  },
  button:{
    flex:0.1,
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
  },
  button2:{
    flex:0.1,
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
    marginTop:15
  },
  buttontext:{
    fontFamily:'sans-serif',
    fontSize: 14,
    fontWeight: 'bold',
    color:'white',
  },
  spacer:{
    flex:0.25
  },
});

module.exports = LoginView;
