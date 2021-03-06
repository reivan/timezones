import React, { Component } from 'react'
import { addHours, formatTimezone } from './../../utils'
import PropTypes from 'prop-types'

import 'bulma/css/bulma.css'
import './TimezonesTable.css'

const UTCDiffernceList = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
  -1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11, -12
]

const TimezonesTable = ({ timezones, addTimezone, removeTimezone }) => {
  return (
    <table className="timezone-table table is-striped is-hoverable is-bordered is-narrow">
      <thead>
        <tr>
          {timezones.map(tz => {
            return (
              <th key={tz.id}>
                <button className="button" disabled>{formatTimezone(tz.UTCDifference)}</button>
                {' '}
                <button className="button is-danger" onClick={() => removeTimezone(tz.id)}>X</button>
              </th>
            )
          })}
          <th><TimezonePicker addTimezone={addTimezone} /></th>
        </tr>
      </thead>

      <tbody>
        {[
          // eslint-disable-next-line no-multi-spaces
          0,  1,  2,  3,  4,  5,  6,  7,  8,  9,
          10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          20, 21, 22, 23
        ].map(hour => {
          return (
            <tr key={hour}>
              {timezones.map(tz => {
                const displayHour = addHours(hour, tz.UTCDifference)
                return (
                  <td
                    key={tz.id}
                    className={displayHour >= 0 && displayHour <= 6 ? 'night-hour' : ''}>
                    {('' + displayHour).padStart(2, '0')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

TimezonesTable.propTypes = {
  timezones: PropTypes.array,
  addTimezone: PropTypes.func,
  removeTimezone: PropTypes.func
}

class TimezonePicker extends Component {
  render () {
    return (
      <div className="select">
        <select
          onChange={e => this.props.addTimezone(+e.target.value)}
          value="null"
        >
          <option disabled value="null">add timezone</option>
          {UTCDiffernceList.map(diff => {
            return (
              <option key={diff} value={diff}>{formatTimezone(diff)}</option>
            )
          })}
        </select>
      </div>
    )
  }
}

TimezonePicker.propTypes = {
  addTimezone: PropTypes.func
}

export default TimezonesTable
