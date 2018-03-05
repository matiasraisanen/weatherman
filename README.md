# Weatherman
A ReactJS application for fetching weather data.    
Live version: [Weather Man](http://renki.dy.fi/weatherman)

Main application: [src/App.js](https://github.com/matiasraisanen/weatherman/blob/master/src/App.js)

Created using [Create React APP](https://github.com/facebook/create-react-app/tree/master)

Uses OpenWeatherMap's [Current weather data API](http://api.openweathermap.org/) for fetching weather data.

User can save cities of their choice.

User can also delete saved cities one by one, or all at a time.

![Alt Text](http://renki.dy.fi/varasto/weatherman_demo.gif "User interface")    
User interface

## Launching the app

To start the application, assign the command "npm start" in the application root directory. Application can then be used at http://localhost:3000

## Using the app

Type desired city into the input field and click "Get weather".

Use "Save city" to save the search into the user interface.

Use "Clear saved" to empty the list of saved searches.

## Testing

The file [src/App.test.js](https://github.com/matiasraisanen/weatherman/blob/master/src/App.test.js) contains unit tests to ensure the interface is rendered correctly.

Run tests by assigning the command "npm test" in the application root directory.
