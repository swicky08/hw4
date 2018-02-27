// KIEI-924 Spring 2018 Homework #4
// React Native Weather

// Functionality-wise, essentially the same as the jQuery weather application built in 
// Project #2, without the fade effects, but on mobile!

// HINTS
// - Built-in "icon" function transforms a Dark Sky icon name into a Font Awesome
//   icon (yup, Font Awesome works on mobile too, thanks to this awesome open-source 
//   project - https://github.com/oblador/react-native-vector-icons)
// - You use the Font Awesome icon by utilizing the Icon component, like this:
//   <Icon name="rocket" size={100} color="#000" />. The Icon should live inside a Text
//   component.
// - You will receiving a warning message when the application loads, if the icon is
//   blank. You can rectify this by checking for the existence of an icon in state, i.e.
//   {this.state.currentIcon && (<Icon size={100} name={this.state.currentIcon} />)} -
//   note that the Icon component is inside parentheses
// - Math.round(50.85) => 50
// - For the forecast, use the high temperatures only
// - Make life easier by storing the entirety of the .daily.data array that comes back 
//   from Dark Sky in this.state.forecast, instead of trying to store away the individual
//   bits and pieces of information
// - There are styles already written for each component. Use them by adding a "style" 
//   attribute to each component, e.g. <Text style={styles.currentTemperature}>. See the
//   styles.js file for the definition of each style.
// - You'll receive another warning message when looping through the days of the forecast,
//   something like "each child in an array should have a unique key prop" - to prevent this,
//   provide a "key" attribute to each element returned by your for loop
// - Example of implementation for the forecast, with proper styling and usage of key attribute:
//   <View style={styles.forecastDay} key={i}>
//     <Text style={styles.forecastIcon}><Icon size={30} name={icon(this.state.forecast[i].icon)} /></Text>
//     <Text style={styles.forecastTemperature}>{Math.round(this.state.forecast[i].temperatureHigh)}</Text>
//   </View>
// - Screenshot of expected results: results.png

import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput, Button, StyleSheet, Text, View } from 'react-native';
import { geocodeAndGetWeather, icon } from './Helpers';
import styles from './styles';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      locationInputText: "",  // the value of the text input
      locationName: "",       // the name of the location (e.g. "Chicago, IL, USA")
      currentTemperature: "", // the current temperature (e.g. 50.85)
      currentSummary: "",     // the current weather summary (e.g. "Clear throughout the day")
      currentIcon: "",        // the Font Awesome string of the current icon (e.g. "sun-o")
      forecast: []            // an array holding information on the forecast
    };
  }

  textInputChanged(text) {
    this.setState({
      locationInputText: text
    });
  }
  
  async getWeather() {
    // Event handler for clicking of the "Get weather!" button
    // Calls the geocoding and weather API, get back a location and weather object
    const response = await geocodeAndGetWeather(this.state.locationInputText);

    console.log(response.location);
    console.log(response.weather);

    // manipulate state
    this.setState({
      locationName: response.location
    });
  }

  render() {
    // Three Views inside the parent view
    // 1. TextInput and Button for city name and to call getWeather()
    // 2. Current weather conditions (styles provided with currentIcon, locationText,
    //    currentTemperature, currentSummary)
    // 3. Forecast (forecastDay, forecastIcon, forecastTemperature)
    let forecast = []; // this will eventually hold the JSX elements for each day

    return (
      <View style={styles.container}>
        <View>
          <TextInput style={{width: 150, height: 40, borderColor: 'gray', borderWidth: 1}} onChangeText={(text) => this.textInputChanged(text)} />
          <Button onPress={() => this.getWeather()} title="Get the weather!" />
        </View>
        <View style={styles.currentWeather}>
          {/* Current weather conditions */}
          <Text style={styles.locationText}>{this.state.locationName}</Text>
        </View>
        <View style={styles.forecast}>
          {forecast}
        </View>
      </View>
    );
  }
}