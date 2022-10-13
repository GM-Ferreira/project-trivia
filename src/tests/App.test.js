import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

import App from '../App';

describe('Testando página de Login', () => {
    it('Imput de nome aparece na tela', () => {
        renderWithRouterAndRedux(<App />);

        const inputName = screen.getByRole('textbox', {  name: /nome/i});

        expect(inputName).toBeInTheDocument();
    });

    it('Imput de nome e email é digitavel', async () => {
        renderWithRouterAndRedux(<App />);

        const inputName = screen.getByRole('textbox', {  name: /nome/i});

        const inputEmail = screen.getByRole('textbox', {  name: /email/i});

        userEvent.type(inputName, 'nome teste');
        userEvent.type(inputEmail, 'email teste');
        
        expect(inputName.value).toBe('nome teste');
        expect(inputEmail.value).toBe('emailteste');
        
    });

    it('Imput de email aparece na tela', () => {
        renderWithRouterAndRedux(<App />);

        const inputEmail = screen.getByRole('textbox', {  name: /email/i});

        expect(inputEmail).toBeInTheDocument();
    });

    it('Button de play aparece na tela', () => {
        renderWithRouterAndRedux(<App />);

        const btnPaly = screen.getByRole('button', {  name: /play/i});

        expect(btnPaly).toBeInTheDocument();
    });

    it('Button de settings aparece na tela e funciona', () => {
        renderWithRouterAndRedux(<App />);

        const btnSettings = screen.getByRole('button', {  name: /settings/i});

        expect(btnSettings).toBeInTheDocument();

        userEvent.click(btnSettings);
        const settingText = screen.getByText(/settings/i);

        expect(settingText).toBeInTheDocument();
    })

    it('botão play libera quando digita email e nome', () => {
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
})