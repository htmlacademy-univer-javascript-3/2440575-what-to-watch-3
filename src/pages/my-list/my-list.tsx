import Footer from '../../components/footer';
import Header from '../../components/header';
import FilmList from '../../components/film-list';
import { useFavouriteFilms } from '../../hooks/useFavouriteFilms.ts';
import RequestSuspense from '../../components/request-suspense';

export default function MyList() {
  const { favouriteFilms } = useFavouriteFilms();

  return (
    <RequestSuspense>
      <div className="user-page">
        <Header className="user-page__head">
          <Header.Logo />
          <h1 className="page-title user-page__title">
            My list
            <span className="user-page__film-count">
              {favouriteFilms?.length}
            </span>
          </h1>
          <Header.UserBlock />
        </Header>

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <FilmList data={favouriteFilms} />
        </section>
        <Footer />
      </div>
    </RequestSuspense>
  );
}
