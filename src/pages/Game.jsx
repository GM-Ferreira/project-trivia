import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Game extends Component {
  render() {
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
              {questions[0].answers.map((answer) => (
                <button
                  key={ answer }
                  type="button"
                  data-testid
                >
                  {answer}
                </button>
              ))}
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
