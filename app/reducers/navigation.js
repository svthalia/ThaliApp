import * as types from '../actions/actionTypes';

const initialState = {
  previousScenes: [],
  currentScene: 'welcome',
  loggedIn: false,
  drawerOpen: false,
};


export default function navigate(state = initialState, action = {}) {
  const { currentScene, previousScenes, drawerOpen } = state;
  switch (action.type) {
    case types.LOGINSUCCESS: {
      return {
        ...state,
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
        ...state,
        previousScenes,
        currentScene: scene,
      };
    }
    case types.NAVIGATE: {
      if (action.scene === currentScene) {
        return {
          ...state,
          drawerOpen: false,
        };
      } else if (action.newSection) {
        return {
          ...state,
          previousScenes: [],
          currentScene: action.scene,
          drawerOpen: false,
        };
      }
      return {
        ...state,
        previousScenes: [
          ...previousScenes,
          currentScene,
        ],
        currentScene: action.scene,
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
