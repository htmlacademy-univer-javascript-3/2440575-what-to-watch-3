import FilmList from '../../components/FilmList/FilmList.tsx';
import Header from '../../components/Header/Header.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import { HeaderStyleType } from '../../config/config.ts';
import { useAppSelector } from '../../hooks';

const MyList = (): JSX.Element => {
  const films = useAppSelector((state) => state.films);
  return (
    <div className="user-page">
      <Header headerStyleType={HeaderStyleType.User}>
        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">9</span></h1>
      </Header>
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <FilmList filmsPreviewData={films}/>
      </section>
      <Footer/>
    </div>
  );
};

export default MyList;
