import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Timer from '../components/Timer';
import { updateScoreBoard } from '../redux/actions';

class Game extends Component {
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

  handleClick = () => {
    this.changeColor();
    const { dispatch } = this.props;
    const timer = document.querySelector('[name="temporizador"]');
    console.log(Object.entries(timer)[1][1].value);
    const clickedTime = Object.entries(timer)[1][1].value;
    dispatch(updateScoreBoard(Number(clickedTime)));
    // if (target.name === 'correct-answer') {
    //   dispatch(updateScoreBoard(10));
    // }
    //
  };

  handleQuestion = () => {
    const minValue = 0.5;
    const { questions, disable } = this.props;
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
          disabled={ disable }
          onClick={ (e) => this.handleClick(e) }
          name={ Object.entries(element)[0][0] }
        >
          {Object.entries(element)[0][1]}
        </button>
      )));
  };

  render() {
    const { loading, questions, isValid } = this.props;

    return (
      <div>
        <Timer />
        <Header />
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
  disable: state.questionReducer.disable,
});

Game.propTypes = {
  loading: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps)(Game);
