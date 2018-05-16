import * as navigationActions from '../actions/navigation';
import * as loginActions from '../actions/login';

const initialState = {
  previousScenes: [],
  currentScene: 'welcome',
  loggedIn: false,
  drawerOpen: false,
};


export default function navigate(state = initialState, action = {}) {
  const { currentScene, previousScenes, drawerOpen } = state;
  switch (action.type) {
    case loginActions.SUCCESS: {
      return {
        ...state,
        loggedIn: true,
      };
    }
    case navigationActions.BACK: {
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
    case navigationActions.NAVIGATE: {
      if (action.payload.scene === currentScene) {
        return {
          ...state,
          drawerOpen: false,
        };
      } else if (action.payload.newSection) {
        return {
          ...state,
          previousScenes: [],
          currentScene: action.payload.scene,
          drawerOpen: false,
        };
      }
      return {
        ...state,
        previousScenes: [
          ...previousScenes,
          currentScene,
        ],
        currentScene: action.payload.scene,
        drawerOpen: false,
      };
    }
    case navigationActions.OPENDRAWER: {
      return {
        ...state,
        drawerOpen: action.payload.drawerOpen,
      };
    }
    case loginActions.TOKEN_INVALID:
    case loginActions.LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
}
