import { testSaga } from 'redux-saga-test-plan';

import indexSaga from '../../app/sagas/index';

jest.mock('react-native-snackbar', () => ({
  LENGTH_LONG: 100,
}));

describe('index saga', () => {
  it('should yield to all indexSaga as forks', () => {
    testSaga(indexSaga)
      .next()
      .inspect((fn) => {
        expect(fn).toHaveProperty('ALL');
      })
      .next()
      .isDone();
  });
});
