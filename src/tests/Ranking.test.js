import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Verificar a renderização da pagina de Ranking', () => {
  it('Botão Home deverar redirecionar para a tela inicial', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/ranking');

    const buttonHome = screen.getByTestId('btn-go-home');
    expect(buttonHome).toBeInTheDocument();

    userEvent.click(buttonHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Devera ter renderizado na tela o título "Ranking', () => {
    renderWithRouterAndRedux(<App />, {}, '/ranking');

    const ranking = screen.getByTestId('ranking-title');
    expect(ranking).toBeInTheDocument();
  });

  it('Devera ter renderizado na tela botão "Home"', () => {
    renderWithRouterAndRedux(<App />, {}, '/ranking');

    const buttonHome = screen.getByTestId('btn-go-home');
    expect(buttonHome).toBeInTheDocument();
  });

  it('Verficar se existe o "Score" e "User" dos jogadores na tela de Ranking', () => {
    const players = {
      player: {
        ranking: [
          {
            nome: 'robert',
            ft: 'https://www.gravatar.com/avatar/132be2fde1c8ffcf198f54926c2768fb',
            pontos: 110,
          },
          {
            nome: 'lucas',
            ft: 'https://www.gravatar.com/avatar/132be2fde1c8ffcf198f54926c2768fb',
            pontos: 111,
          },
        ],
      },
    };

    renderWithRouterAndRedux(<App />, players, '/ranking');
    const scorePlayerOne = screen.getByTestId('player-score-0');
    expect(scorePlayerOne).toBeInTheDocument();

    const namePlayerOne = screen.getByTestId('player-name-0');
    expect(namePlayerOne).toBeInTheDocument();

    const scorePlayerTwo = screen.getByTestId('player-score-1');
    expect(scorePlayerTwo).toBeInTheDocument();

    const namePlayerTwo = screen.getByTestId('player-name-1');
    expect(namePlayerTwo).toBeInTheDocument();
  });
});
