import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { foto, nome } = this.props;
    console.log(foto);
    return (
      <>
        <img
          src={ `${foto}` }
          alt="Minha foto"
          data-testid="header-profile-picture"
        />
        <h2 data-testid="header-player-name">
          { nome }
        </h2>
        <p data-testid="header-score">
          0
        </p>
      </>
    );
  }
}

Header.propTypes = {
  foto: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  foto: state.reducerLogin.foto,
  nome: state.reducerLogin.nome,
});

export default connect(mapStateToProps)(Header);
