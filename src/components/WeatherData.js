import React from 'react';
import ReactDOM from 'react-dom';

export default class WeatherData extends React.Component {
    constructor(props) {
        super(props);
        this.translateWeatherStatus = this.translateWeatherStatus.bind(this);
    }
    getPressureTrend(nextDayPressure) {
        const currentPressure = this.props.pressure;
        if(nextDayPressure >= currentPressure) {
            return "Rising";
        } else {
            return "Dropping";
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
            return ["heavy-rain","Intensywne opady deszczu"];
        } else if (weather==='extreme rain') {
            return ["heavy-rain","Ekstremalne opady deszczu"];
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
        console.log(this.props.typedCity);
        if(!this.props.isError) {
        const weather = this.translateWeatherStatus(this.props.weather);
        const icon = weather[0];
        const weatherName = weather[1];
        const pressureTrend = this.getPressureTrend(this.props.nextDay_pressure);
        const day_2 = {temperature: this.props.day_2_temperature, pressure: this.props.day_2_pressure, weather: this.props.day_2_weather};
        const day_3 = {temperature: this.props.day_3_temperature, pressure: this.props.day_3_pressure, weather: this.props.day_3_weather};
        const day_4 = {temperature: this.props.day_4_temperature, pressure: this.props.day_4_pressure, weather: this.props.day_4_weather};
        return  (
            <section className={weather ? "weather-data" : "hidden"}>
                <div className="container">
                    <aside className="weather-data__next-days next-days">
                        <h3 className="next-days__title">Jutro:</h3>
                        <div className="next-days__weather">
                            {day_2.temperature} <br />
                            {day_2.pressure} <br />
                            {this.translateWeatherStatus(day_2.weather)[1]}
                        </div>
                        <h3 className="next-days__title">Pojutrze:</h3>
                        <div className="next-days__weather">
                            {day_3.temperature} <br />
                            {day_3.pressure} <br />
                            {this.translateWeatherStatus(day_3.weather)[1]} <br /><br />
                        </div>
                        <h3 className="next-days__title">Za trzy dni:</h3>
                        <div className="next-days__weather">
                            {day_4.temperature} <br />
                            {day_4.pressure} <br />
                            {this.translateWeatherStatus(day_4.weather)[1]} <br /><br />
                        </div>
                    </aside>
                    <main className="weather-data__current">
                        <div id="city" className="weather-data__city city">
                            <p className="city__content">
                                <b>{this.props.typedCity + ', ' + this.props.country}</b>
                            </p>
                        </div> 
                        <div id="data" className="weather-data__data data">
                            <div className={"data__icon " + icon}></div>
                            <div className="data__info">
                                <p className="data__temperature">
                                    {this.props.temperature} 
                                </p>
                                <p className="data__pressure ">
                                    {this.props.pressure}
                                    {(pressureTrend === 'Rising') ? 
                                    <span className='pressure-arrow pressure-arrow--rising'></span> : 
                                    <span className='pressure-arrow pressure-arrow--dropping'></span>}
                                </p>
                                <p className="data__weather">
                                    {weatherName}
                                </p>
                            </div>
                        </div>
                    </main>
                    <aside className="weather-data__next-hours">
                    
                    </aside>
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
   