import * as actions from '../../app/actions/event';

describe('event actions', () => {
  it('should expose the event actions', () => {
    expect(actions.SUCCESS).toEqual('EVENT_SUCCESS');
    expect(actions.FETCHING).toEqual('EVENT_FETCHING');
    expect(actions.FAILURE).toEqual('EVENT_FAILURE');
    expect(actions.EVENT).toEqual('EVENT_EVENT');
    expect(actions.DONE).toEqual('EVENT_DONE');
  });

  it('should create an action to load an event', () => {
    expect(actions.event(1)).toMatchSnapshot();
  });

  it('should create an action to notify of that an event is fetching', () => {
    expect(actions.fetching()).toMatchSnapshot();
  });

  it('should create an action to notify of a failure fetching an event', () => {
    expect(actions.failure()).toMatchSnapshot();
  });

  it('should create an action to notify of a success fetch of an event', () => {
    expect(actions.success('eventData', 'eventReg')).toMatchSnapshot();
  });

  it('should create an action to notify of a completed fetch of an event', () => {
    expect(actions.done()).toMatchSnapshot();
  });
});