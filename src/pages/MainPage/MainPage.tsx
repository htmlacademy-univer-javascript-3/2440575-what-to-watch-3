import { useState } from 'react';
import FilmList from '../../components/FilmList/FilmList';
import FilmPreview from '../../components/FilmPreview/FilmPreview';
import Footer from '../../components/Footer/Footer';
import { changeGenre, getFilmsByGenre } from '../../store/action';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { FilmData } from '../../types';
import GenreList from '../../components/GenreList/GenreList';
import { filmsData } from '../../mocks/films';
import { ShowMoreBtn } from '../../components/ui';

const START_CARDS_COUNT = 8;

function MainPage (): JSX.Element {

  const [cardsCount, setCardsCount] = useState(START_CARDS_COUNT);
  const dispatch = useAppDispatch();
  const genreName = useAppSelector((state) => state.genre);
  const films = useAppSelector((state) => state.films);

  const [firstFilm] = films;
  const [filmPreview, setFilmPreview] = useState(firstFilm);

  const handleBtnClick = () => {
    if (cardsCount < films.length) {
      setCardsCount((prevState) => prevState + START_CARDS_COUNT);
    }
  };

  const handleFilmCardClick = (film: FilmData) => {
    setFilmPreview(film);
  };

  const handleGenreClick = (genre: string) => {
    dispatch(changeGenre({genre}));
    dispatch(getFilmsByGenre({genre}));
    setCardsCount(START_CARDS_COUNT);
  };

  return (
    <>
      <FilmPreview film={filmPreview}/>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList filmsData={filmsData} activeGenre={genreName} clickHandler={handleGenreClick}/>

          <FilmList maxCards={cardsCount} filmsData={films} clickHandler={handleFilmCardClick}/>

          {
            cardsCount < films.length && (
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
