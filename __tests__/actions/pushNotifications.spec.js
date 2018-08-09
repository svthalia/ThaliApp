import * as actions from '../../app/actions/pushNotifications';

describe('push notifications actions', () => {
  it('should expose the push notifications actions', () => {
    expect(actions.REGISTER).toEqual('PUSH_NOTIFICATIONS_REGISTER');
    expect(actions.INVALIDATE).toEqual('PUSH_NOTIFICATIONS_INVALIDATE');
  });

  it('should create an action to register the push token', () => {
    expect(actions.register()).toMatchSnapshot();
  });

  it('should create an action to register the push tokens and update push categories', () => {
    expect(actions.register(['category1', 'category2'])).toMatchSnapshot();
  });

  it('should create an action to invalidate the push token', () => {
    expect(actions.invalidate()).toMatchSnapshot();
  });
});