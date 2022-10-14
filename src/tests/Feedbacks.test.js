import React from 'react';
import {
  screen,
  waitForElementToBeRemoved,
  render,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import Feedback from '../pages/Feedback';

describe('Testando a página de Feedbacks', () => {
  it('Aparece a imagem do email pelo gravatar na tela', () => {
    renderWithRouterAndRedux(<Feedback />);

    const imageGravatar = screen.getByRole('img', { name: /minha foto/i });
    expect(imageGravatar).toBeInTheDocument();
  });

  it('Aparece o nome do usuário na tela de', () => {
    renderWithRouterAndRedux(<Feedback />);

    const userName = screen.getByTestId('header-player-name');
    expect(userName).toBeInTheDocument();
  });

  it('Aparece o título de Feedback na tela', () => {
    renderWithRouterAndRedux(<Feedback />);

    const feedback = screen.getByRole('heading', { name: /feedbacks/i });

    expect(feedback).toBeInTheDocument();
  });

  it('Aparece o botão de Play again na tela', () => {
    renderWithRouterAndRedux(<Feedback />);

    const btnPlayAgain = screen.getByRole('button', { name: /play again/i });
    expect(btnPlayAgain).toBeInTheDocument();
  });

  it('Aparece o botão de Ranking na tela e leva para page "ranking"', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/feedback');

    const btnRanking = screen.getByRole('button', { name: /ranking/i });
    expect(btnRanking).toBeInTheDocument();

    userEvent.click(btnRanking);
    const { pathname } = history.location;
    expect(pathname).toBe('/ranking');
  });

  it('Aparece o botão de Play Again na tela e leva para page "login"', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/feedback');

    const btnPlayAgain = screen.getByRole('button', { name: /play again/i });
    expect(btnPlayAgain).toBeInTheDocument();

    userEvent.click(btnPlayAgain);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  // it('O botão de ranking leva para page "ranking"', async () => {
  //   const history = renderWithRouterAndRedux(<Feedback />);

  //   const btnRanking = screen.getByRole('button', {  name: /ranking/i});
  //   userEvent.click(btnRanking);

  //   waitForElementToBeRemoved (btnRanking).then(() => {
  //     expect(btnRanking).not.toBeInTheDocument();
  //   });
  // }, 10000);

  //   it('O botão de Play Again leva para page "/"', () => {
  //     renderWithRouterAndRedux(<Feedback />);
  //     const btnPlayAgain = screen.getByRole('button', {  name: /play again/i});

  //     userEvent.click(btnPlayAgain);

  //     const textLogin = screen.getByRole('heading', {  name: /login/i})
  //     expect(textLogin).toBeInTheDocument();

  //   });
});
