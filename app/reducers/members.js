import * as memberActions from '../actions/members';

const initialState = {
  memberList: [],
  status: 'initial',
  loading: false,
  more: null,
  searchKey: '',
};

export default function loadEvent(state = initialState, action = {}) {
  switch (action.type) {
    case memberActions.FETCHING: {
      return {
        ...state,
        loading: true,
      };
    }
    case memberActions.MEMBERS_SUCCESS: {
      return {
        ...state,
        status: 'success',
        loading: false,
        memberList: action.payload.memberList,
        more: action.payload.next,
        searchKey: action.payload.searchKey,
      };
    }
    case memberActions.FAILURE: {
      return {
        ...state,
        status: 'failure',
        loading: false,
      };
    }
    case memberActions.MORE_SUCCESS: {
      return {
        ...state,
        status: 'success',
        loading: false,
        memberList: [
          ...state.memberList,
          ...action.payload.memberList,
        ],
        more: action.payload.next,
      };
    }
    default:
      return state;
  }
}
