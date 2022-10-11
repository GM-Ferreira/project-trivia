import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { foto, nome, score } = this.props;
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
          {score}
        </p>
      </>
    );
  }
}

Header.propTypes = {
  foto: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  foto: state.player.foto,
  nome: state.player.nome,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
