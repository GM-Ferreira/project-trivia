import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../trivia.png';
import '../App.css';
import { getEmail, tokenRequest } from '../redux/actions';

class Login extends Component {
  state = {
    nome: '',
    email: '',
    disabled: true,
  };

  handleClick = () => {
    const { email, nome } = this.state;
    const { dispatch, history } = this.props;
    dispatch(getEmail(email, nome));
    dispatch(tokenRequest());
    history.push('/game');
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => {
      const { nome, email } = this.state;
      if (nome.length !== 0 && email.length !== 0) {
        this.setState({
          disabled: false,
        });
      } else {
        this.setState({
          disabled: true,
        });
      }
    });
  };

  clickMoveToSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { nome, email, disabled } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>SUA VEZ</p>
        </header>
        <div>
          <h2>
            Login
          </h2>
        </div>
        <form>
          <label htmlFor="nome">
            Nome
            <input
              type="text"
              id="nome"
              data-testid="input-player-name"
              onChange={ this.handleChange }
              name="nome"
              value={ nome }
              placeholder="seu nome aqui"
            />
          </label>

          <label htmlFor="email">
            Email
            <input
              type="email"
              id="email"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
              name="email"
              value={ email }
              placeholder="seuemail@email.com"
            />
          </label>

          <button
            type="button"
            data-testid="btn-play"
            disabled={ disabled }
            onClick={ this.handleClick }
          >
            Play
          </button>

          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.clickMoveToSettings }
          >
            Settings
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Login);
