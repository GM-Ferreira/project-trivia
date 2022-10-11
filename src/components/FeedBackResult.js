import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FeedBackResult extends Component {
  render() {
    const { score, assertions } = this.props;
    const correctAnswers = 3;
    return (
      <>
        <p data-testid="feedback-text">
          { assertions >= correctAnswers ? 'Well Done!' : 'Could be better...' }
        </p>
        <p data-testid="feedback-total-score">
          {score}
        </p>
        <p data-testid="feedback-total-question">
          { assertions }
        </p>
      </>

    );
  }
}

FeedBackResult.propTypes = {
  assertions: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(FeedBackResult);
