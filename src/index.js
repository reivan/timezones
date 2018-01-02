import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TimezonesTable from './TimezonesTable';
import { createStore } from 'redux';
import reducer from './reducer';

let timezonesStore = createStore(reducer);

let nextTimezoneId = 0;

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

const render = () => {
  ReactDOM.render(
    <TimezonesTable
      timezones={timezonesStore.getState()}
      addTimezone={UTCDifference => timezonesStore.dispatch({
        type: 'ADD_TIMEZONE',
        id: nextTimezoneId++,
        UTCDifference: UTCDifference
      })}
      removeTimezone={id => timezonesStore.dispatch({
        type: 'REMOVE_TIMEZONE',
        id
      })}
    />,
    document.getElementById('root')
  );
};

timezonesStore.subscribe(() => (
  localStorage.setItem('timezones', JSON.stringify(timezonesStore.getState())))
);
timezonesStore.subscribe(render);
render();
