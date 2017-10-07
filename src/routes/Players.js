import React from 'react';
import { connect } from 'react-redux';

import actions from '../redux/actions';

import { Row, Col, Grid, Panel, Alert, PanelBody, PanelContainer, Table } from '@sketchpixy/rubix';

@connect(state => state)
export default class Players extends React.Component {
  static fetchData(store) {
    return store.dispatch(actions.getPlayers());
  }

  componentDidMount() {
    $('.tablesaw').table();
  }

  render() {
    let { players, dispatch } = this.props;
    let { result, error } = players;

    let errors = error ? (
      <Alert danger dismissible>
        {error.map(({ message }, i) => {
          return <div key={i}>{message}</div>;
        })}
      </Alert>
    ) : null;

    return (
      <PanelContainer>
        <Panel>
          <PanelBody style={{ padding: 0, paddingBottom: 25 }}>
            <Grid>
              <Row>
                <Col xs={12}>
                  <h3>Player List:</h3>
                  {errors}
                  <Table striped bordered className='tablesaw' data-tablesaw-mode="swipe" data-tablesaw-sortable data-tablesaw-sortable-switch>
                    <thead>
                      <tr>
                        <th data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority='persist'>Name</th>
                        <th data-tablesaw-sortable-col data-tablesaw-priority='1'>Position</th>
                        <th data-tablesaw-sortable-col data-tablesaw-priority='2'>Team</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        result.map((player, i) => {
                          return (
                            <tr key={i}>
                              <td>{player.name}</td>
                              <td>{player.position}</td>
                              <td>{player.team}</td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Grid>
          </PanelBody>
        </Panel>
      </PanelContainer>
    );
  }
}
