import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import FeedBackResult from '../components/FeedBackResult';

class Feedback extends Component {
  moveToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    return (
      <div data-testid="feedback-text">
        Feedbacks
        <Header />
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
        <FeedBackResult />
      </div>
    );
  }
}

export default connect()(Feedback);
