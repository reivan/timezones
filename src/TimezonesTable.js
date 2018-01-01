import React, { Component } from 'react';
import { addHours, formatTimezone } from './utils';

const UTCDiffernceList = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
  -1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11, -12,
];

export default ({ timezones, addTimezone, removeTimezone }) => {
  return (
    <table className="timezone-table table is-striped is-hoverable is-bordered is-narrow">
      <thead>
        <tr>
          {timezones.map(tz => {
            return (
              <th key={tz.id}>
                {formatTimezone(tz.UTCDifference)}
                &nbsp;
                <button onClick={() => removeTimezone(tz.id)}>X</button>
              </th>
            );
          })}
          <th><TimezonePicker addTimezone={addTimezone} /></th>
        </tr>
      </thead>
      
      <tbody>
        {[
          0,  1,  2,  3,  4,  5,  6,  7,  8,  9,
          10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          20, 21, 22, 23
        ].map(hour => {
          return (
            <tr key={hour}>
              {timezones.map(tz => {
                const displayHour = addHours(hour, tz.UTCDifference);
                return (
                  <td
                    key={tz.id}
                    className={displayHour >= 0 && displayHour <= 6 ? 'night-hour' : ''}>
                    {('' + displayHour).padStart(2, '0')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

class TimezonePicker extends Component {
  render() {
    return (
      <div>
        <select
          onChange={e => this.props.addTimezone(+e.target.value)}
          value="null"
        >
          <option disabled value="null">add timezone</option>
          {UTCDiffernceList.map(diff => {
            return (
              <option key={diff} value={diff}>{formatTimezone(diff)}</option>
            );
          })}
        </select>
      </div>
    );
  }
}