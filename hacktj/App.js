import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
		  <Text style={styles.titletext}>SafeWalk - Get Home Safe</Text>
      </View>
    );
  }
}
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
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