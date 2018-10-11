import React, {Component} from 'react';
import {AppRegistry, Text,Image, View, StyleSheet, Button, ScrollView} from 'react-native';
import { createStackNavigator } from 'react-navigation';

import t from 'tcomb-form-native';

import twitter from './socialMediaData/twitter';
import facebook from './socialMediaData/facebook';
import instagram from './socialMediaData/instagram';
import snapchat from './socialMediaData/snapchat';
import reddit from './socialMediaData/reddit';

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
        socialMedia = " Based on your profile,\nTwitter is a good match";
      } else if ((!value.history)&&(!value.anonymous)&&(value.cookies)&&(!value.ownership)&&(!value.notify)) {
        socialMedia = "     Based on your profile,\nFacebook is a good match";
      } else if ((!value.history)&&(value.anonymous)&&(value.cookies)&&(!value.ownership)&&(!value.notify)) {
        socialMedia = "     Based on your profile,\nSnapchat is a good match";
      } else if ((value.history)&&(value.anonymous)&&(value.cookies)&&(!value.ownership)&&(!value.notify)) {
        socialMedia = "     Based on your profile,\nInstagram is a good match";
      } else if ((!value.anonymous)){
        socialMedia = "Unfortunately \nno such social media exists";
      } else {
        socialMedia = " Based on your profile,\nReddit is a good match";
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
            color='#d86813'
            onPress={this.handleSubmit}
          />
        </View>
      </ScrollView>
    );
  }
}

