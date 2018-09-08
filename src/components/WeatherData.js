import React from 'react';
import ReactDOM from 'react-dom';

export default class WeatherData extends React.Component {
    constructor(props) {
        super(props);
        this.translateWeatherStatus = this.translateWeatherStatus.bind(this);
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
    render() {
        if(!this.props.isError) {
        return  (
            <section className="weather-data">
                <div className="container">
                    {this.props.typedCity ? <div className="weather-data__city city"><p className="city__content"><b>{this.props.typedCity}, {this.props.country}</b></p></div> : ''}
                    {this.props.typedCity ?
                    <div className="weather-data__data data">
                        <p className="data__temperature">{this.props.temperature}</p>
                        <p className="data__pressure">{this.props.pressure}</p>
                        <p className="data__weather">{this.translateWeatherStatus(this.props.weather)}</p>
                    </div>
                    : ''}
                </div>
            </section>
        );
        } else {
            return  ( 
            <section className="weather-data">
                <div className="container">
                    <div className="weather-data__city city">
                        <p className="city__content">Nie znaleziono miejscowości o nazwie <b>"{this.props.typedCity}"</b>, spróbuj ponownie!</p>
                    </div>
                </div>
            </section>
            );
        }
    }
}
   