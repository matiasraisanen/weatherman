/*
 Weather Man, by Matias Räisänen 2018
  A ReactJS class for fetching weather data of a city of the user's choice.
  Ability to save searches into the user interface, and to delete them.
  Application logo by Jero FX @ behance.net: https://www.behance.net/gallery/30971807/Animated-weather-icons-(gif)
*/

import React, { Component } from 'react';
import logo from './sunny.gif';
import './App.css';

class App extends Component {

  constructor(props) {
  super(props);
  this.state = {temperature: '', weather: '', city: '', userInput: '', icon: '', savedCities: [],};
  }

  getWeather = () => {
    //Fetch the weather data
    if (this.state.userInput === '') {   //If input is left empty, show an alert
      alert("Error: city cannot be empty!")
    }else{  //Else proceed with fetching the weather daata
     fetch('http://api.openweathermap.org/data/2.5/weather?q=' + this.state.userInput + '&appid=7c4e12c423a54c4abaaaae8a0b1e0062&units=metric')
          .then((response) => response.json()) //Fetch the JSON response
          .then((responseData) => {
            if (responseData.cod === '404'){ //If no city is found with the given name, show an alert
              alert("Error: city not found")
            }else{  //Else add the city's data into state.
              this.setState({
                city: responseData.name,
                temperature: parseInt(responseData.main.temp, 10), //No decimals in temperature
                weather: responseData.weather[0].main,
                icon: "http://openweathermap.org/img/w/" + responseData.weather[0].icon + ".png", //Construct the imageURL using the icon name.
              });
            }
          });
    }
  }

  inputChanged = (event) => {
    //Change the state of userInput when the user types into text box.
    this.setState({userInput: event.target.value});
  }

  saveCity = () => {
  //Save the city into user interface
    if (this.state.city === '') { //If no city is selected, show an alert
      alert("Error: no city selected!")
    }else{
      var newCity = {city: this.state.city, weather: this.state.weather, temperature: this.state.temperature, icon: this.state.icon};
      this.setState({savedCities: [...this.state.savedCities, newCity]}); //Add newCity to the list of saved cities.
    }
  }

  clear = () => {
  //Clear all saved cities.
    this.setState({savedCities: []});
  }

  render() {

    const cityDivs = this.state.savedCities.map((city, index) =>
    //Extract data from the list of saved cities, and present each in its own division
      <div className="oneSaved" key={index}>
        {city.city}<br/>
        {city.temperature}°C<br/>
        {city.weather}<br/>
        <img src={city.icon} alt='icon'></img><br/>
      </div>
    )

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Weather Man</h1>
        </header>

        <div className="weatherdata">
          City: {this.state.city}<br/>
          Temperature: {this.state.temperature} °C<br/>
          Weather: {this.state.weather}<br/>

          <img src={this.state.icon} alt='icon'/><br/>
        </div>

        <div className="buttons">
          <input className="userInput" type='text' onChange={this.inputChanged} value={this.state.userInput} placeholder='city'></input>
          <button className="getWeather" onClick={this.getWeather}>Get weather</button>
          <br/>
          <button className="saveCity" onClick={this.saveCity}>Save city</button>
          <button className="clear" onClick={this.clear}>Clear saved</button>
        </div>

        <div className="allSaved">
          {cityDivs}
        </div>

      </div>
    );
  }
}

export default App;
