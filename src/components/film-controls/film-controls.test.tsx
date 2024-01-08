import { render, screen } from '@testing-library/react';
import * as faker from 'faker';
import FilmControls from './index.tsx';
import { withProviders } from '../../utils/mock-component.tsx';

describe('Component: FilmControls', () => {
  const mockedFilmId = faker.datatype.uuid();

  it('should render correctly', () => {
    const { component } = withProviders(
      <FilmControls>
        <FilmControls.PlayLink id={mockedFilmId} />
      </FilmControls>
    );
    render(component);
    expect(screen.getByRole('link', { name: /play/i })).toBeInTheDocument();
  });
});
