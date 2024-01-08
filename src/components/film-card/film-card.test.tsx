import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withProviders } from '../../utils/mock-component.tsx';
import FilmCard from './index.tsx';
import { mockFilmDetails } from '../../utils/mock-data.ts';

describe('Component: FilmCard', () => {
  const mockedFilmDetails = mockFilmDetails();

  it('should display video on hover and image by default', async () => {
    const { component } = withProviders(<FilmCard {...mockedFilmDetails} />);
    render(component);
    const article = screen.getByRole('article');
    expect(article).toBeInTheDocument();
    await userEvent.hover(article);
    expect(await screen.findByTestId('video-player')).toBeInTheDocument();
    await userEvent.unhover(article);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
