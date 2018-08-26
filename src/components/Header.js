import React from 'react';
import ReactDOM from 'react-dom';
import SearchForm from '../components/SearchForm';

export default class Header extends React.Component {
    render() {
        if(!this.props.error) {
            return  (
                <header className="header">
                    <div className="container">
                        <h1 className="weather-app__title">Weather App 0.3A</h1>
                        {this.props.typedCity ? <p className="weather-app__city"><b>{this.props.typedCity}, {this.props.country}</b></p> : ''}
                        <SearchForm 
                        handleSearch={this.props.handleSearch} 
                        listOfCities={this.props.listOfCities} />
                    </div>
                </header>
            );
        } else {
            return  (
                <header className="header"> 
                    <div className="container">
                        <h1 className="weather-app__title">Weather App 0.3A</h1>
                        <p className="weather-app__city">Nie znaleziono miejscowości o nazwie <b>"{this.props.typedCity}"</b>, spróbuj ponownie!</p>
                    </div>
                </header>
            );
        }
        
    }
  }
   