import React, { Component } from 'react';
import {AsyncStorage, StyleSheet, Text, TextInput, View, Dimensions, Alert, AppRegistry, Button, ScrollView } from 'react-native';
import { SearchBar } from 'react-native-elements';

export default class App extends React.Component {
  state = {
    search: '',
  };
  updateSearch = search => {
   this.setState({ search });
 };
  db = require("./Database");
  static appobj = null;
  pin = "123456";
  hasPin = "";
  constructor(props) {
    super(props);
    App.appobj = this;
    //App.appobj._resetData();
    App.appobj.state = {currentPin: '', textbox: true, screen: "emergencyButton", currentText: ''};//currentPin: '', textbox: false};
  }


  _Callforhelp() {
    Alert.alert("Warning - please enter your pin");
    // activate the textbox
    App.appobj.setState({textbox: true, currentPin:  ""});
    // wait for 10000 ms before calling App.appobj.callAuthorities
    setTimeout(App.appobj.callAuthorities, 10000);
  }

  _back(){
    Alert.alert("Back");
  }

  _buttonMap(){
    <Text style={styles.bigBlack}>Map</Text>
  }
  _safetytipstricks() {
    return (<View style="container">
              <Text style={styles.bigBlack}>Safety Tips</Text>
              <Text style={styles.gray}> Avoid walking in deserted areas and during the night. If you absolutely need to travel during the night:</Text>
              <Text style={styles.gray}> Stay alert and be prepared. Do your research online for every specific area you are visiting.</Text>
              <Text style={styles.gray}> Dress for ease of movement.~{"\n"} Don't wear headphones.~{'\n'} The use of pepper spray, an air horn, or a bright flashlight can help aid you if you are in trouble. \n
              if you think you are being followed, call 911 or let someone know where you are. To potentially deter your attacker, you can try to pretend to be on the phone with a friend,
              tag along with any group of people you see, or ask for someone to accompany you, even if they're a stranger. </Text>
              <Text style={styles.gray}> If you think you will have to use self-defense to protect yourself, always attack in order to run. You will most likely not be able to overpower you attacker,
              so your best chance is to catch them by surprise and aim for weak points, such as the groin, eyes, nose, and throat. You can use the sharp edges of your car keys to help you fend off your attacker. </Text>
            </View>
    );
  }

  callAuthorities() {
    if (App.appobj.state.currentPin === App.appobj.pin)
      Alert.alert("Cancelled");
    else
      Alert.alert("Calling authorities to your location.");
    App.appobj.setState({currentPin: "", textbox: false});
  }

