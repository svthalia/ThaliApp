import * as actions from '../../app/actions/navigation';

describe('navigation actions', () => {
  it('should expose the navigation actions', () => {
    expect(actions.NAVIGATE).toEqual('NAVIGATE_NAVIGATE');
    expect(actions.BACK).toEqual('NAVIGATE_BACK');
    expect(actions.OPENDRAWER).toEqual('NAVIGATE_OPENDRAWER');
  });

  it('should create an action to navigate to a screen', () => {
    expect(actions.navigate('scene')).toMatchSnapshot();
    expect(actions.navigate('scene', true)).toMatchSnapshot();
  });

  it('should create an action to navigate back', () => {
    expect(actions.back()).toMatchSnapshot();
  });

  it('should create an action to update the drawer state', () => {
    expect(actions.updateDrawer('state')).toMatchSnapshot();
  });
});