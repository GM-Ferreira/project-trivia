import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Feedback.css';
import Header from '../components/Header';
import { resetResults } from '../redux/actions';
import FeedBackResult from '../components/FeedBackResult';

class Feedback extends Component {
  moveToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  handleClick = () => {
    const { history, dispatch } = this.props;
    dispatch(resetResults());
    history.push('/');
  };

  render() {
    return (
      <div className="feedback" data-testid="feedback-text">
        <Header />
        <h1>Feedbacks</h1>
        <FeedBackResult />
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleClick }
        >
          Play Again
        </button>
        <div>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ this.moveToRanking }
          >
            Ranking
          </button>
        </div>
      </div>
    );
  }
}

export default connect()(Feedback);

Feedback.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}.isRequired;
