import React from 'react';
import ReactDOM from 'react-dom';

export default class Droplist extends React.Component { 
    constructor(props) {
        super(props);
        this.handleSelectOption = this.handleSelectOption.bind(this);
    }
    handleSelectOption(e, id) {
        console.log(this.props.cities[id]);
    }
    render() { 
        let cities = this.props.cities;
        return (
            <ul className="input__recommended-list">
                {cities.map((city, index)=>{
                    return <li value={city} key={index} onClick={((e) => this.handleSelectOption(e, index))}>{city}</li>;
                })}
            </ul>  
        );
    }
}