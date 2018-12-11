import React from 'react';
import {connect} from 'react-redux';
import '../Styles/panel.css';

const PanelView = ({score, city}) =>
    <React.Fragment>
        <header className="header">
            <p className="score"><span className="km">{score.km}</span> kms left &nbsp; &nbsp;<span className="cities">{score.spottedCities}</span> cities</p>
            <p className="city-to-find">Where is <span className="city">{city.capitalCity}</span> ?</p>
        </header>
    </React.Fragment>


const Panel = connect( state => ({
    score: state.score,
    city: state.cityToFind
  }))(PanelView)

 export default Panel;