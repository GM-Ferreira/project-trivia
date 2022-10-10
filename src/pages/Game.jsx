import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

class Game extends Component {
  handleQuestion = () => {
    const minValue = 0.5;
    const { questions } = this.props;
    const qstObj = questions[0].incorrect_answers.map((e, i) => (
      {
        [`wrong-answer${i}`]: e,
      }
    ));
    const qstObjCorrect = { 'correct-answer': questions[0].correct_answer };
    const finalObjt = [...qstObj, qstObjCorrect];
    const shuffledNumbers = finalObjt.sort(() => Math.random() - minValue);
    console.log(shuffledNumbers);
    return (
      shuffledNumbers.map((element) => (
        <button
          type="button"
          key={ Object.entries(element)[0][1] }
          data-testid={ Object.entries(element)[0][0] }
        >
          {Object.entries(element)[0][1]}
        </button>
      )));
  };

  render() {
    const { loading, questions, isValid } = this.props;
    return (
      <div>
        { !isValid && <Redirect to="/" /> }
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
                {this.handleQuestion()}
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
  isValid: state.questionReducer.isValid,
});

Game.propTypes = {
  loading: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps)(Game);
