import { render, screen, waitFor } from '@testing-library/react';
import { expect } from 'vitest';
import { mockFilmDetails } from '../../utils/mock-data.ts';
import { withProviders } from '../../utils/mock-component.tsx';
import { extractActionsTypes } from '../../utils/mock-reducer.ts';
import { loadFilmDetails } from '../../store/api-actions.ts';
import AddReview from './index.tsx';
import { StatusCodes } from 'http-status-codes';

describe('Component: AddReview', () => {
  const mockedSelectedFilm = mockFilmDetails();

  it('should render correctly and load data', async () => {
    const { component, mockStore, mockAxiosAdapter } = withProviders(<AddReview />, {
      film: {
        selectedFilm: mockedSelectedFilm
      }
    });
    mockAxiosAdapter.onGet(/\/films/).reply(StatusCodes.OK, mockedSelectedFilm);
    render(component);
    expect(screen.getByAltText(mockedSelectedFilm.name)).toBeInTheDocument();
    expect(screen.getByAltText(mockedSelectedFilm.name)).toBeInTheDocument();
    await waitFor(() => expect(extractActionsTypes(mockStore.getActions())).toEqual([
      loadFilmDetails.pending.type,
      loadFilmDetails.fulfilled.type,
    ]));
  });
});
