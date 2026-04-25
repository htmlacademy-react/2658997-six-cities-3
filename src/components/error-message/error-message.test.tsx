import { screen } from '@testing-library/react';
import ErrorMessage from './error-message.tsx';
import { renderWithProviders } from '../../utils/index.ts';

describe('ErrorMessage', () => {
  it('renders passed message', () => {
    renderWithProviders(<ErrorMessage message="Server error" />);

    expect(screen.getByRole('alert')).toHaveTextContent('Server error');
  });
});
