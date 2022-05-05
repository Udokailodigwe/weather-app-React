import React from 'react';

//Import css module stylesheet as classes
import classes from './conditions.module.css';

const Conditions = (props) => {

    const { error, loading, responseObj } = props;

    return (
        <div className={classes.wrapper}>

            {error && <small className={classes.small}>Please enter a valid city.</small>}
            {loading && <div className={classes.loader}>Loading...</div>}

            {/**add a tenary operator to display data if response key, cod eqauls 200 */}
            {responseObj.cod === 200 ?
                <div>
                    <p><strong>{responseObj.name}</strong></p>
                    <p>It is currently {Math.round(responseObj.main.temp)} degrees out with{responseObj.weather[0].description}.</p>
                </div>
                : null
            }
        </div>
    )
}

export default Conditions;