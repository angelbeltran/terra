import React, { Component } from 'react';
import './App.css';
import PlayerDash from './containers/PlayerDash'
import GameBoardContainer from './containers/GameBoardContainer'
import Form from './components/Form'


export default class App extends Component {
  render() {
    return (
        <div
          className="container-fluid"
          style={{
            backgroundColor: 'rgb(63, 127, 255)',
          }}
        >
          <div className="row no-gutters">
            <div className="card col-4">
              <Form />
            </div>
            <div className="col-8">
              <PlayerDash
                name="Bob"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <GameBoardContainer />
            </div>
          </div>
        </div>
    )
  }
}
