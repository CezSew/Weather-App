import React from 'react';
import ReactDOM from 'react-dom';

const Info = () => (
    <aside className="header__information information">
        <button className="information__button">i</button>
        <p className="information__text">
            Aplikacja wykorzystuje API <a href="https://openweathermap.org/api" rel="nofollow">Open Weather Map</a>. Ikony pogodowe pochodzą z serwisu <a href="http://amcharts.com" rel="nofollow">amcharts.com</a>, ikonki strzałek svg pochodzą z <a href="http://freepik.com" rel="nofollow">freepik.com</a>
        </p>
    </aside>
);
    
export default Info;