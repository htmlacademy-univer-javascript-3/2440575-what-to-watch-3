import { useState } from 'react';
import { FilmPreviewData } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import FilmList from '../../components/FilmList/FilmList.tsx';
import FilmPreview from '../../components/FilmPreview/FilmPreview.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import GenreList from '../../components/GenreList/GenreList.tsx';
import { changeGenre, getFilmsByGenre } from '../../store/action.ts';
import { ShowMoreBtn } from '../../components/ui';

const START_CARDS_COUNT = 8;

function MainPage (): JSX.Element {
  const [cardsCount, setCardsCount] = useState(START_CARDS_COUNT);
  const dispatch = useAppDispatch();
  const genreName = useAppSelector((state) => state.genre);
  const films = useAppSelector((state) => state.films);
  const sortedFilms = useAppSelector((state) => state.sortedFilms);
  const [firstFilm] = films;
  const [filmPreview, setFilmPreview] = useState(firstFilm);
  const handleFilmCardClick = (film: FilmPreviewData) => {
    setFilmPreview(film);
  };
  const handleBtnClick = () => {
    if (cardsCount < films.length) {
      setCardsCount((prevState) => prevState + START_CARDS_COUNT);
    }
  };
  const handleGenreClick = (genre: string) => {
    dispatch(changeGenre({genre}));
    dispatch(getFilmsByGenre({genre}));
    setCardsCount(START_CARDS_COUNT);
  };
  return (
    <>
      <FilmPreview filmPreview={filmPreview}/>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList filmsPreviewData={films} activeGenre={genreName} clickHandler={handleGenreClick}/>

          <FilmList filmsPreviewData={sortedFilms} maxCards={cardsCount} clickHandler={handleFilmCardClick}/>

          {
            cardsCount < sortedFilms.length && (
              <ShowMoreBtn clickHandler={handleBtnClick}/>
            )
          }
        </section>

        <Footer/>
      </div>
    </>
  );
}

export default MainPage;
