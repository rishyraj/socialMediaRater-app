import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, Button, ScrollView} from 'react-native';
import { createStackNavigator } from 'react-navigation';

import t from 'tcomb-form-native';

const Form = t.form.Form;

const Profile = t.struct({
  name: t.String,
  shouldTheCompanyHaveGoodHistoryWithDataManagement: t.Boolean,
  doYouWantToBeAnonymous: t.Boolean,
  doYouCareIfServiceUsesCookies: t.Boolean,
  doYouWantOwnershipOfYourContent: t.Boolean,
  doYouWantRightToClassActionLawsuit: t.Boolean,
  doYouCareAboutCourtLocation: t.Boolean,
  doYouWantToBeNotifiedOfPrivacyPolicyOrTermsOfServiceChanges: t.Boolean
});

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
    return (
      <View style={{backgroundColor: '#353330', flex: 1}}>
        <View style={{alignItems:'center'}}>
          <Text style ={styles.titleText}>Submission Successful, Loading Suggested Social Media</Text>
        </View>
      </View>
    );
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