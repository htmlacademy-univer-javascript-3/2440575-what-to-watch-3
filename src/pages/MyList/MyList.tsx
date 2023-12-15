import FilmList from '../../components/FilmList/FilmList.tsx';
import Header from '../../components/Header/Header.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import { HeaderStyleType } from '../../config/config.ts';
import { FilmsData } from '../../types';

type MyListProps = {
  filmsData: FilmsData;
}
const MyList = ({filmsData}: MyListProps): JSX.Element => (
  <div className="user-page">
    <Header isLoggedIn headerStyleType={HeaderStyleType.User}>
      <h1 className="page-title user-page__title">My list <span className="user-page__film-count">9</span></h1>
    </Header>
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <FilmList filmsData={filmsData}/>
    </section>
    <Footer/>
  </div>
);

export default MyList;
