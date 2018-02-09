import * as actions from '../../app/actions/welcome';

describe('welcome actions', () => {
  it('should expose the welcome actions', () => {
    expect(actions.REFRESH).toEqual('WELCOME_REFRESH');
    expect(actions.SUCCESS).toEqual('WELCOME_SUCCESS');
    expect(actions.FAILURE).toEqual('WELCOME_FAILURE');
  });

  it('should create an action to refresh the view', () => {
    expect(actions.refresh()).toMatchSnapshot();
  });

  it('should create an action to announce a successful load', () => {
    expect(actions.success('eventList')).toMatchSnapshot();
  });

  it('should create an action to announce a failed load', () => {
    expect(actions.failure()).toMatchSnapshot();
  });
});