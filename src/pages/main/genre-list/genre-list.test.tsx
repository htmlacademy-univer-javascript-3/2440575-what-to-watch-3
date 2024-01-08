import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import { mockFilmArray } from '../../../utils/mock-data.ts';
import { withProviders } from '../../../utils/mock-component.tsx';
import userEvent from '@testing-library/user-event';
import { extractActionsTypes } from '../../../utils/mock-reducer.ts';
import { setSelectedGenre } from '../../../store/film.ts';
import GenreList from './index.tsx';

describe('Component: GenreList', () => {
  const mockFilteredFilms = mockFilmArray();
  const mockGenres = [...new Set(mockFilteredFilms.map(({genre}) => genre))];

  it('should render correctly and change genres', async () => {
    const { component, mockStore } = withProviders(<GenreList />, {
      film: {
        genres: mockGenres,
        selectedGenre: mockGenres[0],
      }
    });
    render(component);
    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(mockGenres.length);
    await userEvent.click(items[1]);
    const actions = extractActionsTypes(mockStore.getActions());
    expect(actions).toEqual([
      setSelectedGenre.type
    ]);
  });
});
