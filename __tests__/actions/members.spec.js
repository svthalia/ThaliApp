import * as actions from '../../app/actions/members';

describe('member actions', () => {
  it('should expose the member actions', () => {
    expect(actions.MEMBERS).toEqual('MEMBERS_MEMBERS');
    expect(actions.FETCHING).toEqual('MEMBERS_FETCHING');
    expect(actions.MEMBERS_SUCCESS).toEqual('MEMBERS_MEMBERS_SUCCESS');
    expect(actions.FAILURE).toEqual('MEMBERS_FAILURE');
    expect(actions.MORE).toEqual('MEMBERS_MORE');
    expect(actions.MORE_SUCCESS).toEqual('MEMBERS_MORE_SUCCESS');
  });

  it('should create an action to notify the member list should be fetched unfiltered', () => {
    expect(actions.members()).toMatchSnapshot();
  });

  it('should create an action to notify the member list should be fetched, filtered by certain keywords', () => {
    expect(actions.members('John Doe')).toMatchSnapshot();
  });

  it('should create an action to notify the member list is being fetched', () => {
    expect(actions.fetching()).toMatchSnapshot();
  });

  it('should create an action to notify the member list was fetched successfully', () => {
    expect(actions.success(['John Doe', 'Jane Doe'], 'nextUrl', 'John Doe')).toMatchSnapshot();
  });

  it('should create an action to notify of a failure fetching the member list', () => {
    expect(actions.failure()).toMatchSnapshot();
  });

  it('should create an action to notify additional members should be retrieved', () => {
    expect(actions.more('nextUrl')).toMatchSnapshot();
  });

  it('should create an action to notify the additional members were fetched successfully', () => {
    expect(actions.moreSuccess(['John Doe', 'Jane Doe'], 'nextUrl')).toMatchSnapshot();
  });
});