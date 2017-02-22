import * as types from '../actions/actionTypes';

const initialState = {
  previousScenes: [],
  currentScene: 'login',
};


export default function navigate(state = initialState, action = {}) {
  const { currentScene, previousScenes } = state;
  switch (action.type) {
    case types.LOGIN:
      if (action.success) {
        return {
          previousScenes: [
            ...previousScenes,
            currentScene,
          ],
          currentScene: 'welcome',
        };
      }
      return { ...state };
    case types.BACK: {
      const scene = previousScenes.pop();
      return {
        previousScenes,
        currentScene: scene,
      };
    }
    case types.NAVIGATE: {
      return {
        previousScenes: [],
        currentScene: action.scene,
      };
    }
    default:
      return { ...state };
  }
}
