import React, { Component } from 'react';
import TimezonesTable from './TimezonesTable';
import { createStore } from 'redux';
import reducer from './reducer';

import './App.css';
import 'bulma/css/bulma.css';

let timezonesStore = createStore(reducer);

let nextTimezoneId = 0;
class App extends Component {
  constructor() {
    super();

    const savedTimezonesString = localStorage.getItem('timezones') || '[]';
    const savedTimezones = JSON.parse(savedTimezonesString);
    if (savedTimezones.length !== 0) {
      savedTimezones.forEach(tz => {
        timezonesStore.dispatch({
          ...tz,
          type: 'ADD_TIMEZONE',
        });
      })
    } else {
      timezonesStore.dispatch({
        type: 'ADD_TIMEZONE',
        id: nextTimezoneId++,
        UTCDifference: 0
      });

      timezonesStore.dispatch({
        type: 'ADD_TIMEZONE',
        id: nextTimezoneId++,
        UTCDifference: 3
      });

      timezonesStore.dispatch({
        type: 'ADD_TIMEZONE',
        id: nextTimezoneId++,
        UTCDifference: -9
      });
    }

    this.state = {
      timezones: timezonesStore.getState()
    };

    timezonesStore.subscribe(() => this.setState({
      timezones: timezonesStore.getState()
    }));
    
    timezonesStore.subscribe(() => (
      localStorage.setItem('timezones', JSON.stringify(timezonesStore.getState())))
    );
  }

  render() {
    return (
      <div className="App">
        <TimezonesTable
          timezones={this.state.timezones}
          addTimezone={UTCDifference => timezonesStore.dispatch({
            type: 'ADD_TIMEZONE',
            id: nextTimezoneId++,
            UTCDifference: UTCDifference
          })}
          removeTimezone={id => timezonesStore.dispatch({
            type: 'REMOVE_TIMEZONE',
            id
          })}
        />
      </div>
    );
  }
}

export default App;
