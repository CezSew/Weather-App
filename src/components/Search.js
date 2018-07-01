import React from 'react';
import ReactDOM from 'react-dom';

export default class Search extends React.Component {
    constructor(props){
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
    }
    handleSearch(e) {
        e.preventDefault();
        const city = e.target.elements.city.value.trim();
        if(city){
            this.props.handleSearch(city);
        }
      }

    render() {
        return (
        <div>
            <br /><br />
            <form onSubmit={this.handleSearch}>
                <input type="text" name="city" placeholder="Type in a city"/>
                <button>Add Option</button>
            </form>
        </div>
        )
    }
}
