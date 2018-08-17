import React from 'react';
import ReactDOM from 'react-dom';

export default class Droplist extends React.Component { 
    constructor(props) {
        super(props);
    }
    render() { 
        let cities = this.props.cities;
        return (
            <ul className="input__recommended-list">
                {cities.map((city, index)=>{
                    return <li value={city} key={index} onClick={()=>this.props.handleSearch(city)}>{city}</li>;
                })}
            </ul>  
        );
    }
}