export default (state=[], action) => {
  switch (action.type) {
    case 'ADD_TIMEZONE':
      return [
        ...state,
        {
          id: action.id,
          UTCDifference: action.UTCDifference
        }
      ];
    case 'REMOVE_TIMEZONE':
      return state.filter(tz => tz.id !== action.id);
    default:
      return state;
  }
};
