import * as navigationActions from '../actions/navigation';
import * as sessionActions from '../actions/session';
import { LOGIN_SCENE, SPLASH_SCENE } from '../ui/components/navigator/scenes';

const initialState = {
  previousScenes: [],
  currentScene: SPLASH_SCENE,
  loggedIn: false,
  drawerOpen: false,
};


export default function navigate(state = initialState, action = {}) {
  const { currentScene, previousScenes, drawerOpen } = state;
  switch (action.type) {
    case sessionActions.SUCCESS: {
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
      } if (action.payload.newSection) {
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
    case sessionActions.TOKEN_INVALID:
    case sessionActions.LOGOUT: {
      return {
        ...initialState,
        currentScene: LOGIN_SCENE,
      };
    }
    default:
      return state;
  }
}
