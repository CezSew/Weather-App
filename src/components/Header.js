import React from 'react';
import ReactDOM from 'react-dom';
import SearchForm from '../components/SearchForm';
import Info from '../components/Info';

export default class Header extends React.Component {
    render() {
        if(!this.props.isError) {
            return  (
                <header className="header">
                    <div className="container">
                        <a href="#" className="header__logo">
                            <h1 className="header__title title">Weather App <span className="title__sub">powered by React</span></h1>
                        </a>
                        <SearchForm 
                        animateDataBoxes={this.props.animateDataBoxes}
                        handleSearch={this.props.handleSearch} 
                        listOfCities={this.props.listOfCities} />
                        <Info />
                    </div>
                </header>
            );
        } else {
            return  (
                <header className="header"> 
                    <div className="container">
                        <a href="#" className="header__logo">
                            <h1 className="header__title title">Weather App <span className="title__sub">powered by React</span></h1>
                        </a>
                        <SearchForm 
                        animateDataBoxes={this.props.animateDataBoxes}
                        handleSearch={this.props.handleSearch} 
                        listOfCities={this.props.listOfCities} />
                        <div className="header__information information"></div>
                    </div>
                </header>
            );
        }
        
    }
  }
   