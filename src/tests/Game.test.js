import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

import App from '../App';
import Game from '../pages/Game';
import { questionRequest } from '../redux/actions';

describe('Testando página de Game', () => {
    it('tela de game é acessível a partir do login', () => {
      renderWithRouterAndRedux(<App />);

      const inputName = screen.getByRole('textbox', {  name: /nome/i});
      const inputEmail = screen.getByRole('textbox', {  name: /email/i});

      userEvent.type(inputName, 'nome teste');
      userEvent.type(inputEmail, 'email teste');

      const btnPaly = screen.getByRole('button', {  name: /play/i});

      userEvent.click(btnPaly);

      const gameText = screen.getByText(/game/i);

      expect(gameText).toBeInTheDocument();
  })

  it('Nome digitado e foto existe na tela game', () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByRole('textbox', {  name: /nome/i});
    const inputEmail = screen.getByRole('textbox', {  name: /email/i});
    userEvent.type(inputName, 'nome teste');
    userEvent.type(inputEmail, 'email teste');
    const btnPaly = screen.getByRole('button', {  name: /play/i});
    userEvent.click(btnPaly);
    const gameText = screen.getByText(/game/i);
    const loadingText = screen.getByText(/Carregando.../i)

    expect(loadingText).toBeInTheDocument();
    
    const nameGame = screen.getByRole('heading', {  name: /nome teste/i})

    const minhaFoto = screen.getByRole('img', {  name: /minha foto/i})

    expect(nameGame).toBeInTheDocument();
    expect(minhaFoto).toBeInTheDocument();
  })

  it('Texto game não aparece na tela se token invalido', async () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/game');

    // await waitFor(() => expect(questionRequest).toHaveBeenCalledTimes(1))
    // const gameText = screen.getByText(/game/i);  
  });

},)