import * as actions from '../../app/actions/deepLinking';

describe('deeplinking actions', () => {
  it('should expose the deeplinking actions', () => {
    expect(actions.DEEPLINK).toEqual('DEEPLINKING_DEEPLINK');
  });

  it('should create an action to notify of a new deeplink that should stay in the app', () => {
    expect(actions.deepLink('http://example.org')).toMatchSnapshot();
  });

  it('should create an action to notify of a new deeplink that should leave the app', () => {
    expect(actions.deepLink('http://example.org', false)).toMatchSnapshot();
  });
});
