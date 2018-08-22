import React from 'react';
import ReactDOM from 'react-dom';
import SearchForm from './components/SearchForm';
import Footer from './components/Footer';

const rootDir = document.getElementById('app');

class Main extends React.Component {
    constructor(props){
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.translateWeatherStatus = this.translateWeatherStatus.bind(this);
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
    translateWeatherStatus(weather) {
        if(weather==='clear sky') {
            return "Bezchmurnie";
        } else if (weather==='few clouds') {
            return "Niskie zachmurzenie";
        } else if (weather==='scattered clouds' || weather==='broken clouds' || weather==='overcast clouds') {
            return "Umiarkowane zachmurzenie";
        } else if (weather==='mist') {
            return "Mgła";
        } else if (weather==='shower rain' || weather==='very heavy rain' || weather==='heavy intensity shower rain') {
            return "Ulewny deszcz";
        } else if (weather==='rain' || weather==='light intensity shower rain' || weather==='ragged shower rain') {
            return "Deszcz";
        } else if (weather==='light rain') {
            return "Mżawka";
        } else if (weather==='moderate rain') {
            return "Umiarkowane opady deszczu";
        } else if (weather==='heavy intensity rain') {
            return "Intensywne opady deszczu";
        } else if (weather==='extreme rain') {
            return "Ekstremalne opady deszczu";
        } else if (weather==='freezing rain') {
            return "Deszcz marznący";
        } else if (weather==='thunderstorm') {
            return "Burza z piorunami";
        } else if (weather==='snow') {
            return "Opady śniegu";
        } else if (weather==='light snow') {
            return "Małe opady śniegu";
        } else if (weather==='heavy snow') {
            return "Duże opady śniegu";
        } else if (weather==='sleet' || weather==='shower sleet' || weather==='light rain and snow' || weather==='rain and snow' || weather==='light shower snow' || weather==='shower snow' || weather==='heavy shower snow') {
            return "Śnieg z deszczem";
        } else if (weather==='sleet') {
            return "Śnieg z deszczem";
        } else {
            return weather;
        }
    }

    handleSearch(city) {
        let APICallbackObject;
        const requestURL = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=a5d803bdbb963adcf81a3a6444580326';
        
        fetch(requestURL)
        .then(results => results.json())
        .then(data => APICallbackObject = data)
        .then(() => {
            console.log(APICallbackObject);
            let temperatureInKelvins = APICallbackObject.list[0].main.temp;    
            let temperatureInCelsius = Math.floor((temperatureInKelvins - 273.15)*100)/100;
            let pressure = APICallbackObject.list[0].main.pressure;
            let weather = APICallbackObject.list[0].weather[0].description;
            let translatedWeather = this.translateWeatherStatus(weather);
            let country = APICallbackObject.city.country; 
            this.setState({
                temperature: temperatureInCelsius + ' ℃',
                error: false,
                typedCity: city,
                pressure: pressure + ' hPa',
                weather: translatedWeather,
                country: country,
            });
        }).catch(error => {
            console.log(error);
            this.setState({error: true, typedCity: city});
        } );
    }
    
    componentWillMount() {
        this.getCities();
    }
    
    componentDidMount(){
        console.log(this.state.data);
    }

    render() {
        
        if(!this.state.ready) return null;
        if(this.state.error) {
            return (
                <div className="app">
                    <main className="weather-app">
                        <div className="container">
                            <header>
                                <h1 className="weather-app__title">Weather App 0.2A</h1>
                                <p className="weather-app__city">Nie znaleziono miejscowości o nazwie <b>"{this.state.typedCity}"</b>, spróbuj ponownie!</p>
                            </header>
                            <SearchForm handleSearch={this.handleSearch} listOfCities={this.state.data} handleSearch={this.handleSearch}/>
                        </div>
                    </main>
                    <Footer />
                </div>
            );
        } else {
            return (
                <div className="app">
                    <main className="weather-app">
                        <div className="container">
                            <header>
                                <h1 className="weather-app__title">Weather App 0.3A</h1>
                                {this.state.temperature ? <p className="weather-app__city"><b>{this.state.typedCity}, {this.state.country}</b></p> : ''}
                            </header>
                            <p className="weather-app__temperature">{this.state.temperature}</p>
                            <p className="weather-app__pressure">{this.state.pressure}</p>
                            <p className="weather-app__weather">{this.state.weather}</p>
                            <SearchForm handleSearch={this.handleSearch} listOfCities={this.state.data} handleSearch={this.handleSearch}/>
                        </div>
                    </main>
                    <Footer />
                </div>
            );
        }
    }
}

ReactDOM.render(<Main />, rootDir);