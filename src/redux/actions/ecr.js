import {
  ALL_ECR,
  CREATE_ECR,
} from './actionTypes';

import axios from 'axios';

import GraphQLSettings from '../../../graphql.json';

let GraphQLEndpoint = GraphQLSettings.development.endpoint;

if (process.env.NODE_ENV === 'production') {
  GraphQLEndpoint = GraphQLSettings.production.endpoint;
}

function getECR(args) {
  let query = `
	query getECR($playerId: String) {
	  ecr(playerId: $playerId)
	}
  `;

  return dispatch => {
    return axios
      .post(GraphQLEndpoint, {
        query,
        args
      })
      .then(result => {
        if (result.data.errors) {
          dispatch({
            type: ALL_ECR,
            error: result.data.errors
          });
          return;
        }

        dispatch({
          type: ALL_ECR,
          result: result.data.data.ecr
        });
      });
  };
}

function createECR(variables) {
  let query = `
	mutation createECRMutation($ecr: Object!) {
	  createECR(ecr: $ecr) {
		  ecr
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
            type: CREATE_ECR,
            error: result.data.errors
          });
          return;
        }

        dispatch({
          type: CREATE_ECR,
          result: result.data.data.createECR
        });
      });
  };
}

module.exports = {
  getECR,
  createECR,
};
