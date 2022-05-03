import React, { useState } from 'react';
import Conditions from '../Conditions/conditions';

const Forecast = () => {
    let [responseObj, setResponseObj] = useState({}); //destructing and using useState
    function getForecast() {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
                'X-RapidAPI-Key': 'd2d3af4636msh1613fba1693711cp1c2a39jsn34c1f516a6b9'
            }
        };

        fetch('https://community-open-weather-map.p.rapidapi.com/weather?q=Seattle', options)
            .then(response => response.json())
            .then(response => {
                setResponseObj(response)
            })
            .catch(err => console.error(err));
    }

    return (
        <div>
            <h2>Find Current Weather Condition</h2>
            <div>
                {JSON.stringify(responseObj)}
            </div>
            <button onClick={getForecast}>Get Forecast</button>
        </div>
    )
}

export default Forecast;