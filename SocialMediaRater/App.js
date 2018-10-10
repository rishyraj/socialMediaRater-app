import React, {Component} from 'react';
import {AppRegistry, Text,Image, View, StyleSheet, Button, ScrollView} from 'react-native';
import { createStackNavigator } from 'react-navigation';

import t from 'tcomb-form-native';

const Form = t.form.Form;

const Profile = t.struct({
  history: t.Boolean,
  anonymous: t.Boolean,
  cookies: t.Boolean,
  ownership: t.Boolean,
  notify: t.Boolean
});

const options = {
  fields: {
    history: {
      label: 'Should the company have a good history of data management and handling privacy concerns?'
    },
    anonymous: {
      label: 'Do you want to be anonymous to other users?'
    },
    cookies: {
      label: 'Do you want your service to use cookies, or anything similar to track you online?'
    },
    ownership: {
      label: 'Do you want ownership of the content you post?'
    },
    notify: {
      label: 'Do you want to be notified when changes are made to Privacy Policy and be informed in plain language what exactly those changes are?'
    }
  }
}

var socialMedia = "";

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{backgroundColor: '#353330', flex: 1, alignItems: 'center'}}>
        <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
          <Text style={styles.titleText}>Welcome to Social Media Rater</Text>
          <Text style={styles.bodyText}>Find the Right Social Media For You</Text>
        </View>
        <View style={{flex:1, alignItems:'center'}}>
          <Button 
            title="Get Started"
            color='#d86813' 
            onPress={ () => this.props.navigation.navigate('GetStarted')}
          />
        </View>
      </View>
    );
  }
}

class GetStartedScreen extends React.Component {
  constructor (props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit () {
    var value = this._formRef.getValue();
    if (value) {
      console.log('Value:', value);
      if ((!value.history)&&(!value.anonymous)&&(!value.cookies)&&(!value.ownership)&&(!value.notify)) {
        socialMedia = "Based on your profile, Twitter is a good match";
      } else if ((!value.history)&&(!value.anonymous)&&(value.cookies)&&(!value.ownership)&&(!value.notify)) {
        socialMedia = "Based on your profile, Facebook is a good match";
      } else if ((!value.history)&&(value.anonymous)&&(value.cookies)&&(!value.ownership)&&(!value.notify)) {
        socialMedia = "Based on your profile, Snapchat is a good match";
      } else if ((value.history)&&(value.anonymous)&&(value.cookies)&&(!value.ownership)&&(!value.notify)) {
        socialMedia = "Based on your profile, Instagram is a good match";
      } else if ((!value.anonymous)){
        socialMedia = "Unfortunately no such social media exists";
      } else {
        socialMedia = "Based on your profile, Reddit is a good match";
      }
      this.props.navigation.navigate('Submit');
    }
  }
  render() {
    return (
      <ScrollView style={{backgroundColor: '#353330', flex: 1}}>
        <View style={{alignItems:'center'}}>
          <Text style={styles.titleText}>Build Your Profile</Text>
          <Text style={{fontSize: 17, color:'#d86813'}}>Helps us recommend the best social media for you</Text>
        </View>
        <View style={{alignItems:'center',marginTop:10}}>
          <Form 
            ref={(ref) => this._formRef=ref}
            type={Profile}
            placeholderTextColor='#d86813'
            options={options}
          />
          <Button
            title="Submit Profile!"
            onPress={this.handleSubmit}
          />
        </View>
      </ScrollView>
    );
  }
}

class SubmitScreen extends React.Component {
  render() {
    if (socialMedia==="Based on your profile, Twitter is a good match") {
      return (
        <View style={{backgroundColor: '#353330', flex: 1}}>
          <View style={{alignItems:'center'}}>
            <Text style ={styles.titleText}>{socialMedia}</Text>
            <Image source ={require('./assets/twitter.png')} style={{width: 150, height: 150}} />
          </View>
        </View>
      );
    } else if (socialMedia==="Based on your profile, Facebook is a good match") {
      return (
        <View style={{backgroundColor: '#353330', flex: 1}}>
          <View style={{alignItems:'center'}}>
            <Text style ={styles.titleText}>{socialMedia}</Text>
            <Image source ={require('./assets/facebook.png')} style={{width: 150, height: 150}} />
          </View>
        </View>
      );
    } else if (socialMedia==="Based on your profile, Instagram is a good match") {
      return (
        <View style={{backgroundColor: '#353330', flex: 1}}>
          <View style={{alignItems:'center'}}>
            <Text style ={styles.titleText}>{socialMedia}</Text>
            <Image source ={require('./assets/instagram.png')} style={{width: 150, height: 150}}/>
          </View>
        </View>
      );
    } else if (socialMedia==="Based on your profile, Snapchat is a good match") {
      return (
        <View style={{backgroundColor: '#353330', flex: 1}}>
          <View style={{alignItems:'center'}}>
            <Text style ={styles.titleText}>{socialMedia}</Text>
            <Image source ={require('./assets/snapchat.png')} style={{width: 150, height: 150}} />
          </View>
        </View>
      );
    } else if (socialMedia==="Based on your profile, Reddit is a good match") {
      return (
        <View style={{backgroundColor: '#353330', flex: 1}}>
          <View style={{alignItems:'center'}}>
            <Text style ={styles.titleText}>{socialMedia}</Text>
            <Image source ={require('./assets/reddit.png')} style={{width: 150, height: 150}}/>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{backgroundColor: '#353330', flex: 1}}>
          <View style={{alignItems:'center'}}>
            <Text style ={styles.titleText}>{socialMedia}</Text>
            <Image source ={require('./assets/sad.png')} style={{width: 150, height: 150}} />
          </View>
        </View>
      );
    }
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    GetStarted: GetStartedScreen,
    Submit: SubmitScreen,
    
  },
  {
    initialRouteName: 'Home',
  }
);

export default class socialmediarater extends Component{
  render(){
    return(
      <RootStack />
    );
  }
}

const styles = StyleSheet.create ({
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#d86813'
  },
  bodyText: {
    fontSize: 20,
    color: '#d86813'
  }
})

AppRegistry.registerComponent('socialmediarater', () => socialmediarater);