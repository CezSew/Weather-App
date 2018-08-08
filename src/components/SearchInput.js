import React from 'react';
import ReactDOM from 'react-dom';

export default class SearchInput extends React.Component { 
    constructor(props) {
        super(props);
       this.handleKeyUp = this.handleKeyUp.bind(this);
       this.showList = this.showList.bind(this);
    }
    handleKeyUp(e) {
        this.showList(e);
    }

      
    showList(e) {
        const searchFieldValue = e.target.value;
        console.log(this.state);
        // const expression = new RegExp(searchField, "i");
    }
    render() {
        return (
            <div>
                <input onKeyUp={this.handleKeyUp} type="text" name="city" placeholder="Miasto"/> 
                <ul>
                
                </ul>  
            </div>
        );
    }
}