import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { disableButtons, stopTimer } from '../redux/actions';

class Timer extends React.Component {
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

  render() {
    const { timer } = this.state;
    return (
      <p
        data-testid="timer"
        value={ timer }
        name="temporizador"
      >
        { timer }
      </p>
    );
  }
}

Timer.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Timer);
