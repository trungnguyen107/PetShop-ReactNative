import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Button,
  Alert,
} from 'react-native';
import { Facebook } from 'expo';

import firebase from "../../Firebase";


export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <View>
        <Button title="Sign in!" onPress={this._signInFacebook} />
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    await AsyncStorage.setItem('name', 'awe');
    this.props.navigation.navigate('App');
  };

  _signInFacebook = async () => {
    const appId = '2160043080729166';

    const {
      type,
      token,
      expires,
      permissions,
      declinedPermissions,
    } = await Facebook.logInWithReadPermissionsAsync(appId, {
      permissions: ['public_profile'],
    });

    switch (type) {
      case 'success': {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);  // Set persistent auth state
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        const facebookProfileData = await firebase.auth().signInAndRetrieveDataWithCredential(credential);  // Si
        
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);

        this.props.navigation.navigate('App');
      }
      case 'cancel': {
        return Promise.reject({type: 'cancel'});
      }
    }
  };
}
