import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Question from '../components/Question';

class Game extends Component {
  render() {
    const { loading, isValid, history } = this.props;

    return (
      <div>
        <Header />
        { !isValid && <Redirect to="/" /> }
        <p>Game</p>
        <br />
        {loading ? (<p>Carregando...</p>)
          : <Question history={ history } />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.questionReducer.isLoading,
  isValid: state.questionReducer.isValid,
});

Game.propTypes = {
  loading: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps)(Game);
