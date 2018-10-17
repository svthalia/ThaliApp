import reducer, {
  STATUS_SIGNED_IN,
  STATUS_SIGNED_OUT,
  STATUS_SIGNING_IN,
} from '../../app/reducers/session';
import * as actions from '../../app/actions/session';

describe('session reducer', () => {
  const initialState = reducer();
  const emptyState = {};

  it('should expose the status constants', () => {
    expect(STATUS_SIGNED_IN).toEqual('SIGNED_IN');
    expect(STATUS_SIGNED_OUT).toEqual('SIGNED_OUT');
    expect(STATUS_SIGNING_IN).toEqual('SIGNING_IN');
  });

  describe('initially', () => {
    it('should return the initial state', () => {
      expect(initialState).toMatchSnapshot();
    });
  });

  describe('is logging in', () => {
    const state = reducer(
      emptyState,
      actions.signIn('user', 'pass'),
    );

    it('should indicate it is signing in', () => {
      expect(state).toHaveProperty('status', STATUS_SIGNING_IN);
    });
  });

  describe('is logged in', () => {
    const state = reducer(
      emptyState,
      actions.signedIn('user', 'token'),
    );

    it('should indicate it is logged in', () => {
      expect(state).toHaveProperty('status', STATUS_SIGNED_IN);
    });

    it('should contain the username', () => {
      expect(state).toHaveProperty('username', 'user');
    });

    it('should contain the user\'s token', () => {
      expect(state).toHaveProperty('token', 'token');
    });
  });

  describe('has retrieved user info', () => {
    const state = reducer(
      emptyState,
      actions.setUserInfo('John Doe', 'imageUrl'),
    );

    it('should contain the display name', () => {
      expect(state).toHaveProperty('displayName', 'John Doe');
    });

    it('should contain the url for the profile picture', () => {
      expect(state).toHaveProperty('photo', 'imageUrl');
    });
  });

  it('should log out with an invalid token', () => {
    const state = reducer(
      emptyState,
      actions.tokenInvalid(),
    );

    expect(state).toEqual(initialState);
  });

  it('should log out when the user presses the logout button', () => {
    const state = reducer(
      emptyState,
      actions.signOut(),
    );

    expect(state).toEqual(initialState);
  });
});
