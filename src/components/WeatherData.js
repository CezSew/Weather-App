import React from 'react';
import ReactDOM from 'react-dom';

export default class WeatherData extends React.Component {
    constructor(props) {
        super(props);
        this.translateWeatherStatus = this.translateWeatherStatus.bind(this);
        this.state = {
            icon: '',
        }
    }

    translateWeatherStatus(weather) {
        if(weather==='clear sky') {
            return ["clear","Bezchmurnie"];
        } else if (weather==='few clouds') {
            return ["broken-clouds", "Niskie zachmurzenie"]; 
        } else if (weather==='scattered clouds' || weather==='broken clouds' || weather==='overcast clouds') {
            return ["broken-clouds", "Umiarkowane zachmurzenie"];
        } else if (weather==='mist') {
            return ["foggy","Mgła"];
        } else if (weather==='shower rain' || weather==='very heavy rain' || weather==='heavy intensity shower rain') {
            return ["heavy-rain","Ulewny deszcz"];
        } else if (weather==='rain' || weather==='light intensity shower rain' || weather==='ragged shower rain') {
            return ["heavy-rain","Deszcz"];
        } else if (weather==='light rain') {
            return ["heavy-rain","Mżawka"];
        } else if (weather==='moderate rain') {
            return ["heavy-rain","Umiarkowane opady deszczu"]; 
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
        const weather = this.translateWeatherStatus(this.props.weather);
        const icon = weather[0];
        const weatherName = weather[1];
        const loaded = this.props.typedCity;
        return  (
            <section className="weather-data">
                <div className="container">
                    <div id="city" className="weather-data__city city">
                        <p className={loaded ? "city__content fade-in" : "city__content fade-out"} >
                            <b>{loaded ? this.props.typedCity + ', ' + this.props.country : ''}</b>
                        </p>
                    </div> 
                    <div id="data" className="weather-data__data data">
                        <div className={"data__icon " + icon}></div>
                        <div className="data__info">
                            <p className={loaded ? "data__temperature fade-in" : "data__temperature fade-out" }>
                                {this.props.temperature}
                            </p>
                            <p className={loaded ? "data__pressure fade-in" : "data__pressure fade-out"}>
                                {this.props.pressure}
                            </p>
                            <p className={loaded ? "data__weather fade-in" : "data__weather fade-out" }>
                                {weatherName}
                            </p>
                        </div>
                    </div>
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
   