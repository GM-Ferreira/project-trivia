import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FeedBackResult extends Component {
  render() {
    const { score } = this.props;
    return (
      <>
        <p data-testid="feedback-total-score">
          {score}
        </p>
      </>

    );
  }
}

FeedBackResult.propTypes = {
  foto: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  score: state.player.score,
});

export default connect(mapStateToProps)(FeedBackResult);
