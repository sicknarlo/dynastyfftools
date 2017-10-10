import render, {
  setupReducers,
  replaceReducers,
} from '@sketchpixy/rubix/lib/node/redux-router';
import reducers from './redux/reducers';
import routes from './routes';

require('es6-promise').polyfill();

setupReducers(reducers);
render(routes);

if (module.hot) {
  module.hot.accept('./routes', () => {
    // reload routes again
    require('./routes').default;
    render(routes);
  });

  module.hot.accept('./redux/reducers', () => {
    // reload reducers again
    const newReducers = require('./redux/reducers');
    replaceReducers(newReducers);
  });
}
