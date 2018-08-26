import React from 'react';
import ReactDOM from 'react-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import WeatherData from './components/WeatherData';
import './styles/Main.scss';

const rootDir = document.getElementById('app');

class Main extends React.Component {
    constructor(props){
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
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
        const requestURL = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=a5d803bdbb963adcf81a3a6444580326';
        
        fetch(requestURL)
        .then(results => results.json())
        .then(data => APICallbackObject = data)
        .then(() => {
            let temperatureInKelvins = APICallbackObject.list[0].main.temp;    
            let temperatureInCelsius = Math.floor((temperatureInKelvins - 273.15)*100)/100;
            let pressure = APICallbackObject.list[0].main.pressure;
            let weather = APICallbackObject.list[0].weather[0].description;
            let country = APICallbackObject.city.country; 
            this.setState({
                temperature: temperatureInCelsius + ' ℃',
                error: false,
                typedCity: city,
                pressure: pressure + ' hPa',
                weather: weather,
                country: country,
            });
        }).catch(error => {
            this.setState({error: true, typedCity: city});
        } );
    }
    
    componentWillMount() {
        this.getCities();
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
                    listOfCities={this.state.data} />
                    <WeatherData 
                    pressure={this.state.pressure} 
                    weather={this.state.weather} 
                    temperature={this.state.temperature} 
                    isError={this.state.error} />
                </main>
                <Footer />
            </div>
        );
    }
}

ReactDOM.render(<Main />, rootDir);