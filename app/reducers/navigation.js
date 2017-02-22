import * as types from '../actions/actionTypes';

const initialState = {
  previousScenes: [],
  currentScene: 'login',
  loggedIn: false,
};


export default function navigate(state = initialState, action = {}) {
  const { currentScene, previousScenes, loggedIn } = state;
  switch (action.type) {
    case types.LOGIN:
      if (action.success) {
        return {
          previousScenes: [
            ...previousScenes,
            currentScene,
          ],
          currentScene: 'welcome',
          loggedIn,
        };
      }
      return state;
    case types.BACK: {
      const scene = previousScenes.pop();
      return {
        previousScenes,
        currentScene: scene,
        loggedIn,
      };
    }
    case types.NAVIGATE: {
      return {
        previousScenes: [
          ...previousScenes,
          currentScene,
        ],
        currentScene: action.scene,
        loggedIn,
      };
    }
    default:
      return state;
  }
}
