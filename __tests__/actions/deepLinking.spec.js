import * as actions from '../../app/actions/deepLinking';

describe('deeplinking actions', () => {
  it('should expose the deeplinking actions', () => {
    expect(actions.DEEPLINK).toEqual('DEEPLINKING_DEEPLINK');
  });

  it('should create an action to notify of a new deeplink', () => {
    expect(actions.deepLink('http://example.org')).toMatchSnapshot();
  });
});