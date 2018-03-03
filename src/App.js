import React, { Component } from 'react';
import logo from './sunny.gif'; // Logo by JeroFX @ behance.net : https://www.behance.net/gallery/30971807/Animated-weather-icons-(gif)
import './App.css';

class App extends Component {

  constructor(props) {
  super(props);
  this.state = {temperature: '', weather: '', city: '', userInput: '', icon: '', savedCities: [],};
  }

  getWeather = () => {
    //Function for fetching the weather data
    if (this.state.userInput === '') {   //If city is left empty, show an alert  
      alert("Error: city cannot be empty!")
    } else {
     fetch('http://api.openweathermap.org/data/2.5/weather?q=' + this.state.userInput + '&appid=7c4e12c423a54c4abaaaae8a0b1e0062&units=metric')
          .then((response) => response.json()) 
          .then((responseData) => {
            if (responseData.cod == '404'){ //If no city is found with the given name, show an alert
              alert("Error: city not found")
            } else {  //Else add the city's data into state.
              this.setState({city: this.state.userInput});
              this.setState({
                city: responseData.name, 
                temperature: responseData.main.temp,
                weather: responseData.weather[0].main,
                icon: responseData.weather[0].icon 
              });
            }
          });
    }
  }

  inputChanged = (event) => {
  this.setState({userInput: event.target.value});
  }

  saveCity = () => {
  //Function for saving the city into user interface
    if (this.state.city === '') { //If no city is selected, show an alert
      alert("Error: no city selected!")
    } else {
    var newCity = {city: this.state.city, weather: this.state.weather, temperature: this.state.temperature, icon: "http://openweathermap.org/img/w/" + this.state.icon + ".png"};
    this.setState({savedCities: [...this.state.savedCities, newCity]}); //Add newCity to the list of saved cities.
    }
  }

  clear = () => {
  //Function for clearing all saved cities.
    this.setState({savedCities: []});
  }

  render() {

    const itemRows = this.state.savedCities.map((city) =>
     //Extact data from the list of saved cities, and present each in its own div 
      <div className="oneSaved" key={city.city}>
        {city.city}<br />
        {city.temperature}°C<br />
        {city.weather}<br />
        <img src={city.icon} alt='icon'></img><br />
      </div>
    )

    const url = "http://openweathermap.org/img/w/" + this.state.icon + ".png"
     //Construct the image source URL from the name of the icon

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
              <img src={url} alt='icon'/><br/>
            </div>

            <div className="buttons">
              <input type='text' onChange={this.inputChanged} value={this.state.userInput} placeholder='city'></input>
              <button onClick={this.getWeather}>Get weather</button>
              <br/>
              <button onClick={this.saveCity}>Save city</button>
              <button onClick={this.clear}>Clear saved</button>
            </div>

            <div className="allSaved">{itemRows}</div>

      </div>
    );
  }
}

export default App;
