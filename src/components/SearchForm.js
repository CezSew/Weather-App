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
            this.props.handleSearch(city);
        }
      }
      
    render() {
        return (
            <form onSubmit={this.handleSearch}>
                <SearchInput listOfCities={this.props.listOfCities} handleSearch={this.props.handleSearch}/>
                <button>Wyszukaj</button>
            </form>
        )
    }
}
