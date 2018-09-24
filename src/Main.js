import React from 'react';
import ReactDOM from 'react-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import WeatherData from './components/WeatherData';
import './styles/App.scss';

const rootDir = document.getElementById('app');

class Main extends React.Component {
    constructor(props){
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.animateDataBoxes = this.animateDataBoxes.bind(this);
        this.state = {
            error: false,
            typedCity: '',
            country: '',
            current_temperature: '',
            current_pressure: '',
            current_weather: '',
            day_2_temperature: '',
            day_2_pressure: '',
            day_2_weather: '',
            day_3_temperature: '',
            day_3_pressure: '',
            day_3_weather: '',
            day_4_temperature: '',
            day_4_pressure: '',
            day_4_weather: ''
        };
    }

    componentWillMount() {
        this.getCities();
    }

    getCities() {
        fetch('cities2.json')
        .then(results => results.json())
        .then(data => {
                this.setState({ data });
                this.setState({ ready: true });
            }
        );  
    }

    handleSearch(city) {
        let APICallbackObject;
        const selectedCity = city;
        const requestURL = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=a5d803bdbb963adcf81a3a6444580326';
        fetch(requestURL)
        .then(results => results.json())
        .then(data => APICallbackObject = data)
        .then(() => {
            const currentWeather = this.getCurrentWeather(APICallbackObject);
            const nextDaysWeather = this.getThreeDays(APICallbackObject);
            const country = APICallbackObject.city.country; 
            this.setApplicationState(currentWeather, nextDaysWeather, city, country);
            console.log(APICallbackObject);
        }).catch(error => {
            this.setState({error: true, typedCity: city});
        } );
    }
    
    getCurrentWeather(callback) {
        const temperature = this.convertToCelsius(callback.list[0].main.temp);
        const pressure = callback.list[0].main.pressure;
        const weather = callback.list[0].weather[0].description;
        return {temperature, pressure, weather};
    }

    getThreeDays(callback) {
        const temperature = [
            this.convertToCelsius(callback.list[8].main.temp),
            this.convertToCelsius(callback.list[16].main.temp),
            this.convertToCelsius(callback.list[24].main.temp),
        ];
        const pressure = [
            callback.list[8].main.pressure,
            callback.list[16].main.pressure,
            callback.list[24].main.pressure,
        ];
        const weather = [
            callback.list[8].weather[0].description,
            callback.list[16].weather[0].description,
            callback.list[24].weather[0].description
        ];
        return {temperature, pressure, weather};
    }

    convertToCelsius(kelvins) {
        const celsius = Math.floor((kelvins - 273.15)*100)/100;
        return celsius;
    }

    componentWillUpdate() {
        this.animateDataBoxes();
    }

    animateDataBoxes() {
        const city = document.getElementsByClassName('city__content')[0];
        const data = document.getElementsByClassName('data__info')[0];
        if(city && data) {
            data.classList.add('fade-out');
            city.classList.add('fade-out');
            setTimeout(function() {
                data.classList.remove('fade-out');
                city.classList.remove('fade-out');
            }, 100)
        }
    }

    setApplicationState(currentWeather, nextDaysWeather, city, country) {
        this.setState({
            error: false,
            typedCity: city,
            country: country,
            time: currentWeather.time,
            current_temperature: currentWeather.temperature + ' ℃',
            current_pressure: currentWeather.pressure + ' hPa',
            current_weather: currentWeather.weather,
            day_2_temperature: nextDaysWeather.temperature[0] + ' ℃',
            day_2_pressure: nextDaysWeather.pressure[0] + ' hPa',
            day_2_weather: nextDaysWeather.weather[0],
            day_3_temperature: nextDaysWeather.temperature[1] + ' ℃',
            day_3_pressure: nextDaysWeather.pressure[1] + ' hPa',
            day_3_weather: nextDaysWeather.weather[1],
            day_4_temperature: nextDaysWeather.temperature[2] + ' ℃',
            day_4_pressure: nextDaysWeather.pressure[2] + ' hPa',
            day_4_weather: nextDaysWeather.weather[2],
        });
    }
    /*
    * TO DO:
    * - single setState function
    * - function calculating temperature
    * - pressure change indicator
    */

    render() {
        if(!this.state.ready) return null;
        return (
            <div className="app">
                <div className="weather-app">
                    <Header 
                    typedCity={this.state.typedCity} 
                    country={this.state.country} 
                    isError={this.state.error}
                    handleSearch={this.handleSearch} 
                    listOfCities={this.state.data}
                    animateDataBoxes={this.animateDataBoxes} />
                    
                    <WeatherData 
                    country={this.state.country} 
                    typedCity={this.state.typedCity} 
                    pressure={this.state.current_pressure} 
                    weather={this.state.current_weather} 
                    temperature={this.state.current_temperature} 
                    isError={this.state.error}
                    animateDataBoxes={this.animateDataBoxes} 
                    day_2_pressure={this.state.day_2_pressure}
                    day_2_temperature={this.state.day_2_temperature}
                    day_2_weather={this.state.day_2_weather}
                    day_3_pressure={this.state.day_3_pressure}
                    day_3_temperature={this.state.day_3_temperature}
                    day_3_weather={this.state.day_3_weather}
                    day_4_pressure={this.state.day_4_pressure}
                    day_4_temperature={this.state.day_4_temperature}
                    day_4_weather={this.state.day_4_weather}
                    />
                </div>
                <Footer />
            </div>
        );
    }
}

ReactDOM.render(<Main />, rootDir);