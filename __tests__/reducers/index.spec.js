import { createStore } from 'redux';

import rootReducer from '../../app/reducers/index';
import session from '../../app/reducers/session';
import event from '../../app/reducers/event';
import calendar from '../../app/reducers/calendar';
import welcome from '../../app/reducers/welcome';
import profile from '../../app/reducers/profile';
import pizza from '../../app/reducers/pizza';
import registration from '../../app/reducers/registration';
import members from '../../app/reducers/members';
import settings from '../../app/reducers/settings';

const reducers = {
  session,
  event,
  calendar,
  welcome,
  profile,
  pizza,
  registration,
  members,
  settings,
};

const store = createStore(rootReducer);

describe('reducers combiner', () => {
  it('should combine all reducers in the store', () => {
    expect.assertions(reducers.length);
    Object.keys(reducers).forEach((key) => {
      expect(store.getState()[key]).toEqual(reducers[key]());
    });
  });
});
