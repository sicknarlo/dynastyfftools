import React from 'react';
import { withRouter } from 'react-router';

import {
  Col,
  Row,
  Grid,
  Icon,
  Button,
  Checkbox,
  ButtonGroup,
} from '@sketchpixy/rubix';

@withRouter
export default class Player extends React.Component {
  // toggleCompletion() {
  // et { _id } = this.props.todo;
  // et { dispatch, actions } = this.props;
  //
  // ispatch(actions.updateTodo({
  //  _id,
  //  completed: this.input.checked
  // ));
  // }

  removePlayer() {
	let { _id } = this.props.player;
	let { dispatch, actions } = this.props;

	dispatch(actions.removePlayer({ _id }));
  }

  editPlayer() {
	this.props.router.push(`/player/edit/${this.props.player._id}`);
  }

  render() {
	let player = this.props.player;

	return (
	  <Grid>
		<Row className='todo-item'>
		  <Col sm={8}>
			  {player.name}
		  </Col>
		  <Col sm={4} className='text-right'>
			  <Button bsStyle='red' className='remove-sm' onClick={::this.removePlayer} style={{marginRight: 12.5}}>Remove</Button>
			  <Button bsStyle='green' className='remove-sm' onlyOnHover onClick={::this.editPlayer}>Edit</Button>
		  </Col>
		</Row>
	  </Grid>
	);
  }
}