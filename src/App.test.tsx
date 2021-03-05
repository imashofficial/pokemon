import React from 'react';
import { render, screen } from '@testing-library/react';
import PokemonApp from './PokemonApp';

test('first page should be loaded automatically', () => {
  render(<PokemonApp />);
  const linkElement = screen.getByTestId('loading');
  expect(linkElement).toBeInTheDocument();
});
