import React from "react";
import { withRouter } from "react-router";

import {
  Col,
  Row,
  Grid,
  Icon,
  Button,
  Checkbox,
  ButtonGroup
} from "@sketchpixy/rubix";

@withRouter
export default class Player extends React.Component {

  render() {
    // let player = this.props.player;

    return (
      <Grid>
        <Row>
          <Col sm={8}>Foo</Col>
          <Col sm={4} className="text-right">
            Bar
          </Col>
        </Row>
      </Grid>
    );
  }
}
