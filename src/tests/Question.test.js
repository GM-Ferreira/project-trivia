import React from 'react';
import {
  cleanup,
  screen,
  waitForElementToBeRemoved,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testando perguntas da page Question', () => {
  afterEach(() => jest.clearAllMocks());
  beforeEach(cleanup);

  it('É possível clilcar na resposta correta', async () => {
    renderWithRouterAndRedux(<App />);

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
    const correctAnswer = await screen.findByTestId('correct-answer');

    userEvent.click(correctAnswer);
  });

  it('É possível clilcar na resposta incorreta', async () => {
    renderWithRouterAndRedux(<App />);

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
    const wrongAnswer = await screen.findByTestId('wrong-answer0');

    userEvent.click(wrongAnswer);
  });

  it('É possível clilcar em "Next" 5 vezes apos escolher a resposta', async () => {
    renderWithRouterAndRedux(<App />);

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
    const correctAnswer = await screen.findByTestId('correct-answer');

    userEvent.click(correctAnswer);

    const nextButton = await screen.findByRole('button', { name: /next/i });
    expect(nextButton).toBeInTheDocument();
    userEvent.click(nextButton);

    const correctAnswer2 = await screen.findByTestId('correct-answer');
    userEvent.click(correctAnswer2);
    const nextButton2 = await screen.findByRole('button', { name: /next/i });
    userEvent.click(nextButton2);

    const correctAnswer3 = await screen.findByTestId('correct-answer');
    userEvent.click(correctAnswer3);
    const nextButton3 = await screen.findByRole('button', { name: /next/i });
    userEvent.click(nextButton3);

    const correctAnswer4 = await screen.findByTestId('correct-answer');
    userEvent.click(correctAnswer4);
    const nextButton4 = await screen.findByRole('button', { name: /next/i });
    userEvent.click(nextButton4);

    const correctAnswer5 = await screen.findByTestId('correct-answer');
    userEvent.click(correctAnswer5);
    const nextButton5 = await screen.findByRole('button', { name: /next/i });
    userEvent.click(nextButton5);

    const feedbackText = await screen.findByRole('heading', {
      name: /feedbacks/i,
    });
    expect(feedbackText).toBeInTheDocument();
  });

  it('Após 30 segundos, o tempo acaba', async () => {
    renderWithRouterAndRedux(<App />);

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

    await waitFor(
      async () => await screen.findByRole('button', { name: /next/i }),
      {
        timeout: 35000,
      }
    );

    expect(screen.queryByRole('button', { name: /next/i })).toBeInTheDocument();
  }, 45000);
});
