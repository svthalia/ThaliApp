import * as actions from '../../app/actions/navigation';

describe('navigation actions', () => {
  it('should expose the navigation actions', () => {
    expect(actions.BACK).toEqual('NAVIGATE_BACK');
    expect(actions.TOGGLE_DRAWER).toEqual('NAVIGATE_TOGGLE_DRAWER');
  });

  it('should create an action to notify the app should navigate back', () => {
    expect(actions.goBack()).toMatchSnapshot();
  });

  it('should create an action to notify the app drawer should be toggled', () => {
    expect(actions.toggleDrawer()).toMatchSnapshot();
  });
});
