import React, { Component } from 'react';
import {AsyncStorage, StyleSheet, Text, View, Dimensions, Alert, AppRegistry, Button } from 'react-native';


export default class App extends React.Component {

  static _storeData = async (key, pin) => {
    try {
      AsyncStorage.setItem(key, pin);
    } catch (error) {
      Alert.alert("Error: couldn't save your pin, sorry");
    }
  };
  static _getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) Alert.alert(value);
      else Alert.alert(key + " was null");
      return value;
    } catch (error) {
      Alert.alert("Error: couldn't load your pin, sorry");
    }

  };

  static lastTime = 1e10;
  _onPressButton() {
    Alert.alert("Warning - please enter your pin");
    setTimeout(App.callAuthorities, 5000);
    //Alert.alert('Congratulations! You have just clicked a button. You will recieve a $100 amazon gift card $$$$!!!$$$$ not a scam !!!$$');
  }

  static callAuthorities() {
    Alert.alert("Calling authorities. you done messed up ");
  }

  render() {
    var elem = [];
    var pin = App._getData("@WalkMeThere:pin");
    var hasPin = App._getData("@WalkMeThere:hasPin");
    if (hasPin === null) {
      App._storeData("@WalkMeThere:pin", "12345");
      App._storeData("@WalkMeThere:hasPin", "true");
      App._getData("@WalkMeThere:hasPin");
      pin = App._getData("@WalkMeThere:pin");
    } else {

    }



    return (
      <View style={styles.container}>
  		    <Text style={styles.titletext}>Walk Me There - Get Home Safe</Text>
          <View style={styles.buttonContainer}>
            <Button
              onPress={this._onPressButton}
              title="Press Me"
            >
            </Button>
          </View>
      </View>
	);
  }
}


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titletext: {
  	alignItems: 'center',
  	justifyContent: 'center',
  	fontWeight: 'bold',
    fontSize: 0.05 * width,
  	borderRadius: 0.05 * width,
  	marginTop: 0.2 * height,
  	marginBottom: 0.1 * height,
  },
  buttonContainer:{
    fontcolor: '#ffffff',
    backgroundColor: '#87cefa',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0.1 * height,
  	marginBottom: 0.4 * height,
  }


});
