import * as actions from '../../app/actions/calendar';

describe('calendar actions', () => {
  it('should expose the calendar actions', () => {
    expect(actions.OPEN).toEqual('CALENDAR_OPEN');
    expect(actions.REFRESH).toEqual('CALENDAR_REFRESH');
    expect(actions.SUCCESS).toEqual('CALENDAR_SUCCESS');
    expect(actions.FAILURE).toEqual('CALENDAR_FAILURE');
    expect(actions.FETCHING).toEqual('CALENDAR_FETCHING');
  });

  it('should create an action to notify the calendar was opened', () => {
    expect(actions.open()).toMatchSnapshot();
  });

  it('should create an action to notify the calendar is being fetched', () => {
    expect(actions.fetching()).toMatchSnapshot();
  });

  it('should create an action to refresh the calendar', () => {
    expect(actions.refresh()).toMatchSnapshot();
  });

  it('should create an action to notify of a failure fetching the calendar', () => {
    expect(actions.failure()).toMatchSnapshot();
  });

  it('should create an action to notify of a success fetch for the calendar', () => {
    expect(actions.success([{ pk: 1 }])).toMatchSnapshot();
  });
});