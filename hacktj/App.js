import React, { Component } from 'react';
import {AsyncStorage, StyleSheet, Text, TextInput, View, Dimensions, Alert, AppRegistry, Button } from 'react-native';


export default class App extends React.Component {
  static appobj = null;
  constructor(props) {
    super(props);
    App.appobj = this;
    //App.appobj._resetData();
    App.appobj.state = {currentPin: '', textbox: false};//currentPin: '', textbox: false};
  }
  _resetData = async() => {
    await AsyncStorage.removeItem("@WalkMeThere:pin");
    await AsyncStorage.removeItem("@WalkMeThere:hasPin");
  }
  _getItem = async(key) => {
    return await AsyncStorage.getItem(key);
  }
  getItem(key) {
    var data = '';
    this._getItem(key).then((key) => {data = key}, (error) => {data = ''});
    return data;
  }
  lastTime = -1;
  _onPressButton() {
    Alert.alert("Warning - please enter your pin");
    // activate the textbox
    App.appobj.setState({textbox: true});
    // wait for 5000 ms before calling App.appobj.callAuthorities
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
              Alert.alert("Please enter numbers only");
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
     placeholder="Please type your PIN here"
  />
  }
render() {
    // set the pin to 111111 temporarily to test AsyncStorage
    // you have to use await. idk why
          //await AsyncStorage.setItem("@WalkMeThere:pin", "111111");
    // pin number
    var pin = this.getItem("@WalkMeThere:pin");
    // display the pin as a test
    Alert.alert(pin); //displays as window at bottom
    // boolean : does a pin exist
    var hasPin = this.getItem("@WalkMeThere:hasPin");
    // if the pin doesn't exist (asking the FIRST TIME)
    if (hasPin === '') {
      //while there is nothing in the text box, you tell the user to input pin
      Alert.alert("Please enter a PIN");
      // state = local variables in the app
      // textbox is part of the app's current state
      // you display the textbox on the bottom(if there is a pin to input)
      App.appobj.setState({textbox: true}); // this is preferred over using .state.textbox = true
      //while there is nothing in the text box, wait
      while (App.appobj.state.currentPin.length == 0) {}
      // pins are length 6, if it reaches length 6, you're done entering the pin
      if (App.appobj.state.currentPin.length == 6) {
        // store the pin
        App.appobj._storeData("@WalkMeThere:pin", App.appobj.state.currentPin);
        // say that the pin exists
        App.appobj._storeData("@WalkMeThere:hasPin", "true");
        // set the local pin variable
        pin = App.appobj.state.currentPin;
        Alert.alert("Saved pin");
      } // end if pin is done entering
    } // end if pin doesn't exist
    // at the bottom
    // you change this value to change what appears at the bottom of the app
    // for example, you can add a textbox to the bottom
    var txt = null;

    // placeholder, appears at the top
    var pinText = "Unset";// + pin;

    // adds textbox
    if (App.appobj.state.textbox === true) txt = this.getNumberInput();

    // says the Pin is set at the top
    if (App.appobj.state.currentPin.length == 6) pinText = "Set";// + pin;
    return (// all views need to have a parent view
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
	); // end return
}// end render function
}// end app class


// screen dimensions, used for relative size
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
