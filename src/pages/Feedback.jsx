import React, { Component } from 'react';
import { connect } from 'react-redux';
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
        <p data-testid="feedback-text">
          { assertions >= correctAnswers ? 'Well Done!' : 'Could be better...' }
        </p>
         <FeedBackResult />
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
