import React from 'react';
import ReactDOM from 'react-dom';

export default class SearchInput extends React.Component { 
    constructor(props) {
        super(props);
       this.handleKeyUp = this.handleKeyUp.bind(this);
       this.showList = this.showList.bind(this);
       this.handleSelectOption = this.handleSelectOption.bind(this);
       this.state = {
           cities: [],
       }
    }
    handleKeyUp(e) {
        this.showList(e);
    }
    
    handleSelectOption(e) {
        console.log(e);
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
            <div>
                <input onKeyUp={this.handleKeyUp} type="text" name="city" placeholder="Miasto" autoComplete="off"/> 
                <ul className="input__recommended-list">
                    {cities.map((city, index)=>{
                        return <li key={index} onClick={this.handleSelectOption}>{city}</li>;
                    })}
                </ul>  
            </div>
        );
    }
}