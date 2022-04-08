import { render, screen } from '@testing-library/react';
import App from './App';

test('renders latest 10 blocks', () => {
  render(<App />);
  const linkElement = screen.getByText(/Latest 10 Blocks/i);
  expect(linkElement).toBeInTheDocument();
});
