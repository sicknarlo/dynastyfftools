import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import actions from '../redux/actions';

import { Row, Col, Grid, Panel, Alert, PanelBody, PanelContainer, Table } from '@sketchpixy/rubix';

@connect(state => state)
export default class Players extends React.Component {
  static fetchData(store) {
    return store.dispatch(actions.getPlayers());
  }

  componentDidMount() {
    $(ReactDOM.findDOMNode(this.example))
      .addClass('nowrap')
      .dataTable({
        responsive: true,
        columnDefs: [
          { targets: [-1, -3] }
        ]
    });
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
                  <Table ref={(c) => this.example = c} className='display' cellSpacing='0' width='100%'>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Team</th>
                      </tr>
                    </thead>
                    <tfoot>
                      <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Team</th>
                      </tr>
                    </tfoot>
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
