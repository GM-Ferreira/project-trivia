import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    const correctAnswers = 3;
    return (
      <div data-testid="feedback-text">
        Feedbacks
        <p data-testid="feedback-text">
          { assertions >= correctAnswers ? 'Well Done!' : 'Could be better...' }
        </p>
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
