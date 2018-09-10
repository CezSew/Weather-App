import React from 'react';
import ReactDOM from 'react-dom';
import SearchForm from '../components/SearchForm';

export default class Header extends React.Component {
    render() {
        if(!this.props.isError) {
            return  (
                <header className="header">
                    <div className="container">
                        <a href="#" className="weather-app__logo">
                            <h1 className="weather-app__title title">Weather App <span className="title__sub">powered by React</span></h1>
                        </a>
                        <SearchForm 
                        animateDataBoxes={this.props.animateDataBoxes}
                        handleSearch={this.props.handleSearch} 
                        listOfCities={this.props.listOfCities} />
                        <div className="weather-app__information information"></div>
                    </div>
                </header>
            );
        } else {
            return  (
                <header className="header"> 
                    <div className="container">
                        <a href="#" className="weather-app__logo">
                            <h1 className="weather-app__title title">Weather App <span className="title__sub">powered by React</span></h1>
                        </a>
                        <SearchForm 
                        animateDataBoxes={this.props.animateDataBoxes}
                        handleSearch={this.props.handleSearch} 
                        listOfCities={this.props.listOfCities} />
                        <div className="weather-app__information information"></div>
                    </div>
                </header>
            );
        }
        
    }
  }
   