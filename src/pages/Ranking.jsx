import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetResults } from '../redux/actions';

class Ranking extends Component {
  moveToHome = () => {
    const { history, dispatch } = this.props;
    dispatch(resetResults());
    history.push('/');
  };

  render() {
    const { ranking } = this.props;
    return (
      <div>
        <h1 data-testid="ranking-title">
          Rankings
        </h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.moveToHome }
        >
          Home
        </button>
        <br />
        <br />
        {
          ranking.sort((a, b) => b.pontos - a.pontos).map((e, i) => (
            <div key={ i }>
              <img src={ e.ft } alt="Minha foto" />
              <br />
              <span>
                User:
              </span>
              <span data-testid={ `player-name-${i}` }>
                {e.nome}
              </span>
              <br />
              <span>
                Score:
              </span>
              <span data-testid={ `player-score-${i}` }>
                {e.pontos}
              </span>
            </div>
          ))
        }
      </div>
    );
  }
}

Ranking.propTypes = {
  ranking: PropTypes.arrayOf,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}.isRequired;
const mapStateToProps = (state) => ({
  ranking: state.player.ranking,
});

export default connect(mapStateToProps)(Ranking);
