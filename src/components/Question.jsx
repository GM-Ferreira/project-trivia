import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getTimeOnClick, uptadeScoreBoard } from '../redux/actions';
import NextButton from './NextButton';

class Question extends Component {
  changeColor = () => {
    const wrong = '3px solid red';
    if (document.querySelector('[name="wrong-answer1"]')) {
      const btn2 = document.querySelector('[name="wrong-answer1"]');
      const btn3 = document.querySelector('[name="wrong-answer2"]');
      btn2.style.border = wrong;
      btn3.style.border = wrong;
    }
    const btn1 = document.querySelector('[name="wrong-answer0"]');
    const btn4 = document.querySelector('[name="correct-answer"]');
    btn1.style.border = wrong;
    btn4.style.border = '3px solid rgb(6, 240, 15)';
  };

  handleClick = ({ target }) => {
    this.changeColor();
    const { dispatch, idTimer } = this.props;
    const timer = document.querySelector('[name="temporizador"]');
    const clickedTime = Object.entries(timer)[1][1].value;
    dispatch(getTimeOnClick(Number(clickedTime)));
    clearInterval(idTimer);
    const { name } = target;
    dispatch(uptadeScoreBoard(name));
  };

  handleQuestion = () => {
    const minValue = 0.5;
    const { questions, disable, idQuestion } = this.props;
    const qstObj = questions[idQuestion].incorrect_answers.map((e, i) => (
      {
        [`wrong-answer${i}`]: e,
      }
    ));
    const qstObjCorrect = { 'correct-answer': questions[idQuestion].correct_answer };
    const finalObjt = [...qstObj, qstObjCorrect];
    const shuffledQuestions = finalObjt.sort(() => Math.random() - minValue);
    return (
      shuffledQuestions.map((element) => (
        <button
          type="button"
          key={ Object.entries(element)[0][1] }
          data-testid={ Object.entries(element)[0][0] }
          disabled={ disable }
          onClick={ (e) => this.handleClick(e) }
          name={ Object.entries(element)[0][0] }
        >
          {Object.entries(element)[0][1]}
        </button>
      )));
  };

  render() {
    const { questions, idQuestion, history } = this.props;
    return (
      <div>
        <p
          data-testid="question-category"
        >
          {questions[idQuestion].category}
        </p>
        <p
          data-testid="question-text"
        >
          {questions[idQuestion].question}
        </p>
        <div data-testid="answer-options">
          {this.handleQuestion()}
        </div>
        <NextButton history={ history } />
      </div>
    );
  }
}

Question.propTypes = {
  foto: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  questions: state.questionReducer.questions,
  disable: state.questionReducer.disable,
  idTimer: state.questionReducer.idTimer,
  idQuestion: state.questionReducer.idQuestion,
});

export default connect(mapStateToProps)(Question);
