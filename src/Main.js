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
            current: { 
                temperature: '',
                pressure: '',
                weather: '',
            },
            days: {
                day_2: {
                    temperature: '',
                    pressure: '',
                    weather: '',
                },
                day_3: {
                    temperature: '',
                    pressure: '',
                    weather: '',
                },
                day_4: {
                    temperature: '',
                    pressure: '',
                    weather: '',
                },
            }
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
        this.showLoader();
        fetch(requestURL)
        .then(results => results.json())
        .then(data => APICallbackObject = data)
        .then(() => {
            this.showLoader();
            const currentWeather = this.getCurrentWeather(APICallbackObject);
            const nextDaysWeather = this.getNextDays(APICallbackObject);
            const nextHoursWeather = this.getNextHours(APICallbackObject);
            console.log(nextHoursWeather);
            const country = APICallbackObject.city.country; 

            this.setApplicationState(currentWeather, nextDaysWeather, city, country);

        }).catch(error => {
            this.setState({error: true, typedCity: city});
        } );
    }
    
    showLoader() {
        var loader = document.getElementsByClassName('loader');
        loader[0].classList.toggle('hidden');
    }

    getCurrentWeather(callback) {
        const temperature = this.convertToCelsius(callback.list[0].main.temp);
        const pressure = callback.list[0].main.pressure;
        const weather = callback.list[0].weather[0].description;
        return {temperature, pressure, weather};
    }

    getNextDays(callback) {
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

    getNextHours(callback) {
        const hours = {
            nextThreeHours: {
                time: callback.list[1].dt_txt,
                weather: callback.list[1].weather[0].description,
                pressure: callback.list[1].main.pressure,
                temperature: this.convertToCelsius(callback.list[1].main.temp)
            },
            nextSixHours: {
                time: callback.list[2].dt_txt,
                weather: callback.list[2].weather[0].description,
                pressure: callback.list[2].main.pressure,
                temperature: this.convertToCelsius(callback.list[2].main.temp)
            },
            nextNineHours: {
                time: callback.list[3].dt_txt,
                weather: callback.list[3].weather[0].description,
                pressure: callback.list[3].main.pressure,
                temperature: this.convertToCelsius(callback.list[3].main.temp)
            }
        };
        return hours;
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
            current: {
                temperature: currentWeather.temperature + ' ℃',
                pressure: currentWeather.pressure + ' hPa',
                weather: currentWeather.weather,
            },
            days: {
                day_2: {
                    temperature: nextDaysWeather.temperature[0] + ' ℃',
                    pressure: nextDaysWeather.pressure[0] + ' hPa',
                    weather: nextDaysWeather.weather[0],
                },
                day_3: {
                    temperature: nextDaysWeather.temperature[1] + ' ℃',
                    pressure: nextDaysWeather.pressure[1] + ' hPa',
                    weather: nextDaysWeather.weather[1],
                },
                day_4: {
                    temperature: nextDaysWeather.temperature[2] + ' ℃',
                    pressure: nextDaysWeather.pressure[2] + ' hPa',
                    weather: nextDaysWeather.weather[2],
                }
            }
        });
    }

    render() {
        if(!this.state.ready) return null;
        return (
            <div className="app">
                <div className="loader hidden"></div>
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
                    current={this.state.current}
                    isError={this.state.error}
                    animateDataBoxes={this.animateDataBoxes} 
                    days={this.state.days}
                    />
                </div>
                <Footer />
            </div>
        );
    }
}

ReactDOM.render(<Main />, rootDir);