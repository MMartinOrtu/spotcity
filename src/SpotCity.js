import React, { Component } from 'react';
import {connect} from 'react-redux';
import Map from './Components/map';
import Panel from './Components/panel';
import './Styles/spotcity.css';
import {restartGame} from './Actions/index';

class SpotCityView extends Component {
  render() {
    const {km, spottedCities} = this.props.score;
    const {restartGame} = this.props
    return (
      <React.Fragment>
        {
          km === 0 || spottedCities === 9 ?
          <div className="game-finished">
           {
             km === 0 ? <h1>GAME OVER!!</h1> : <h1>Congratulations!!! You won!</h1> 
           }
            <button className="start-button" onClick={restartGame}>Start Again</button>
          </div> :
          <React.Fragment>
            <Panel />
            <Map />
          </React.Fragment>
        }
      </React.Fragment>
    )
  }
}

const SpotCity = connect( state => ({
  score: state.score
}), dispatch => ({
  restartGame: () => dispatch(restartGame())
}))(SpotCityView)

export default SpotCity;
