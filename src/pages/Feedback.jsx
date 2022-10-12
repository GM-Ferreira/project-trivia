import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import FeedBackResult from '../components/FeedBackResult';

import './Feedback.css';

class Feedback extends Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div className="feedback" data-testid="feedback-text">
        <Header />
        <h1>Feedbacks</h1>
        <div>
          <FeedBackResult />
        </div>
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

export default connect()(Feedback);

Feedback.propTypes = {
  history: PropTypes.func,
}.isRequired;
