import React from 'react';
import ReactDOM from 'react-dom';
import Droplist from './Droplist';

export default class SearchInput extends React.Component { 
    constructor(props) {
        super(props);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.showList = this.showList.bind(this);
        this.clearInput = this.clearInput.bind(this);
        this.clearList = this.clearList.bind(this);
        this.state = {
            cities: [],
        }
    }
    handleKeyUp(e) {
        this.showList(e);
    }
    
    clearInput() {
        // do it by ref
        document.getElementById("city-input").value = '';
    }

    clearList() {
        this.setState({cities: ''}); 
    }
    showList(e) {
        const searchFieldValue = e.target.value;
        const listOfCities = this.props.listOfCities;
        const expression = new RegExp(searchFieldValue, "i");
        let counter = 0;
        let recommendedList = [];

        if(searchFieldValue.length > 1) {
            listOfCities.forEach(function(key){
                if (key.search(expression) != -1) { 
                    if(!(counter>5)) {
                        counter++;
                        recommendedList.push(key);
                    } 
                }
            });
         }
         this.setState({cities: recommendedList}); 
    }
    
    render() { 
        let cities = this.state.cities;
        return (
            <div className="form__container">
                <input id="city-input" className="input input--text" onKeyUp={this.handleKeyUp} type="text" name="city" placeholder="Miasto" autoComplete="off"/> 
                <Droplist 
                ref={(element) => this._list = element}
                cities={cities} 
                handleSearch={this.props.handleSearch}
                clearInput={this.clearInput}
                clearList={this.clearList}
                /> 
            </div>
        );
    }
}