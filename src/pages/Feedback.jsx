import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends Component {
  moveToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { assertions } = this.props;
    const correctAnswers = 3;
    return (
      <div data-testid="feedback-text">
        Feedbacks
        <p data-testid="feedback-text">
          { assertions >= correctAnswers ? 'Well Done!' : 'Could be better...' }
        </p>

        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.moveToRanking }
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  assertions: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
