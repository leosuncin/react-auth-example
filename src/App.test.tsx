import { render, screen } from '@testing-library/react';

import App from './App';

test('renders "React App" in App', () => {
  render(<App />);

  const element = screen.getByText(/React App/i);
  expect(element).toBeInTheDocument();
});
