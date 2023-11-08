import { MainPage } from '../../pages/MainPage/MainPage.tsx';
import { FilmDataProps } from '../../types/filmDataTypes.ts';

const App = ({name, genre, promoDate}: FilmDataProps) =>
  (
    <MainPage
      name={name}
      genre={genre}
      promoDate={promoDate}
    />
  );

export default App;
