import React, { Component } from 'react';
import {AsyncStorage, StyleSheet, Text, TextInput, View, Dimensions, Alert, AppRegistry, Button } from 'react-native';


export default class App extends React.Component {
  static appobj = null;
  constructor(props) {
    super(props);
    App.appobj = this;
    App.appobj._resetData();
    App.appobj.state = {currentPin: '', textbox: false};//currentPin: '', textbox: false};
    App.appobj.state.textbox = true;
  }

  _storeData = async (key, pin) => {
    try {
      AsyncStorage.setItem(key, pin);
    } catch (error) {
      Alert.alert("Error: couldn't save your pin, sorry");
    }
  };

  _getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      //if (value !== null) Alert.alert(value);
      //else Alert.alert(key + " was null");
      return value;
    } catch (error) {
      Alert.alert("Error: couldn't load your pin, sorry");
    }

  };

  _resetData = async() => {
    await AsyncStorage.removeItem("@WalkMeThere:pin");
    await AsyncStorage.removeItem("@WalkMeThere:hasPin");
  }
  lastTime = -1;
  needPin = false;
  _onPressButton() {
    Alert.alert("Warning - please enter your pin");
    App.appobj.state.textbox = true;

    setTimeout(App.appobj.callAuthorities, 5000);
  }

  callAuthorities() {
    Alert.alert("Calling authorities. please don't be dead ");
  }

  onChanged(text){
      let newText = '';
      let numbers = '0123456789';

      for (var i=0; i < text.length; i++) {
          if(numbers.indexOf(text[i]) > -1 ) {
              newText = newText + text[i];
          }
          else {
              // your call back function
              alert("please enter numbers only");
          }
      }
      App.appobj.setState({currentPin: newText});
  }
  getNumberInput() {
  return <TextInput
   style={styles.textInput}
   keyboardType='numeric'
   onChangeText={(text)=> App.appobj.onChanged(text)}
   value={App.appobj.state.currentPin}
   maxLength={6}  //setting limit of input
/>
  }

  render() {
    var pin = App.appobj._getData("@WalkMeThere:pin");

    var hasPin = App.appobj._getData("@WalkMeThere:hasPin");
    Alert.alert(hasPin);
    if (hasPin === null) {

      Alert.alert("Please enter a PIN");
      App.appobj.state.textbox = true;
      if (App.appobj.state.currentPin.length == 6) {
        App.appobj._storeData("@WalkMeThere:pin", App.appobj.state.currentPin);
        App.appobj._storeData("@WalkMeThere:hasPin", "true");
        App.appobj._getData("@WalkMeThere:hasPin");
        pin = App.appobj._getData("@WalkMeThere:pin");
      }
    }
    var txt = null;

    if (App.appobj.state.textbox === true) txt = this.getNumberInput();
    return (
      <View style={styles.container}>
  		    <Text style={styles.titletext}>Pin={App.appobj.state.currentPin}, Walk Me There </Text>
          <View style={styles.buttonContainer}>
            <Button
              onPress={this._onPressButton}
              title="Press Me"
            >
            </Button>
          </View>
          {txt}
      </View>
	);
  }
}


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {

    lex: 1,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
  },
  titletext: {
  	alignItems: 'center',
  	justifyContent: 'center',
  	fontWeight: 'bold',
    fontSize: 0.05 * width,
  	borderRadius: 0.05 * width,
  	marginTop: 0.1 * height,
  },
  buttonContainer:{
    fontcolor: '#ffffff',
    backgroundColor: '#87cefa',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0.1 * height,
  },
  textInput: {
    borderWidth: 0.05 * width,
    width: 0.8 * width,
    height: 0.2 * height,
    marginTop: 0.05 * height,
  }


});
