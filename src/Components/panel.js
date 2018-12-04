import React from 'react';
import {connect} from 'react-redux';
import '../Styles/panel.css';

const PanelView = ({score, city}) =>
    <React.Fragment>
        <header className="header">
            <p>Where is... </p>
            <p>{score.score} cities</p>
            <p>{score.km} kms left</p>
        </header>
    </React.Fragment>


const Panel = connect( state => ({
    score: state.score,
    city: state.cityToFind
  }))(PanelView)

 export default Panel;