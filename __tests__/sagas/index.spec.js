import { testSaga } from 'redux-saga-test-plan';

import indexSaga from '../../app/sagas/index';

jest.mock('react-native-snackbar', () => ({
  LENGTH_LONG: 100,
}));

jest.mock('react-native-vector-icons/MaterialIcons', () => ({
  propTypes: jest.fn(() => 'Icon'),
  defaultProps: jest.fn(),
}));

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => ({
  CommunityIcon: 'CommunityIcon',
}));

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

describe('index saga', () => {
  it('should yield to all indexSaga as forks', () => {
    testSaga(indexSaga)
      .next()
      .inspect((fn) => {
        expect(fn).toHaveProperty('type', 'ALL');
      })
      .next()
      .isDone();
  });
});
