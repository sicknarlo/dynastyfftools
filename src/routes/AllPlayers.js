import React from 'react';
import { connect } from 'react-redux';

import actions from '../redux/actions';

import {
  Row,
  Col,
  Grid,
  Panel,
  Alert,
  PanelBody,
  PanelContainer,
} from '@sketchpixy/rubix';

@connect((state) => state)
export default class AllPlayers extends React.Component {
  static fetchData(store) {
	return store.dispatch(actions.getPlayers());
  }

  render() {
	let { players, dispatch } = this.props;
	let { result, error } = players;

	let errors = error ?
	  (
		<Alert danger dismissible>
		  {error.map(({ message }, i) => {
			return <div key={i}>{message}</div>
		  })}
		</Alert>
	  ) : null;

	return (
	  <PanelContainer>
		<Panel>
		  <PanelBody style={{padding: 0, paddingBottom: 25}}>
			<Grid>
			  <Row>
				<Col xs={12}>
				  <h3>Player List:</h3>

				  {errors}

				  {typeof result.map === 'function' && result.map((player) => {
					       return <div>{player.name}</div>;
				  })}
				</Col>
			  </Row>
			</Grid>
		  </PanelBody>
		</Panel>
	  </PanelContainer>
	);
  }
}