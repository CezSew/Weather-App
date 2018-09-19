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
            weather: '',
            temperature: '',
            data: null,
            ready: false,
            error: false,
            typedCity: '',
            country: '',
            pressure: '',
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

    componentWillUpdate() {
        this.animateDataBoxes();
    }

    handleSearch(city) {
        let APICallbackObject;
        const selectedCity = city;
        const requestURL = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=a5d803bdbb963adcf81a3a6444580326';
        fetch(requestURL)
        .then(results => results.json())
        .then(data => APICallbackObject = data)
        .then(() => {
            this.getCurrentWeather(APICallbackObject, city);
        }).catch(error => {
            this.setState({error: true, typedCity: city});
        } );
    }
    
    getCurrentWeather(callback, city) {
        const temperatureInKelvins = callback.list[0].main.temp;    
        const temperatureInCelsius = Math.floor((temperatureInKelvins - 273.15)*100)/100;
        const pressure = callback.list[0].main.pressure;
        const weather = callback.list[0].weather[0].description;
        const country = callback.city.country; 
        this.setState({
            temperature: temperatureInCelsius + ' ℃',
            error: false,
            typedCity: city,
            pressure: pressure + ' hPa',
            weather: weather,
            country: country,
        });
    }

    getLastDays() {

    }

    render() {
        if(!this.state.ready) return null;
        return (
            <div className="app">
                <main className="weather-app">
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
                    pressure={this.state.pressure} 
                    weather={this.state.weather} 
                    temperature={this.state.temperature} 
                    isError={this.state.error}
                    animateDataBoxes={this.animateDataBoxes} />
                </main>
                <Footer />
            </div>
        );
    }
}

ReactDOM.render(<Main />, rootDir);