'use strict';

const USERHOST = 'http://user.easyship.co.za/metalogin';

let React = require('react-native');
//let RNFS = require('react-native-fs');

let LoadView = require('./views/LoadView');
let StartView = require('./views/StartView');
let MainView = require('./views/MainView');

let Navigation = React.createClass({
  getInitialState:function(){
    return {
      //'sid':null,
      'logged':false,
      'badconnection':false,
      'initialized':false,
      'username':null
    };
  },
  render:function(){

    if (!this.state.initialized){
      return (
        <LoadView/>
      );
    } else if (!this.state.logged){
      return(
        <StartView badconnection={this.state.badconnection}
          userRequester={this.userRequester}
          onUserLogged={(username) => {
            this.setState({'logged':true,'username':username});
          }}/>
      )
    } else {
      return(
        <MainView badconnection={this.state.badconnection}
          userRequester={this.userRequester}
          username={this.state.username}/>
      )
    }

  },
  componentDidMount:function(){
    //let sidpath = RNFS.DocumentDirectoryPath + '/sid.txt';
    //RNFS.readFile(sidpath, 'utf8').then((sid) => {
    //  this.setState({'sid':sid});
      this.checkLogStatus();
    //}).catch((err) => {
    //  this.checkLogStatus();
    //});
  },

  //updateSIDFile:function(){
  //  let sidpath = RNFS.DocumentDirectoryPath + '/sid.txt';
  //  let sid = this.state.sid;
  //  return RNFS.writeFile(sidpath,decodeURIComponent(sid),'utf8').catch((err)=>{});
  //},
  serialize:function(params){
    let pairs = Object.keys(params).map( (k) => {
      let key = encodeURIComponent(k);
      let val = encodeURIComponent(params[k]);
      return `${key}=${val}`;
    });
    return `${pairs.join('&')}`;
  },
  userRequester:function(method,url,query,body){

    let finalURL = url;
    if (query){
      finalURL += '?' + this.serialize(query);
    }

    let data = {
      'method':method,
      'headers':{}
    }

    //if (this.state.sid !== null){
    //  data.headers['Cookie'] = this.state.sid;
    //}

    if (body){
      data.headers["Content-type"] =
        "application/x-www-form-urlencoded; charset=UTF-8";
      data.body = this.serialize(body);
    }

    return fetch(USERHOST + finalURL,data)//.then((response) => {
    //  if (response.headers.has("Set-Cookie")){
    //    let cookies = response.headers.get("Set-Cookie");
    //    let sid = cookies.split(';')[0];
        //this.setState({'sid':sid});
        //return this.updateSIDFile().then(function(){
        //  return response;
        //});
    //  } else {
    //    return response;
    //  };
    //});

  },
  checkLogStatus:function(){
    this.userRequester('GET','/api/self/value/username').then((response) => {
      if (response.ok){
        response.json().then((username) => {
          this.setState({'logged':true});
          this.setState({'username':username});
          this.setState({'initialized':true});
        }).catch((err) => {
          this.setState({'initialized':true});
        });
      } else {
        this.setState({'initialized':true});
      }
    }).catch((err) => {
      this.setState({'initialized':true,'badconnection':true});
    });

  }
});

module.exports = Navigation;
