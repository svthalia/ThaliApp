import { parseURL } from '../../app/sagas/deepLinking';
import { url as siteURL } from '../../app/utils/url';

jest.mock('../../app/navigation', () => ({
  navigate: jest.fn(),
}));

describe('deeplinking saga', () => {
  it('should parse a URL correctly', () => {
    const eventsUrl = parseURL(`${siteURL}/events/1`);
    expect(eventsUrl).toEqual({ params: {}, path: '/events/1' });
    const paramsUrl = parseURL(`${siteURL}/events?id=1`);
    expect(paramsUrl).toEqual({ params: { id: '1' }, path: '/events' });
    const emptyUrl = parseURL('http://example.org/');
    expect(emptyUrl).toEqual({ params: {}, path: '' });
  });
});
