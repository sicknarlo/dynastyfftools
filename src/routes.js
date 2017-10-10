import React from 'react';
import classNames from 'classnames';
import { IndexRoute, Route } from 'react-router';

import { Grid, Row, Col, MainContainer } from '@sketchpixy/rubix';

/* Common Components */

import Sidebar from './common/sidebar';
import Header from './common/header';
import Footer from './common/footer';

/* Pages */
import Players from './routes/Players';
import Player from './routes/Player';

class App extends React.Component {
  render() {
    return (
      <MainContainer {...this.props}>
        <Sidebar />
        <Header />
        <div id="body">
          <Grid>
            <Row>
              <Col xs={12}>{this.props.children}</Col>
            </Row>
          </Grid>
        </div>
        <Footer />
      </MainContainer>
    );
  }
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Players} />
    <Route path="/players/:id" component={Player} />
  </Route>
);
