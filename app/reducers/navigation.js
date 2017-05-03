import * as types from '../actions/actionTypes';

const initialState = {
  previousScenes: [],
  currentScene: 'welcome',
  loggedIn: false,
  drawerOpen: false,
};


export default function navigate(state = initialState, action = {}) {
  const { currentScene, previousScenes, loggedIn, drawerOpen } = state;
  switch (action.type) {
    case types.LOGINSUCCESS: {
      return {
        ...initialState,
        loggedIn: true,
      };
    }
    case types.BACK: {
      if (drawerOpen) {
        return {
          ...state,
          drawerOpen: false,
        };
      }
      const scene = previousScenes.pop();
      return {
        previousScenes,
        currentScene: scene,
        loggedIn,
        drawerOpen,
      };
    }
    case types.NAVIGATE: {
      if (action.scene === currentScene) {
        return state;
      }
      return {
        previousScenes: [
          ...previousScenes,
          currentScene,
        ],
        currentScene: action.scene,
        loggedIn,
        drawerOpen: false,
      };
    }
    case types.OPENDRAWER: {
      return {
        ...state,
        drawerOpen: action.drawerOpen,
      };
    }
    case types.LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
}
