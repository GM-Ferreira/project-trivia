import React from 'react';
import {
  cleanup,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import mockError from './helpers/Mock';

describe('Testando página de Game', () => {
  afterEach(() => jest.clearAllMocks());
  beforeEach(cleanup);

  it('tela de game é acessível a partir do login', () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByRole('textbox', { name: /nome/i });
    const inputEmail = screen.getByRole('textbox', { name: /email/i });

    userEvent.type(inputName, 'nome teste');
    userEvent.type(inputEmail, 'email teste');

    const btnPaly = screen.getByRole('button', { name: /play/i });

    userEvent.click(btnPaly);

    const gameText = screen.getByText(/game/i);

    expect(gameText).toBeInTheDocument();
  });

  it('Nome digitado e foto existe na tela game', () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByRole('textbox', { name: /nome/i });
    const inputEmail = screen.getByRole('textbox', { name: /email/i });
    userEvent.type(inputName, 'nome teste');
    userEvent.type(inputEmail, 'email teste');
    const btnPaly = screen.getByRole('button', { name: /play/i });
    userEvent.click(btnPaly);
    const gameText = screen.getByText(/game/i);
    const loadingText = screen.getByText(/Carregando.../i);

    expect(loadingText).toBeInTheDocument();

    const nameGame = screen.getByRole('heading', { name: /nome teste/i });

    const minhaFoto = screen.getByRole('img', { name: /minha foto/i });

    expect(nameGame).toBeInTheDocument();
    expect(minhaFoto).toBeInTheDocument();
  });

  it('Perguntas aparecem na tela após login', async () => {
    const initialState = {
      player: {
        name: 'teste inicial',
        foto: 'https://www.gravatar.com/avatar/0cc175b9c0f1b6a831c399e269772661',
      },
    };

    renderWithRouterAndRedux(<App />, initialState);

    const inputName = screen.getByRole('textbox', { name: /nome/i });
    const inputEmail = screen.getByRole('textbox', { name: /email/i });
    userEvent.type(inputName, 'nome teste');
    userEvent.type(inputEmail, 'email teste');
    const btnPaly = screen.getByRole('button', { name: /play/i });
    userEvent.click(btnPaly);

    await waitForElementToBeRemoved(
      () => screen.queryByText(/Carregando.../i),
      { timeout: 4000 }
    );
    const question = await screen.findByTestId('question-category');
    expect(question).toBeInTheDocument();

    // waitForElementToBeRemoved(() => screen.queryByText(/Carregando.../i)).then(
    //   async () => {
    //     const question = await screen.findByTestId('question-category');
    //     expect(question).toBeInTheDocument();
    //   }
    // );
  });

  it('Perguntas naõ aparecem na tela com token inválido', async () => {
    const initialState = {
      player: {
        name: 'teste inicial',
        foto: 'https://www.gravatar.com/avatar/0cc175b9c0f1b6a831c399e269772661',
      },
    };

    jest.spyOn(global, 'fetch');

    global.fetch = jest.fn(async () => ({
      json: async () => mockError,
    }));

    renderWithRouterAndRedux(<App />, initialState);

    const inputName = screen.getByRole('textbox', { name: /nome/i });
    const inputEmail = screen.getByRole('textbox', { name: /email/i });
    userEvent.type(inputName, 'nome teste');
    userEvent.type(inputEmail, 'email teste');
    const btnPaly = screen.getByRole('button', { name: /play/i });
    userEvent.click(btnPaly);

    const btnSettings = await screen.findByRole('button', {
      name: /settings/i,
    });

    expect(btnSettings).toBeInTheDocument();
  });
});
