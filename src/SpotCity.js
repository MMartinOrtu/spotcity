import React, { Component } from 'react';
import Map from './Components/map';
import Panel from './Components/panel';

class SpotCity extends Component {

  render() {
    return (
      <React.Fragment>
        <Panel />
        <Map />
      </React.Fragment>
    )
  }
}

export default SpotCity;
