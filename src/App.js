import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Feedback from './pages/Feedback';
import Game from './pages/Game';
import Login from './pages/Login';
import Ranking from './pages/Ranking';
import Settings from './pages/Settings';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        <Route exact path="/game" render={ (props) => <Game { ...props } /> } />
        <Route
          exact
          path="/feedback"
          render={ (props) => <Feedback { ...props } /> }
        />
        <Route
          exact
          path="/ranking"
          render={ (props) => <Ranking { ...props } /> }
        />
        <Route
          exact
          path="/settings"
          render={ (props) => <Settings { ...props } /> }
        />
      </Switch>
    );
  }
}

export default connect(null)(App);
