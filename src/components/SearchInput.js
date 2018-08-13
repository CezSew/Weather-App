import React from 'react';
import ReactDOM from 'react-dom';

export default class SearchInput extends React.Component { 
    constructor(props) {
        super(props);
       this.handleKeyUp = this.handleKeyUp.bind(this);
       this.showList = this.showList.bind(this);
       this.state = {
           cities: [],
       }
    }
    handleKeyUp(e) {
        this.showList(e);
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
                        console.log("tested "+ key + " and " + expression);
                        counter++;
                        recommendedList.push(key);
                    } 
                }
                
            });
         }
         this.setState({cities: recommendedList});
        
    }
    render() {

        return (
            <div>
                <input onKeyUp={this.handleKeyUp} type="text" name="city" placeholder="Miasto" autoComplete="off"/> 
                <ul className="input__recommended-list">
                    {this.state.cities}
                </ul>  
            </div>
        );
    }
}