import React from 'react';
import ReactDOM from 'react-dom';

export default class Droplist extends React.Component { 
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(city) {
        this.props.handleSearch(city);
        this.props.clearInput();
        this.props.clearList();
    }

    render() { 
        let cities = this.props.cities;
        return (
            <ul className="input__recommended-list" id="cities-list" >
                {cities.map((city, index)=>{
                    return <li 
                    value={city} 
                    key={index} 
                    onClick={
                        ()=>{
                            this.handleClick(city);
                        }
                        }>
                    {city}</li>;
                })}
            </ul>  
        );
    }
}