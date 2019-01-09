import * as actions from '../../app/actions/event';

describe('event actions', () => {
  it('should expose the event actions', () => {
    expect(actions.SUCCESS).toEqual('EVENT_SUCCESS');
    expect(actions.FETCHING).toEqual('EVENT_FETCHING');
    expect(actions.FAILURE).toEqual('EVENT_FAILURE');
    expect(actions.EVENT).toEqual('EVENT_EVENT');
    expect(actions.DONE).toEqual('EVENT_DONE');
    expect(actions.OPEN).toEqual('EVENT_OPEN');
    expect(actions.ADMIN).toEqual('EVENT_ADMIN');
    expect(actions.UPDATE_REGISTRATION).toEqual('EVENT_UPDATE_REGISTRATION');
  });

  it('should create an action to load an event', () => {
    const action = actions.event(1);
    expect(action).toMatchSnapshot();
    expect(action.payload.navigateToEventScreen).toEqual(true);
  });

  it('should create an action to load an event without opening the event screen', () => {
    const action = actions.event(1, false);
    expect(action).toMatchSnapshot();
    expect(action.payload.navigateToEventScreen).toEqual(false);
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

  it('should create an action to open the event screen', () => {
    expect(actions.open()).toMatchSnapshot();
  });

  it('should create an action to open the admin screen of the event', () => {
    expect(actions.admin()).toMatchSnapshot();
  });

  it('should create an action to update a registration', () => {
    expect(actions.updateRegistration(1, true, 'no_payment')).toMatchSnapshot();
  });
});
