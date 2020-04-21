import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';


test('renders Chrakra UI in App', () => {
  render(<App />);
  const element = screen.getByText(/Chakra UI/i);
  expect(element).toBeInTheDocument();
});
