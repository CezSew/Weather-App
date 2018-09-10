import React from 'react';
import ReactDOM from 'react-dom';
import SearchInput from './SearchInput';

export default class Search extends React.Component {
    constructor(props){
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
    }


    handleSearch(e) {
        e.preventDefault();
        const city = e.target.elements.city.value.trim();
        e.target.elements.city.value = '';
        if(city){
            this.props.animateDataBoxes();
            this.props.handleSearch(city);
        }
    }
      
    render() {
        return (
            <form onSubmit={this.handleSearch} className="weather-app__form form">
                <SearchInput 
                animateDataBoxes={this.props.animateDataBoxes}
                listOfCities={this.props.listOfCities} 
                handleSearch={this.props.handleSearch}/>
                <button className="button button--search">Wyszukaj</button>
            </form>
        )
    }
}
