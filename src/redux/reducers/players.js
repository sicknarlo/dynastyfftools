import {
  ALL_PLAYERS,
  EDIT_PLAYER,
  REMOVE_PLAYER,
  SINGLE_PLAYER,
  CREATE_PLAYER,
} from '../actions/actionTypes';

function getIndexOfPlayerItem(action, state) {
  let index = -1, data = action.result;

  for (let i = 0; i < state.result.length; i++) {
	if (state.result[i]._id === data._id) {
	  index = i;
	  break;
	}
  }

  return index;
}

function players(state = [], action) {
  if (action.error) {
	return {
	  result: state.result,
	  error: action.error,
	};
  }

  switch(action.type) {
	case SINGLE_PLAYER:
	case ALL_PLAYERS:
	  return {
		result: action.result
	  };
	case CREATE_PLAYER:
	  return {
		result: [
		  ...state.result,
		  action.result,
		]
	  };
	case EDIT_PLAYER:
	  var index = getIndexOfPlayerItem(action, state);

	  // player not found in state object so return original state
	  if (index === -1) return state;

	  // player found! return new state
	  return {
		result: [
		  ...state.result.slice(0, index),
		  Object.assign({}, state.result[index], action.result),
		  ...state.result.slice(index + 1)
		]
	  };
	case REMOVE_PLAYER:
	  var index = getIndexOfTodoItem(action, state);

	  // player not found in state object so return original state
	  if (index === -1) return state;

	  // player found! don't include it in the new state
	  return {
		result: [
		  ...state.result.slice(0, index),
		  ...state.result.slice(index + 1)
		],
	  };
	default:
	  return state;
  }
}

module.exports = {
  players,
};