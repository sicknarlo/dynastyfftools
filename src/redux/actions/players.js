import {
  ALL_PLAYERS,
  EDIT_PLAYER,
  CREATE_PLAYER,
  SINGLE_PLAYER,
  REMOVE_PLAYER
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
    players {
      _id
      old_id
      mfl_id
      name
      position
      team
      draft_year
      twitter_username
      stats_id
      weight
      college
      draft_round
      height
      rotoworld_id
      nfl_id
      espn_id
      birthdate
      status
      armchair_id
      stats_global_id
      kffl_id
      draft_team
      draft_pick
      jersey
      cbs_id
      sportsdata_id
      fp_id
      createdAt
      updatedAt
    }
	}
  `;

  return dispatch => {
    return axios
      .post(GraphQLEndpoint, {
        query
      })
      .then(result => {
        if (result.data.errors) {
          dispatch({
            type: ALL_PLAYERS,
            error: result.data.errors
          });
          return;
        }

        dispatch({
          type: ALL_PLAYERS,
          result: result.data.data.players
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
    return axios
      .post(GraphQLEndpoint, {
        query,
        variables
      })
      .then(result => {
        if (result.data.errors) {
          dispatch({
            type: SINGLE_PLAYER,
            error: result.data.errors
          });
          return;
        }

        dispatch({
          type: SINGLE_PLAYER,
          result: result.data.data.player
        });
      });
  };
}

function createPlayer(variables) {
  let query = `
	mutation createPlayerMutation($player: Object!) {
	  createPlayer(player: $player) {
		_id
		player
	  }
	}
  `;

  return dispatch => {
    return axios
      .post(GraphQLEndpoint, {
        query,
        variables
      })
      .then(result => {
        if (result.data.errors) {
          dispatch({
            type: CREATE_PLAYER,
            error: result.data.errors
          });
          return;
        }

        dispatch({
          type: CREATE_PLAYER,
          result: result.data.data.createPlayer
        });
      });
  };
}

function updatePlayer(variables) {
  let query = `
	mutation updatePlayerMutation(
    $_id: String!,
    $old_id: String,
    $mfl_id: String,
    $name: String,
    $position: String,
    $team: String,
    $draft_year: String,
    $twitter_username: String,
    $stats_id: String,
    $weight: String,
    $college: String,
    $draft_round: String,
    $height: String,
    $rotoworld_id: String,
    $nfl_id: String,
    $espn_id: String,
    $birthdate: Integer,
    $status: String,
    $armchair_id: String,
    $stats_global_id: String,
    $kffl_id: String,
    $draft_team: String,
    $draft_pick: String,
    $jersey: String,
    $cbs_id: String,
    $sportsdata_id: String,
    $fp_id: String,
  ) {
	  updatePlayer(
      _id: $_id
      old_id: $old_id
      mfl_id: $mfl_id
      name: $name
      position: $position
      team: $team
      draft_year: $draft_year
      twitter_username: $twitter_username
      stats_id: $stats_id
      weight: $weight
      college: $college
      draft_round: $draft_round
      height: $height
      rotoworld_id: $rotoworld_id
      nfl_id: $nfl_id
      espn_id: $espn_id
      birthdate: $birthdate
      status: $status
      armchair_id: $armchair_id
      stats_global_id: $stats_global_id
      kffl_id: $kffl_id
      draft_team: $draft_team
      draft_pick: $draft_pick
      jersey: $jersey
      cbs_id: $cbs_id
      sportsdata_id: $sportsdata_id
      fp_id: $fp_id
    ) {
		_id
		player
	  }
	}
  `;

  return dispatch => {
    return axios
      .post(GraphQLEndpoint, {
        query,
        variables
      })
      .then(result => {
        if (result.data.errors) {
          dispatch({
            type: EDIT_PLAYER,
            error: result.data.errors
          });
          return;
        }

        dispatch({
          type: EDIT_PLAYER,
          result: result.data.data.updatePlayer
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
    return axios
      .post(GraphQLEndpoint, {
        query,
        variables
      })
      .then(result => {
        if (result.data.errors) {
          dispatch({
            type: REMOVE_PLAYER,
            error: result.data.errors
          });
          return;
        }

        dispatch({
          type: REMOVE_PLAYER,
          result: result.data.data.removePlayer
        });
      });
  };
}

module.exports = {
  getPlayer,
  getPlayers,
  createPlayer,
  updatePlayer,
  removePlayer
};
