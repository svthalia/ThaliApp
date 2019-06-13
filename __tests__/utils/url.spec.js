import DeviceInfo from 'react-native-device-info';
import {
  apiRequest,
  apiUrl,
  defaultProfileImage,
  termsAndConditionsUrl,
  ServerError,
  TokenInvalidError,
} from '../../app/utils/url';


const fetchPromiseResult = {
  status: 200,
  json: () => Promise.resolve({ exampleJson: 'val' }),
};

describe('url helper', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockReturnValue(
      Promise.resolve(fetchPromiseResult),
    );
  });

  it('should expose the constants', () => {
    const { url } = require('../../app/utils/url');
    expect(url).toEqual('http://localhost:8000');
    expect(apiUrl).toEqual('http://localhost:8000/api/v1');
    expect(defaultProfileImage).toEqual('http://localhost:8000/static/members/images/default-avatar.jpg');
    expect(termsAndConditionsUrl).toEqual('http://localhost:8000/event-registration-terms/');
  });

  it('should do a fetch request', () => {
    expect.assertions(2);
    return apiRequest('route', {}, null)
      .then((response) => {
        expect(global.fetch).toBeCalledWith(`${apiUrl}/route/`,
          { headers: { 'Accept-Language': 'en' } });
        expect(response).toEqual({ exampleJson: 'val' });
      });
  });

  it('should do a fetch request with params', () => {
    expect.assertions(1);
    return apiRequest('route', {}, {
      params: 'value',
    }).then(() => {
      expect(global.fetch).toBeCalledWith(`${apiUrl}/route/?params=value`,
        { headers: { 'Accept-Language': 'en' } });
    });
  });

  it('should do a fetch request with headers', () => {
    expect.assertions(1);
    return apiRequest('route', { headers: { Authorization: 'Token abc' } }, null).then(() => {
      expect(global.fetch).toBeCalledWith(`${apiUrl}/route/`,
        { headers: { 'Accept-Language': 'en', Authorization: 'Token abc' } });
    });
  });

  it('should generate the url parameters', () => {
    expect.assertions(2);
    return apiRequest('route', {}, null)
      .then((response) => {
        expect(global.fetch).toBeCalledWith(`${apiUrl}/route/`,
          { headers: { 'Accept-Language': 'en' } });
        expect(response).toEqual({ exampleJson: 'val' });
      });
  });

  it('should throw a server error', () => {
    expect.assertions(1);
    const response = {
      status: 404,
      json: () => Promise.resolve('responseJson'),
    };
    global.fetch.mockReturnValue(Promise.resolve(response));
    return apiRequest('route', {}, null)
      .catch(e => expect(e).toEqual(new ServerError('Invalid status code: 404', response)));
  });

  it('should return an empty response on status 204', () => {
    expect.assertions(1);
    const response = {
      status: 204,
      json: () => Promise.resolve('responseJson'),
    };
    global.fetch.mockReturnValue(Promise.resolve(response));
    return apiRequest('route', {}, null)
      .then(res => expect(res).toEqual({}));
  });

  it('should detect an invalid token in English', () => {
    expect.assertions(1);
    const response = {
      status: 403,
      headers: { get: key => (key === 'content-language' ? 'en' : 'nl') },
      json: () => Promise.resolve({ detail: 'Invalid token.' }),
    };
    global.fetch.mockReturnValue(Promise.resolve(response));
    return apiRequest('route', {}, null)
      .catch(e => expect(e).toEqual(new TokenInvalidError('responseCopy')));
  });

  it('should detect an invalid token in Dutch', () => {
    expect.assertions(1);
    const response = {
      status: 403,
      headers: { get: key => (key === 'content-language' ? 'nl' : 'en') },
      json: () => Promise.resolve({ detail: 'Ongeldige token.' }),
    };
    global.fetch.mockReturnValue(Promise.resolve(response));
    return apiRequest('route', {}, null)
      .catch(e => expect(e).toEqual(new TokenInvalidError('responseCopy')));
  });

  it('should not falsely claim the token is incorrect', () => {
    expect.assertions(1);
    const response = {
      status: 403,
      headers: { get: key => (key === 'content-language' ? 'en' : 'nl') },
      json: () => Promise.resolve({ detail: 'Not authorized.' }),
    };
    global.fetch.mockReturnValue(Promise.resolve(response));
    return apiRequest('route', {}, null)
      .catch(res => expect(res).toEqual(new ServerError('Invalid status code: 403')));
  });

  it('should default to an English locales', () => {
    DeviceInfo.getDeviceLocale = () => 'fr';
    return apiRequest('route', {}, null)
      .then(() => {
        expect(global.fetch).toBeCalledWith(`${apiUrl}/route/`,
          { headers: { 'Accept-Language': 'en' } });
      });
  });

  it('should use the correct url when in production mode', () => {
    jest.resetModules();
    global.__DEV__ = false;
    const { url } = require('../../app/utils/url');
    expect(url).toEqual('https://thalia.nu');
  });
});
