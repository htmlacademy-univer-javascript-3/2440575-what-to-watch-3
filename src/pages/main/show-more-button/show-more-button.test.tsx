import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import { mockFilmArray } from '../../../utils/mock-data.ts';
import { withProviders } from '../../../utils/mock-component.tsx';
import ShowMoreButton from './index.tsx';
import userEvent from '@testing-library/user-event';
import { extractActionsTypes } from '../../../utils/mock-reducer.ts';
import { showMoreFilms } from '../../../store/film.ts';

describe('Component: ShowMoreButton', () => {
  const mockedFilteredFilms = mockFilmArray();

  it('should show more films on button click', async () => {
    const { component, mockStore } = withProviders(<ShowMoreButton />, {
      film: {
        filteredFilms: mockedFilteredFilms,
        filmListLength: mockedFilteredFilms.length - 1,
      }
    });
    render(component);
    await userEvent.click(screen.getByRole('button', {name: /show more/i}));
    const actions = extractActionsTypes(mockStore.getActions());
    expect(actions).toEqual([
      showMoreFilms.type
    ]);
  });

  it('should hide the button when all films are displayed', () => {
    const { component } = withProviders(<ShowMoreButton />, {
      film: {
        filteredFilms: mockedFilteredFilms,
        filmListLength: mockedFilteredFilms.length,
      }
    });
    render(component);
    expect(screen.queryByRole('button', {name: /show more/i})).not.toBeInTheDocument();
  });
});
