import * as actions from '../../app/actions/registration';

describe('registration actions', () => {
  it('should expose the registration actions', () => {
    expect(actions.REGISTER).toEqual('REGISTRATION_REGISTER');
    expect(actions.UPDATE).toEqual('REGISTRATION_UPDATE');
    expect(actions.CANCEL).toEqual('REGISTRATION_CANCEL');
    expect(actions.FIELDS).toEqual('REGISTRATION_FIELDS');
    expect(actions.LOADING).toEqual('REGISTRATION_FETCHING');
    expect(actions.FAILURE).toEqual('REGISTRATION_FAILURE');
    expect(actions.SUCCESS).toEqual('REGISTRATION_SUCCESS');
    expect(actions.SHOW_FIELDS).toEqual('REGISTRATION_SHOW_FIELDS');
  });

  it('should create an action to start the event registration', () => {
    expect(actions.register('event')).toMatchSnapshot();
  });

  it('should create an action to update the event registration', () => {
    expect(actions.update('registration', 'fields')).toMatchSnapshot();
  });

  it('should create an action to cancel the event registration', () => {
    expect(actions.cancel('registration')).toMatchSnapshot();
  });

  it('should create an action to retrieve the event fields', () => {
    expect(actions.retrieveFields('registration')).toMatchSnapshot();
  });

  it('should create an action to show loading', () => {
    expect(actions.loading()).toMatchSnapshot();
  });

  it('should create an action to show success', () => {
    expect(actions.success()).toMatchSnapshot();
  });

  it('should create an action to show a failure', () => {
    expect(actions.failure()).toMatchSnapshot();
  });

  it('should create an action to show the event fields', () => {
    expect(actions.showFields('registration', 'fields')).toMatchSnapshot();
  });
});