import React, { Component } from 'react';
import Header from '../components/Header';
import FeedBackResult from '../components/FeedBackResult';

class Feedback extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="feedback-text">
          Feedbacks
        </div>
        <FeedBackResult />
      </>
    );
  }
}

export default Feedback;
