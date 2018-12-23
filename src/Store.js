import { createStore, applyMiddleware } from "redux";
import { logger } from 'redux-logger';

const KEY_UP = "KEY_UP";
const KEY_PRESS = "KEY_PRESS";
const ADD_KEY = "ADD_KEY";

export const actionKeyUp = () => ({ type: KEY_UP });

export const actionKeyPress = key => ({ type: KEY_PRESS, keyPress: key.toUpperCase()});

export const actionAddKey = (key, audio) => ({ type: ADD_KEY, newKey: key.toUpperCase(), newAudio: audio.toUpperCase() });

const reducer = (state = { keys: [], audios: [], keyPress: "", audioPlaying: "" }, action) => {
  switch (action.type) {
    case KEY_UP:
      return Object.assign({}, state, {
        keyPress: "",
      });
    case KEY_PRESS:
      return state.keys.includes(action.keyPress) ?
        Object.assign({}, state, {
          keyPress: action.keyPress,
          audioPlaying: state.audios[state.keys.indexOf(action.keyPress)]
        }): 
        state;
    case ADD_KEY:
      return state.keys.includes(action.newKey) ?
        state :
        Object.assign({}, state, {
          keys: [...state.keys, action.newKey],
          audios: [...state.audios, action.newAudio]
        });
    default:
      return state;
  }
}

export const configureStore = () => createStore(reducer, applyMiddleware(logger));