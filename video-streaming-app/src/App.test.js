import { render, screen } from '@testing-library/react';
import App from './App';

test('renders video streaming app title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Video Streaming App/i);
  expect(titleElement).toBeInTheDocument();
});
