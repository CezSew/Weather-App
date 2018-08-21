import React from 'react';
import ReactDOM from 'react-dom';
import SearchForm from './components/SearchForm';
import Footer from './components/Footer';

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
        console.log("selected: " + city);
        let temperatureInKelvins;
        let temperatureInCelsius = 0;
        let APICallbackObject;
        const requestURL = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=a5d803bdbb963adcf81a3a6444580326';
        
        fetch(requestURL)
        .then(results => results.json())
        .then(data => APICallbackObject = data)
        .then(() => {
            temperatureInKelvins = APICallbackObject.list[0].main.temp;    
            temperatureInCelsius = Math.floor((temperatureInKelvins - 273.15)*100)/100;
            this.setState({
                temperature: temperatureInCelsius + '℃',
                error: false,
                typedCity: city
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
                                <h1 className="weather-app__title">Weather App 0.2A</h1>
                                {this.state.temperature ? <p className="weather-app__city"><b>{this.state.typedCity}</b></p> : ''}
                            </header>
                            <p className="weather-app__temperature">{this.state.temperature}</p>
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