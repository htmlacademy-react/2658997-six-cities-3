import { screen } from '@testing-library/react';
import FavoritesEmptyState from './favorites-empty-state.tsx';
import { renderWithProviders } from '../../../utils/index.ts';

describe('FavoritesEmptyState', () => {
  it('renders favorites empty text', () => {
    renderWithProviders(<FavoritesEmptyState />);

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
    expect(screen.getByText(/Save properties to narrow down search/i)).toBeInTheDocument();
  });
});
