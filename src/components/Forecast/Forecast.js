import React, { useState } from 'react';
import Conditions from '../Conditions/conditions';

//Import css module stylesheet as classes
import classes from './Forecast.module.css';

const Forecast = () => {
    /**destructing and using hook. And setting default states*/
    let [city, setCity] = useState('');
    let [unit, setUnit] = useState('imperial');
    let [responseObj, setResponseObj] = useState({});
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);


    const uriEncodedCity = encodeURIComponent(city); //used javascript inbuilt function to encode city-input

    /**
  * GET rapidapi weather data response
  * @method GET
  * @function getForecast 
  * @returns {json-object} - returns weather data  
  */
    function getForecast(e) {

        /**prevents the app and page from refreshing and losing response info, when getForecast is called */
        e.preventDefault();
        if (city === 0) {
            return setError(true);
        }
        //To prepare for new data we i needed to clear state
        setError(false);
        setResponseObj({});

        setLoading(true);


        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
                'X-RapidAPI-Key': process.env.REACT_APP_API_KEY
            }
        };

        /**applied template literal to dynamically add variable to url string using backticks */
        fetch(`https://community-open-weather-map.p.rapidapi.com/weather?units=${unit}&q=${uriEncodedCity}`, options)
            .then(response => response.json())
            .then(response => {
                if (response.cod !== 200) {
                    throw new Error()
                }
                setResponseObj(response)
                setLoading(false);
                console.log(response)
            })
            .catch(err => {
                setError(true);
                setLoading(false);
                console.log(err.message);
            });
    }

    return (
        <div>
            <h2>Find Current Weather Condition</h2>
            <form onSubmit={getForecast}>
                <input
                    className={classes.TextInput}
                    type='text'
                    placeholder='Enter city'
                    maxLength='50'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <label className={classes.Radio}>
                    <input
                        className={classes.TextInput}
                        type='radio'
                        name='units'
                        checked={unit === 'imperial'}
                        value='imperial'
                        onChange={(e) => setUnit(e.target.value)}
                    />
                    Fahrenheit
                </label>
                <label className={classes.Radio}>
                    <input
                        className={classes.TextInput}
                        type='radio'
                        name='units'
                        checked={unit === 'metric'}
                        value='metric'
                        onChange={(e) => setUnit(e.target.value)}
                    />
                    Celcius
                </label>
                {/**this button calls the getForecast() from onSubmit listner in the form element above */}
                <button className={classes.Button} type='submit'>Get Forecast</button>
            </form>

            {/**imported and used condition component to wrap and display response, passed as props also */}
            <Conditions
                responseObj={responseObj}
                error={error}
                loading={loading}
            />
        </div>
    )
}

export default Forecast;