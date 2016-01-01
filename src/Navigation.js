'use strict';

const USERHOST = 'http://user.easyship.co.za/metalogin';
const APIHOST = 'http://api.easyship.co.za/api/v1'

let React = require('react-native');

let LoginView = require('./views/LoginView');
let MainView = require('./views/MainView');

let Navigation = React.createClass({
  getInitialState:function(){
    return {
      'init':false,
      'username':null,
      'authtoken':null
    };
  },
  render:function(){
    if (!this.state.init){
      return(
        <LoginView ref="login" userRequester={this.userRequester}
          onUserLogged={(username,token) => {
            this.setState({'init':true,'username':username,'authtoken':token});
        }}/>
      )
    } else {
      return(
        <MainView userRequester={this.userRequester}
          apiRequester={this.apiRequester}
          username={this.state.username}/>
      )
    }

  },

  componentDidMount:function(){
    this.userRequester('GET','/api/self/value/username').then((response) => {
      if (response.ok){
        response.json().then((username) => {
          this.userRequester('GET','/api/self/token/default').then((response) => {
            if (response.ok){
              response.json().then((token) => {
                this.setState({'init':true,'username':username,'authtoken':token});
              }).catch((err) => {
                this.refs.login.DOINIT('Unknown error, try to login again');
              });
            } else {
              this.refs.login.DOINIT(false);
            };
          }).catch((err) => {
            this.refs.login.DOINIT(true);
          });
        }).catch((err) => {
          this.refs.login.DOINIT('Unknown error, try to login again');
        });
      } else {
        this.refs.login.DOINIT(false);
      }
    }).catch((err) => {
      this.refs.login.DOINIT(true);
    });
  },

  serialize:function(params){
    let pairs = Object.keys(params).map( (k) => {
      let key = encodeURIComponent(k);
      let val = encodeURIComponent(params[k]);
      return `${key}=${val}`;
    });
    return `${pairs.join('&')}`;
  },
  baseRequester:function(HOST,method,url,query,body){

    let finalURL = url;
    if (query){
      finalURL += '?' + this.serialize(query);
    }

    let data = {
      'method':method,
      'headers':{}
    }

    if (body){
      data.headers["Content-type"] =
        "application/x-www-form-urlencoded; charset=UTF-8";
      data.body = this.serialize(body);
    }

    return fetch(HOST + finalURL,data);
  },
  userRequester:function(...args){
    return this.baseRequester.bind(this,USERHOST)(...args);
  },
  apiRequester:function(method,url,query,body){
    let finalquery = query || {};
    finalquery.authtoken = this.state.authtoken;
    return this.baseRequester.bind(this,APIHOST)(method,url,finalquery,body);
  }

});

module.exports = Navigation;
