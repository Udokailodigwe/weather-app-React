import React from 'react';

//Import css module stylesheet as classes
import classes from './conditions.module.css';

const Conditions = (props) => {
    return (
        <div className={classes.wrapper}>
            {/**add a tenary operator to display data if response key, cod eqauls 200 */}
            {props.responseObj.cod === 200 ?
                <div>
                    <p><strong>{props.responseObj.name}</strong></p>
                    <p>It is currently {Math.round(props.responseObj.main.temp)} degrees out with{props.responseObj.weather[0].description}.</p>
                </div>
                : null
            }
        </div>
    )
}

export default Conditions;