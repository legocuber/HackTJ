import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Alert, AppRegistry, Button, StyleSheet, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
	  _onPressButton() {
    Alert.alert('You tapped the button!')
    }
      <View style={styles.container}>
		  <Text style={styles.titletext}>SafeWalk - Get Home Safe</Text>
		  
      </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this._onPressButton}
            title="Press Me"
          />
      </View>
	);
  }
}
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
const styles = StyleSheet.create({
   container: {
   flex: 1,
   justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#194d33',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titletext: {
	flex: 1,
	backgroundColor: '#eeeeee',
	alignItems: 'center',
	justifyContent: 'center',
	fontWeight: 'bold',
	borderRadius: 0.05 * width,
	marginTop: 0.2 * height,
	marginBottom: 0.6 * height,
  }
  
  
});