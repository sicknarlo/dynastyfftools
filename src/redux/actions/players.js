import {
  ALL_PLAYERS,
  EDIT_PLAYER,
  CREATE_PLAYER,
  SINGLE_PLAYER,
  REMOVE_PLAYER,
} from './actionTypes';

import axios from 'axios';

import GraphQLSettings from '../../../graphql.json';

let GraphQLEndpoint = GraphQLSettings.development.endpoint;

if (process.env.NODE_ENV === 'production') {
  GraphQLEndpoint = GraphQLSettings.production.endpoint;
}

function getPlayers() {
  let query = `
	query getPlayers {
	  players
	}
  `;

  return dispatch => {
	return axios.post(GraphQLEndpoint, {
	  query
	}).then((result) => {
	  if (result.data.errors) {
		dispatch({
		  type: ALL_PLAYERS,
		  error: result.data.errors,
		})
		return;
	  }

	  dispatch({
		type: ALL_PLAYERS,
		result: result.data.data.players,
	  });
	});
  };
}

function getPlayer(variables) {
  let query = `
	query getPlayer($_id: String, $name: String) {
	  player(_id: $_id, name: $name)
	}
  `;

  return dispatch => {
	return axios.post(GraphQLEndpoint, {
	  query,
	  variables,
	}).then((result) => {
	  if (result.data.errors) {
		dispatch({
		  type: SINGLE_PLAYER,
		  error: result.data.errors,
		});
		return;
	  }

	  dispatch({
		type: SINGLE_PLAYER,
		result: result.data.data.player,
	  });
	})
  };
}

function createPlayer(variables) {
  let query = `
	mutation createPlayerMutation($player: Object!) {
	  createTodo(player: $player) {
		_id
		player
	  }
	}
  `;

  return dispatch => {
	return axios.post(GraphQLEndpoint, {
	  query,
	  variables,
	}).then((result) => {
	  if (result.data.errors) {
		dispatch({
		  type: CREATE_PLAYER,
		  error: result.data.errors,
		})
		return;
	  }

	  dispatch({
		type: CREATE_PLAYER,
		result: result.data.data.createPlayer,
	  });
	});
  };
}

function updatePlayer(variables) {
  let query = `
	mutation updatePlayerMutation($_id: String!, $player: Object!) {
	  updatePlayer(_id: $_id, player: $player) {
		_id
		player
	  }
	}
  `;

  return dispatch => {
	return axios.post(GraphQLEndpoint, {
	  query,
	  variables,
	}).then((result) => {
	  if (result.data.errors) {
		dispatch({
		  type: EDIT_PLAYER,
		  error: result.data.errors,
		})
		return;
	  }

	  dispatch({
		type: EDIT_PLAYER,
		result: result.data.data.updateTodo,
	  });
	});
  };
}

function removePlayer(variables) {
  let query = `
	mutation removePlayerMutation($_id: String!) {
	  removePlayer(_id: $_id) {
		_id
	  }
	}
  `;

  return dispatch => {
	return axios.post(GraphQLEndpoint, {
	  query,
	  variables
	}).then((result) => {
	  if (result.data.errors) {
		dispatch({
		  type: REMOVE_PLAYER,
		  error: result.data.errors,
		})
		return;
	  }

	  dispatch({
		type: REMOVE_PLAYER,
		result: result.data.data.removeTodo,
	  });
	});
  };
}

module.exports = {
  getPlayer,
  getPlayers,
  createPlayer,
  updatePlayer,
  removePlayer,
};