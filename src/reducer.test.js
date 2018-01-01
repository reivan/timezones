import reducer from './reducer';

it('returns initial state', () => {
  const initialState = [];
  const stateAfter = reducer(undefined, {});
  expect(stateAfter).toEqual(initialState);
});

it('adds new timezone', () => {
  const stateBefore = [];

  const action = {
    type: 'ADD_TIMEZONE',
    id: 0,
    UTCDifference: 3
  };

  expect(reducer(stateBefore, action)).toEqual([
    {
      id: 0,
      UTCDifference: 3
    }
  ]);
});

it('removes timezones', () => {
  const stateBefore = [
    {
      id: 0,
      UTCDifference: 3
    },
    {
      id: 1,
      UTCDifference: -9
    }
  ];

  const action = {
    type: 'REMOVE_TIMEZONE',
    id: 0
  };

  expect(reducer(stateBefore, action)).toEqual([
    {
      id: 1,
      UTCDifference: -9
    }
  ]);
});