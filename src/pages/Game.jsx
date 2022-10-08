import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Game extends Component {
  render() {
    const minValu = -1;
    const { loading, questions } = this.props;
    return (
      <div>
        <p>Game</p>
        {loading ? (<p>Carregando...</p>)
          : (
            <div>
              <p
                data-testid="question-category"
              >
                {questions[0].category}
              </p>
              <p
                data-testid="question-text"
              >
                {questions[0].question}
              </p>
              <div data-testid="answer-options">
                {Object.keys(questions[0].answers).map((key) => (
                  <button
                    key={ key }
                    type="button"
                    data-testid={ key }
                  >
                    {questions[0].answers[key]}
                  </button>
                )).sort((a, b) => (a.props.children < b.props.children ? minValu : true))}
              </div>
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.questionReducer.isLoading,
  questions: state.questionReducer.questions,
});

Game.propTypes = {
  loading: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps)(Game);