  onChanged(text){
      let newText = '';
      let numbers = '0123456789.';

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
  onRegInputChange(text) {
    App.appobj.setState({currentText: text});
  }
  _onPressButton() {
    Alert.alert("Warning - please enter your pin");
    // activate the textbox
    App.appobj.setState({textbox: true});
    // wait for 5000 ms before calling App.appobj.callAuthorities
    setTimeout(App.appobj.callAuthorities, 5000);
  }
  gotoTipsAndInfo() {
    App.appobj.setState({screen : "tipsAndInfo"});
  }
  gotoEmergencyButton() {
    App.appobj.setState({screen : "emergencyButton"});
  }
  gotoStreets() {
    App.appobj.setState({screen : "streets"});
  }

  render() { //RENDEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEER
    const { search } = this.state;

    buttons = (
      <View style={styles.buttonBox}>
    <Button
      onPress={this.gotoTipsAndInfo}
      title="Tips and Info"
    >
    </Button>
    <Button
      onPress={this.gotoEmergencyButton}
      title="Go To Safety Button"
    >
    </Button>
    <Button
      onPress={this.gotoStreets}
      title="Go To List of Streets"
    >
    </Button></View>);
    panel = null;
    if (this.state.screen === "emergencyButton") {
      panel = this.emergencyButtonScreen();
    } else if (this.state.screen === "tipsAndInfo") {
      panel = this._safetytipstricks();
    } else if (this.state.screen === "streets") {
      panel = this.streetsList();
    }

    return (<View style={styles.container}>{buttons}{panel}</View>);

    return(<SearchBar
        placeholder="Type Here..."
        onChangeText={this.updateSearch}
        value={search}
      />);
  }
  addRating() {
    rating = App.appobj.state.currentText;
    street = rating.substring(rating.indexOf(" ") + 1);
    ratingValue = parseFloat(rating.substring(0, rating.indexOf(" ")));
    App.appobj.db.addRating(street, ratingValue);
    App.appobj.setState({currentText: ""});
  }

  streetsList() {
    el = []
    streetList = App.appobj.db.loadStreets();
    for (var s in streetList) {
      streetName = s;
      streetRatings = App.appobj.db.rating(s);
      ratingCount = streetList[s].length;
      el.push(<><Text>{streetName} --- Safety rating = {streetRatings}, number of ratings = {ratingCount}</Text><View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  }}
></View></>);
    }
    return (
      <ScrollView style={styles.container}>{el}<Button
      onPress={this.addRating}
      title="Add Your Rating"
    ></Button><TextInput
     style={styles.textInput}
     keyboardType='default'
     onChangeText={(text)=> App.appobj.onRegInputChange(text)}
     value={App.appobj.state.currentText}
     maxLength={255}  //setting limit of input
     placeholder="Please type your rating here in the form 'Rating StreetName'"
  /></ScrollView>);//
  }
  emergencyButtonScreen() {
    // set the pin to 111111 temporarily to test AsyncStorage
    // you have to use await. idk why
          //await AsyncStorage.setItem("@WalkMeThere:pin", "111111
    // display the pin as a test
    //Alert.alert(pin); //displays as window at bottom
    // boolean : does a pin exist
    // if the pin doesn't exist (asking the FIRST TIME)
    if (this.hasPin === '') {
      //while there is nothing in the text box, you tell the user to input pin
      if (App.appobj.state.currentPin.length == 0) {
        Alert.alert("Please enter a PIN");
        // state = local variables in the app
        // textbox is part of the app's current state
        // you display the textbox on the bottom(if there is a pin to input)
        // must use an if statement, otherwise setState() will be called too many times
        // this is a problem because each time, setState() refreshes render()
        if (App.appobj.state.textbox === false) {
          App.appobj.setState({textbox: true}); // this is preferred over using .state.textbox = true
        }
      }
      //while there is nothing in the text box, wait
      //while (App.appobj.state.currentPin.length == 0) {}
      // pins are length 6, if it reaches length 6, you're done entering the pin
      if (App.appobj.state.currentPin.length == 6) {
        // store the pin
        this.pin = App.appobj.state.currentPin;
        // say that the pin exists
        this.hasPin = "true";
        Alert.alert("Saved pin");
        if (App.appobj.state.textbox === true) {
          App.appobj.setState({textbox: false, currentPin: ""}); // this is preferred over using .state.textbox = true
        }
      } // end if pin is done entering
    } // end if pin doesn't exist
    // at the bottom
    // you change this value to change what appears at the bottom of the app
    // for example, you can add a textbox to the bottom
    var txt = null;

    // placeholder, appears at the top
    var pinText = "Unset";// + pin;

    // adds textbox
    if (App.appobj.state.textbox === true) { txt = this.getNumberInput(); }

    // says the Pin is set at the top
    if (this.hasPin !== '') { pinText = "Set";
    safetyButton = (<View style={styles.buttonContainer}>
        <Button
        onPress={this._onPressButton}
        title="Hold here, release in emergency!"
        type="outline"
        /></View>);
   } else {
     safetyButton = null;
   }// + pin;


    return (
      <View style={styles.container}>
              <Text style={styles.titletext}>Pin is [{pinText}], Walk Me There </Text>{txt}{safetyButton}
      </View>);
  }// end render function
}// end app class


// screen dimensions, used for relative size
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  bigBlack: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  gray: {
    color: 'gray',
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  buttonBox: {
    backgroundColor: '#eeeeee',
    borderWidth: 0.05 * width,
  },
  titletext: {
  	alignItems: 'center',
  	justifyContent: 'center',
  	fontWeight: 'bold',
    fontSize: 0.05 * width,
  	borderRadius: 0.05 * width,
  },
  buttonContainer:{
    fontcolor: '#ffffff',
    backgroundColor: '#87cefa',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0.1 * height,
  },
  textInput: {
    borderWidth: 0.01 * width,
    width: 0.8 * width,
    height: 0.2 * height,
    marginTop: 0.05 * height,
  },
  map: {
    borderWidth: 0.05 * width,
    width: 0.8 * width,
    height: 0.6 * height,
    marginTop: 0.09 * height,
  },
  back:{
    borderWidth: 0.05 * width,
    width: 0.8 * width,
    height: 0.2 * height,
    marginTop: 0.1 * height,
  },
  searchBar: {
    height: 0.9 * height,
    marginTop: 0.09 * height,
  }

});
