import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import { mockFilmArray } from '../../../utils/mock-data.ts';
import { withProviders } from '../../../utils/mock-component.tsx';
import userEvent from '@testing-library/user-event';
import { extractActionsTypes } from '../../../utils/mock-reducer.ts';
import { setSelectedGenre } from '../../../store/film.ts';
import GenreList from './index.tsx';

describe('Component: GenreList', () => {
  const mockedFilteredFilms = mockFilmArray();
  const mockedGenres = [...new Set(mockedFilteredFilms.map(({genre}) => genre))];

  it('should render correctly and change genres', async () => {
    const { component, mockStore } = withProviders(<GenreList />, {
      film: {
        genres: mockedGenres,
        selectedGenre: mockedGenres[0],
      }
    });
    render(component);
    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(mockedGenres.length);
    await userEvent.click(items[1]);
    const actions = extractActionsTypes(mockStore.getActions());
    expect(actions).toEqual([
      setSelectedGenre.type
    ]);
  });
});
