import * as actions from '../../app/actions/profile';

describe('profile actions', () => {
  it('should expose the profile actions', () => {
    expect(actions.PROFILE).toEqual('PROFILE_PROFILE');
    expect(actions.FETCHING).toEqual('PROFILE_FETCHING');
    expect(actions.SUCCESS).toEqual('PROFILE_SUCCESS');
    expect(actions.FAILURE).toEqual('PROFILE_FAILURE');
  });

  it('should create an action to load a profile', () => {
    expect(actions.profile(1)).toMatchSnapshot();
  });

  it('should create an action to load the user\'s own profile as default', () => {
    expect(actions.profile()).toMatchSnapshot();
  });

  it('should create an action for profile fetch', () => {
    expect(actions.fetching()).toMatchSnapshot();
  });

  it('should create an action for a successful profile load', () => {
    expect(actions.success('profile')).toMatchSnapshot();
  });

  it('should create an action for a failed profile load', () => {
    expect(actions.failure()).toMatchSnapshot();
  });
});