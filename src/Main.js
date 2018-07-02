import React from 'react';
import ReactDOM from 'react-dom';
import Search from './components/Search';

const rootDir = document.getElementById('app');

class Main extends React.Component {
    constructor(props){
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.state = {
            weather: ''
        };
    }

    getCities() {
        fetch('cities2.json')
        .then(results => results.json())
        .then(data => console.log(data))
    }
    handleSearch(city) {
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
            this.setState({weather: temperatureInCelsius})
        })  
    }
    componentDidMount() {
        this.getCities();
    }

    render() {
        return (
            <div>
                <p>Test</p>
                {this.state.weather}<sup>o</sup>C
                <Search handleSearch={this.handleSearch}/>
            </div>
        );
    }
}

ReactDOM.render(<Main />, rootDir);