class SubmitScreen extends React.Component {
  render() {
    if (socialMedia===" Based on your profile,\nTwitter is a good match") {
      return (
        <ScrollView style={{backgroundColor: '#353330', flex: 1}}>
          <View style={{alignItems:'center'}}>
            <Text style ={styles.titleText}>{socialMedia}</Text>
            <Image source ={require('./assets/twitter.png')} style={{width: 150, height: 150, marginTop: 20, marginBottom:20}} />
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom:20}}>
            <Text style ={styles.titleText}>{"Overall Grade: "+twitter.summary.grade}</Text>    
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom:20}}>
            <Text style ={styles.titleText}>Summary</Text>
            <Text style ={styles.bodyText}>{twitter.summary.details}</Text>    
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom:20}}>
            <Text style ={styles.titleText}>Number of Monthly Users</Text>
            <Text style ={styles.bodyText}>{twitter.userbase.amountDetails}</Text>    
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom: 20}}>
            <Text style ={styles.titleText}>Privacy History</Text>
            <Text style ={styles.bodyText}>{twitter.history.privacyDetails}</Text>
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom: 20}}>
            <Text style ={styles.titleText}>Security History</Text>
            <Text style ={styles.bodyText}>{twitter.history.securityDetails}</Text>
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom: 20}}>
            <Text style ={styles.titleText}>Are you anonymous to other users?</Text>
            <Text style ={styles.bodyText}>{twitter.anonymous.details}</Text>
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom: 20}}>
            <Text style ={styles.titleText}>How do they track you?</Text>
            <Text style ={styles.bodyText}>{"Cookies \n"+twitter.tracking.cookiesDetails}</Text>
            <Text style ={{textAlign: 'center', fontSize: 20, color: '#d86813', marginTop: 10, marginBottom: 10}}>{"Single-Sign-On \n"+twitter.tracking.SSODetails}</Text>
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom: 20}}>
            <Text style ={styles.titleText}>Content Ownership and Ease of Deletion</Text>
            <Text style ={styles.bodyText}>{"Content Ownership \n"+twitter.ownership.personalDataDetails}</Text>
            <Text style ={{textAlign: 'center', fontSize: 20, color: '#d86813', marginTop: 10, marginBottom: 10}}>{"Ease of Deletion \n"+twitter.ownership.deleteDetails}</Text>
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom: 20}}>
            <Text style ={styles.titleText}>How do they inform you of changes in Privacy Policy?</Text>
            <Text style ={styles.bodyText}>{twitter.notification.notifyDetails}</Text>
          </View>          
        </ScrollView>
      );
    } else if (socialMedia==="     Based on your profile,\nFacebook is a good match") {
      return (
        <ScrollView style={{backgroundColor: '#353330', flex: 1}}>
          <View style={{alignItems:'center'}}>
            <Text style ={styles.titleText}>{socialMedia}</Text>
            <Image source ={require('./assets/facebook.png')} style={{width: 150, height: 150, marginTop: 20, marginBottom:20}} />
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom:20}}>
            <Text style ={styles.titleText}>{"Overall Grade: "+facebook.summary.grade}</Text>    
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom:20}}>
            <Text style ={styles.titleText}>Summary</Text>
            <Text style ={styles.bodyText}>{facebook.summary.details}</Text>    
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom:20}}>
            <Text style ={styles.titleText}>Number of Monthly Users</Text>
            <Text style ={styles.bodyText}>{facebook.userbase.amountDetails}</Text>    
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom: 20}}>
            <Text style ={styles.titleText}>Privacy History</Text>
            <Text style ={styles.bodyText}>{facebook.history.privacyDetails}</Text>
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom: 20}}>
            <Text style ={styles.titleText}>Security History</Text>
            <Text style ={styles.bodyText}>{facebook.history.securityDetails}</Text>
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom: 20}}>
            <Text style ={styles.titleText}>Are you anonymous to other users?</Text>
            <Text style ={styles.bodyText}>{facebook.anonymous.details}</Text>
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom: 20}}>
            <Text style ={styles.titleText}>How do they track you?</Text>
            <Text style ={styles.bodyText}>{"Cookies \n"+facebook.tracking.cookiesDetails}</Text>
            <Text style ={{textAlign: 'center', fontSize: 20, color: '#d86813', marginTop: 10, marginBottom: 10}}>{"Single-Sign-On \n"+facebook.tracking.SSODetails}</Text>
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom: 20}}>
            <Text style ={styles.titleText}>Content Ownership and Ease of Deletion</Text>
            <Text style ={styles.bodyText}>{"Content Ownership \n"+facebook.ownership.personalDataDetails}</Text>
            <Text style ={{textAlign: 'center', fontSize: 20, color: '#d86813', marginTop: 10, marginBottom: 10}}>{"Ease of Deletion \n"+facebook.ownership.deleteDetails}</Text>
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom: 20}}>
            <Text style ={styles.titleText}>How do they inform you of changes in Privacy Policy?</Text>
            <Text style ={styles.bodyText}>{facebook.notification.notifyDetails}</Text>
          </View>
        </ScrollView>
      );
    } else if (socialMedia==="     Based on your profile,\nInstagram is a good match") {
      return (
        <ScrollView style={{backgroundColor: '#353330', flex: 1}}>
          <View style={{alignItems:'center'}}>
            <Text style ={styles.titleText}>{socialMedia}</Text>
            <Image source ={require('./assets/instagram.png')} style={{width: 150, height: 150, marginTop: 20, marginBottom:20}}/>
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom:20}}>
            <Text style ={styles.titleText}>{"Overall Grade: "+instagram.summary.grade}</Text>    
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom:20}}>
            <Text style ={styles.titleText}>Summary</Text>
            <Text style ={styles.bodyText}>{instagram.summary.details}</Text>    
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom:20}}>
            <Text style ={styles.titleText}>Number of Monthly Users</Text>
            <Text style ={styles.bodyText}>{instagram.userbase.amountDetails}</Text>    
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom: 20}}>
            <Text style ={styles.titleText}>Privacy History</Text>
            <Text style ={styles.bodyText}>{instagram.history.privacyDetails}</Text>
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom: 20}}>
            <Text style ={styles.titleText}>Security History</Text>
            <Text style ={styles.bodyText}>{instagram.history.securityDetails}</Text>
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom: 20}}>
            <Text style ={styles.titleText}>Are you anonymous to other users?</Text>
            <Text style ={styles.bodyText}>{instagram.anonymous.details}</Text>
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom: 20}}>
            <Text style ={styles.titleText}>How do they track you?</Text>
            <Text style ={styles.bodyText}>{"Cookies \n"+instagram.tracking.cookiesDetails}</Text>
            <Text style ={{textAlign: 'center', fontSize: 20, color: '#d86813', marginTop: 10, marginBottom: 10}}>{"Single-Sign-On \n"+instagram.tracking.SSODetails}</Text>
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom: 20}}>
            <Text style ={styles.titleText}>Content Ownership and Ease of Deletion</Text>
            <Text style ={styles.bodyText}>{"Content Ownership \n"+instagram.ownership.personalDataDetails}</Text>
            <Text style ={{textAlign: 'center', fontSize: 20, color: '#d86813', marginTop: 10, marginBottom: 10}}>{"Ease of Deletion \n"+instagram.ownership.deleteDetails}</Text>
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom: 20}}>
            <Text style ={styles.titleText}>How do they inform you of changes in Privacy Policy?</Text>
            <Text style ={styles.bodyText}>{instagram.notification.notifyDetails}</Text>
          </View>
        </ScrollView>
      );
    } else if (socialMedia==="     Based on your profile,\nSnapchat is a good match") {
      return (
        <ScrollView style={{backgroundColor: '#353330', flex: 1}}>
          <View style={{alignItems:'center'}}>
            <Text style ={styles.titleText}>{socialMedia}</Text>
            <Image source ={require('./assets/snapchat.png')} style={{width: 150, height: 150, marginTop: 20, marginBottom:20}} />
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom:20}}>
            <Text style ={styles.titleText}>{"Overall Grade: "+snapchat.summary.grade}</Text>    
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom:20}}>
            <Text style ={styles.titleText}>Summary</Text>
            <Text style ={styles.bodyText}>{snapchat.summary.details}</Text>    
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom:20}}>
            <Text style ={styles.titleText}>Number of Monthly Users</Text>
            <Text style ={styles.bodyText}>{snapchat.userbase.amountDetails}</Text>    
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom: 20}}>
            <Text style ={styles.titleText}>Privacy History</Text>
            <Text style ={styles.bodyText}>{snapchat.history.privacyDetails}</Text>
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom: 20}}>
            <Text style ={styles.titleText}>Security History</Text>
            <Text style ={styles.bodyText}>{snapchat.history.securityDetails}</Text>
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom: 20}}>
            <Text style ={styles.titleText}>Are you anonymous to other users?</Text>
            <Text style ={styles.bodyText}>{snapchat.anonymous.details}</Text>
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom: 20}}>
            <Text style ={styles.titleText}>How do they track you?</Text>
            <Text style ={styles.bodyText}>{"Cookies \n"+snapchat.tracking.cookiesDetails}</Text>
            <Text style ={{textAlign: 'center', fontSize: 20, color: '#d86813', marginTop: 10, marginBottom: 10}}>{"Single-Sign-On \n"+snapchat.tracking.SSODetails}</Text>
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom: 20}}>
            <Text style ={styles.titleText}>Content Ownership and Ease of Deletion</Text>
            <Text style ={styles.bodyText}>{"Content Ownership \n"+snapchat.ownership.personalDataDetails}</Text>
            <Text style ={{textAlign: 'center', fontSize: 20, color: '#d86813', marginTop: 10, marginBottom: 10}}>{"Ease of Deletion \n"+snapchat.ownership.deleteDetails}</Text>
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom: 20}}>
            <Text style ={styles.titleText}>How do they inform you of changes in Privacy Policy?</Text>
            <Text style ={styles.bodyText}>{snapchat.notification.notifyDetails}</Text>
          </View>
        </ScrollView>
      );
    } else if (socialMedia===" Based on your profile,\nReddit is a good match") {
      return (
        <ScrollView style={{backgroundColor: '#353330', flex: 1}}>
          <View style={{alignItems:'center'}}>
            <Text style ={styles.titleText}>{socialMedia}</Text>
            <Image source ={require('./assets/reddit.png')} style={{width: 150, height: 150, marginTop: 20, marginBottom:20}}/>
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom:20}}>
            <Text style ={styles.titleText}>{"Overall Grade: "+reddit.summary.grade}</Text>    
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom:20}}>
            <Text style ={styles.titleText}>Summary</Text>
            <Text style ={styles.bodyText}>{reddit.summary.details}</Text>    
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom:20}}>
            <Text style ={styles.titleText}>Number of Monthly Users</Text>
            <Text style ={styles.bodyText}>{reddit.userbase.amountDetails}</Text>    
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom: 20}}>
            <Text style ={styles.titleText}>Privacy History</Text>
            <Text style ={styles.bodyText}>{reddit.history.privacyDetails}</Text>
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom: 20}}>
            <Text style ={styles.titleText}>Security History</Text>
            <Text style ={styles.bodyText}>{reddit.history.securityDetails}</Text>
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom: 20}}>
            <Text style ={styles.titleText}>Are you anonymous to other users?</Text>
            <Text style ={styles.bodyText}>{reddit.anonymous.details}</Text>
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom: 20}}>
            <Text style ={styles.titleText}>How do they track you?</Text>
            <Text style ={styles.bodyText}>{"Cookies \n"+reddit.tracking.cookiesDetails}</Text>
            <Text style ={{textAlign: 'center', fontSize: 20, color: '#d86813', marginTop: 10, marginBottom: 10}}>{"Single-Sign-On \n"+reddit.tracking.SSODetails}</Text>
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom: 20}}>
            <Text style ={styles.titleText}>Content Ownership and Ease of Deletion</Text>
            <Text style ={styles.bodyText}>{"Content Ownership \n"+reddit.ownership.personalDataDetails}</Text>
            <Text style ={{textAlign: 'center', fontSize: 20, color: '#d86813', marginTop: 10, marginBottom: 10}}>{"Ease of Deletion \n"+reddit.ownership.deleteDetails}</Text>
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom: 20}}>
            <Text style ={styles.titleText}>How do they inform you of changes in Privacy Policy?</Text>
            <Text style ={styles.bodyText}>{reddit.notification.notifyDetails}</Text>
          </View>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView style={{backgroundColor: '#353330', flex: 1}}>
          <View style={{alignItems:'center'}}>
            <Text style ={styles.titleText}>{socialMedia}</Text>
            <Image source ={require('./assets/sad.png')} style={{width: 150, height: 150, marginTop: 20, marginBottom:20}} />
          </View>
          <View style={{alignItems:'center', marginTop: 20, marginBottom: 20}}>
            <Text style ={styles.titleText}>Why is this the case?</Text>
            <Text style ={styles.bodyText}>Social Media, by design, requires users to give up some aspect of their privacy. Anything you post online is visible on the Internet, a public domain. Another reason is because consumers of social media want convenience and newer features, and that usually means more data mining. The more that a social media dwells into data mining, the higher risk there is of privacy violations. Also gathering that much data makes these companies more attractive to hackers resulting in more hacks and data leaks. Remember, when you create a social media account, you are much more visible to businesses (not just social media companies), governments and the ordinary person.</Text>
          </View>
        </ScrollView>
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
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#d86813'
  },
  bodyText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#d86813'
  }
})

AppRegistry.registerComponent('socialmediarater', () => socialmediarater);