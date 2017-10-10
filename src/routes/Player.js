import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import actions from '../redux/actions';

import {
  Row,
  Col,
  Grid,
  Form,
  Panel,
  Button,
  Checkbox,
  PanelBody,
  FormGroup,
  FormControl,
  ControlLabel,
  PanelContainer,
} from '@sketchpixy/rubix';

@withRouter
@connect((state) => state)
export default class Player extends React.Component {
  static fetchData(store, params) {
    return store.dispatch(actions.getPlayer({
      _id: params.id
    }));
  }

  render() {
    const player = this.props.players.result;
    return (
      <PanelContainer>
        <Panel>
          <PanelBody style={{padding: 0, paddingBottom: 25}}>
            <Grid>
              <Row>
                <Col xs={12}>
                  <h3>{player.name}</h3>
                </Col>
              </Row>
            </Grid>
          </PanelBody>
        </Panel>
      </PanelContainer>
    );
  }
}
