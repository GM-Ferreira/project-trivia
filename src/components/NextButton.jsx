import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { nextQuestion, stopTimer, disableButtons } from '../redux/actions';

class NextButton extends React.Component {
  state = {
    timer: 30,
  };

  componentDidMount() {
    this.cronometro();
  }

  cronometro = () => {
    const { dispatch } = this.props;

    this.setState({ timer: 30 }, () => {
      const second = 1000;
      const idInterval = setInterval(() => {
        this.setState((prevState) => ({
          timer: prevState.timer - 1,
        }), () => {
          const { timer } = this.state;
          if (timer === 0) {
            dispatch(disableButtons(timer));
            clearInterval(idInterval);
          }
        });
      }, second);
      dispatch(stopTimer(idInterval));
    });
  };

  handleClick = () => {
    const { dispatch, history, idQuestion } = this.props;
    const maxQuestions = 4;
    this.cronometro();
    if (idQuestion < maxQuestions) {
      dispatch(nextQuestion());
    } else {
      history.push('/feedback');
    }
  };

  render() {
    const { timer } = this.state;
    const { disable } = this.props;
    return (
      <div>
        {disable
        && (
          <button
            data-testid="btn-next"
            type="button"
            onClick={ this.handleClick }
          >
            Next
          </button>
        )}
        <p
          value={ timer }
          name="temporizador"
        >
          { timer }
        </p>
      </div>
    );
  }
}

NextButton.propTypes = {
  dispatch: PropTypes.func,
  disable: PropTypes.bool,
}.isRequired;

const mapStateToProps = (state) => ({
  disable: state.questionReducer.disable,
  idQuestion: state.questionReducer.idQuestion,
});

export default connect(mapStateToProps)(NextButton);
