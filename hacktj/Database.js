import React, { Component } from 'react';
import {AsyncStorage, StyleSheet, Text, TextInput, View, Dimensions, Alert, AppRegistry, Button, ScrollView } from 'react-native';

var streets = {"Main Street":[0.1,0.1], "Westmoreland Street":[0.1, 0.2], "Pusheen Drive":[0.2, 0.1, 0.2, 0.1]};

export function loadStreets(file) {
  return streets;
}

export function saveStreets(streets2) {
  streets = streets2;
}

export function addRating(street, rating) {
  if (street in streets) streets[street].push(rating);
  else streets[street] = [rating]
}

export function rating(street) {
  //Alert.alert(JSON.stringify(streets));
  total = streets[street].reduce(function(a, b) { return a + b; }, 0);
  return total / streets[street].length;
}
