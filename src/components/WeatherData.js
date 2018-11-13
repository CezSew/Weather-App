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
            return ["heavy-rain","Lekki deszcz"];
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
        
        if(!this.props.isError) {
            const current = {temperature: this.props.current.temperature, pressure: this.props.current.pressure, weather: this.props.current.weather};
            const day_2 = {temperature: this.props.days.day_2.temperature, pressure: this.props.days.day_2.pressure, weather: this.props.days.day_2.weather};
            const day_3 = {temperature: this.props.days.day_3.temperature, pressure: this.props.days.day_3.pressure, weather: this.props.days.day_3.weather};
            const day_4 = {temperature: this.props.days.day_4.temperature, pressure: this.props.days.day_4.pressure, weather: this.props.days.day_4.weather};
            const hours = this.props.nextHours;
            const weather = this.translateWeatherStatus(current.weather);
            const icon = weather[0];
            const weatherName = weather[1];
            const pressureTrend = this.getPressureTrend(this.props.nextDay_pressure);
        return  (
            <section className={weather ? "weather-data" : "hidden"}>
                <div className="container">
                    <aside className="weather-data__next next">
                        <h3 className="next__title">Jutro:</h3>
                        <div className="next__weather">
                            <div className="next__data">
                                {day_2.temperature} <br />
                                {day_2.pressure} <br />
                            </div>
                            <div className={"next__icon " + this.translateWeatherStatus(day_2.weather)[0]}></div>
                            <div className="next__weather-name">
                                {this.translateWeatherStatus(day_2.weather)[1]}
                            </div>
                        </div>
                        <h3 className="next__title">Pojutrze:</h3>
                        <div className="next__weather">
                            <div className="next__data">
                                {day_3.temperature} <br />
                                {day_3.pressure} <br />
                            </div>
                            <div className={"next__icon " + this.translateWeatherStatus(day_3.weather)[0]}></div>
                            <div className="next__weather-name">
                                {this.translateWeatherStatus(day_3.weather)[1]}
                            </div>
                        </div>
                        <h3 className="next__title">Za trzy dni:</h3>
                        <div className="next__weather">
                            <div className="next__data">
                                {day_4.temperature} <br />
                                {day_4.pressure} <br />
                            </div>
                            <div className={"next__icon " + this.translateWeatherStatus(day_4.weather)[0]}></div>
                            <div className="next__weather-name">
                                {this.translateWeatherStatus(day_4.weather)[1]}
                            </div>
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
                                    {current.temperature} 
                                </p>
                                <p className="data__pressure ">
                                    {current.pressure}
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
                        <p className="next__title">{hours.nextThreeHours.time}</p>
                        <div className="next__weather">
                            <div className="next__data">
                                {hours.nextThreeHours.temperature} <br />
                                {hours.nextThreeHours.pressure} <br />
                            </div>
                            <div className={"next__icon " + this.translateWeatherStatus(hours.nextThreeHours.weather)[0]}></div>
                            <div className="next__weather-name">
                                {this.translateWeatherStatus(hours.nextThreeHours.weather)[1]}
                            </div>
                        </div>
                        <p className="next__title">{hours.nextSixHours.time}</p>
                        <div className="next__weather">
                            <div className="next__data">
                                {hours.nextSixHours.temperature} <br />
                                {hours.nextSixHours.pressure} <br />
                            </div>
                            <div className={"next__icon " + this.translateWeatherStatus(hours.nextSixHours.weather)[0]}></div>
                            <div className="next__weather-name">
                                {this.translateWeatherStatus(hours.nextSixHours.weather)[1]}
                            </div>
                        </div>
                        <p className="next__title">{hours.nextNineHours.time}</p>
                        <div className="next__weather">
                            <div className="next__data">
                                {hours.nextNineHours.temperature} <br />
                                {hours.nextNineHours.pressure} <br />
                            </div>
                            <div className={"next__icon " + this.translateWeatherStatus(hours.nextNineHours.weather)[0]}></div>
                            <div className="next__weather-name">
                                {this.translateWeatherStatus(hours.nextNineHours.weather)[1]}
                            </div>
                        </div>
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
   