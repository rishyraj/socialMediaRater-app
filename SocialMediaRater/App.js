import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, Button} from 'react-native';
import { createStackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{backgroundColor: '#110700', flex: 1, alignItems: 'center'}}>
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
  render() {
    return (
      <View style={{backgroundColor: '#110700'}}>
        <Text style={styles.titleText}>Getting Started</Text>
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    GetStarted: GetStartedScreen,
    
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