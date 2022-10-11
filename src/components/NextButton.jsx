import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { nextQuestion } from '../redux/actions';

import Timer from './Timer';

class NextButton extends React.Component {
  handleClick = () => {
    const { dispatch, history, idQuestion } = this.props;
    const maxQuestions = 4;
    if (idQuestion < maxQuestions) {
      dispatch(nextQuestion());
    } else {
      history.push('/feedback');
    }
  };

  render() {
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
        <Timer />
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
