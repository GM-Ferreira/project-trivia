import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Feedback.css';

class Feedback extends Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { assertions } = this.props;
    const correctAnswers = 3;
    return (
      <div className="feedback" data-testid="feedback-text">
        <h1>Feedbacks</h1>
        <p data-testid="feedback-text">
          { assertions >= correctAnswers ? 'Well Done!' : 'Could be better...' }
        </p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleClick }
        >
          Play Again
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
