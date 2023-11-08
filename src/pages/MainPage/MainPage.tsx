import FilmList from '../../components/FilmList/FilmList.tsx';
import FilmPreview from '../../components/FilmPreview/FilmPreview.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import { Link, useParams } from 'react-router-dom';
import { AppRoute } from '../../config/config.ts';
import { useState } from 'react';
import { FilmData, FilmsData } from '../../types/filmData.ts';
import { GenresData } from '../../types/genresData.ts';

type MainProps = {
  filmsData: FilmsData;
  genresData: GenresData;
}

function MainPage ({filmsData, genresData}: MainProps): JSX.Element {
  const [firstFilm] = filmsData;
  const params = useParams();
  const [filmPreview, setFilmPreview] = useState(firstFilm);

  const handleFilmCardClick = (film: FilmData) => {
    setFilmPreview(film);
  };
  return (
    <>
      <FilmPreview film={filmPreview}/>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <ul className="catalog__genres-list">
            {
              genresData.map((item): JSX.Element =>
                (
                  <li key={item.id} className={`catalog__genres-item${params.genre === item.slug ? ' catalog__genres-item--active' : ''}`}>
                    <Link to={AppRoute.Main + (item.slug !== 'all' ? item.slug : '')} className="catalog__genres-link">{item.name}</Link>
                  </li>
                )
              )
            }
          </ul>

          <FilmList filmsData={filmsData} genre={params.genre} clickHandler={handleFilmCardClick}/>

          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
        </section>

        <Footer/>
      </div>
    </>
  );
}

export default MainPage;
