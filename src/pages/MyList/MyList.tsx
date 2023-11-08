const MyList = () => (
  <div className="user-page">
    <header className="page-header user-page__head">
      <div className="logo">
        <a href="#" className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>

      <h1 className="page-title user-page__title">My list <span className="user-page__film-count">9</span></h1>
      <ul className="user-block">
        <li className="user-block__item">
          <div className="user-block__avatar">
            <img src="public/img/avatar.jpg" alt="User avatar" width="63" height="63"/>
          </div>
        </li>
        <li className="user-block__item">
          <a className="user-block__link">Sign out</a>
        </li>
      </ul>
    </header>

    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <div className="catalog__films-list">
        <article className="small-film-card catalog__films-card">
          <div className="small-film-card__image">
            <img
              src="public/img/fantastic-beasts-the-crimes-of-grindelwald.jpg"
              alt="Fantastic Beasts: The Crimes of Grindelwald" width="280" height="175"
            />
          </div>
          <h3 className="small-film-card__title">
            <a className="small-film-card__link" href="#">Fantastic Beasts: The Crimes of Grindelwald</a>
          </h3>
        </article>

        <article className="small-film-card catalog__films-card">
          <div className="small-film-card__image">
            <img src="public/img/bohemian-rhapsody.jpg" alt="Bohemian Rhapsody" width="280" height="175"/>
          </div>
          <h3 className="small-film-card__title">
            <a className="small-film-card__link" href="#">Bohemian Rhapsody</a>
          </h3>
        </article>

        <article className="small-film-card catalog__films-card">
          <div className="small-film-card__image">
            <img src="public/img/macbeth.jpg" alt="Macbeth" width="280" height="175"/>
          </div>
          <h3 className="small-film-card__title">
            <a className="small-film-card__link" href="#">Macbeth</a>
          </h3>
        </article>

        <article className="small-film-card catalog__films-card">
          <div className="small-film-card__image">
            <img src="public/img/aviator.jpg" alt="Aviator" width="280" height="175"/>
          </div>
          <h3 className="small-film-card__title">
            <a className="small-film-card__link" href="#">Aviator</a>
          </h3>
        </article>


        <article className="small-film-card catalog__films-card">
          <div className="small-film-card__image">
            <img
              src="public/img/we-need-to-talk-about-kevin.jpg" alt="We need to talk about Kevin" width="280"
              height="175"
            />
          </div>
          <h3 className="small-film-card__title">
            <a className="small-film-card__link" href="#">We need to talk about Kevin</a>
          </h3>
        </article>

        <article className="small-film-card catalog__films-card">
          <div className="small-film-card__image">
            <img
              src="public/img/what-we-do-in-the-shadows.jpg" alt="What We Do in the Shadows" width="280" height="175"
            />
          </div>
          <h3 className="small-film-card__title">
            <a className="small-film-card__link" href="#">What We Do in the Shadows</a>
          </h3>
        </article>

        <article className="small-film-card catalog__films-card">
          <div className="small-film-card__image">
            <img src="public/img/revenant.jpg" alt="Revenant" width="280" height="175"/>
          </div>
          <h3 className="small-film-card__title">
            <a className="small-film-card__link" href="#">Revenant</a>
          </h3>
        </article>

        <article className="small-film-card catalog__films-card">
          <div className="small-film-card__image">
            <img src="public/img/johnny-english.jpg" alt="Johnny English" width="280" height="175"/>
          </div>
          <h3 className="small-film-card__title">
            <a className="small-film-card__link" href="#">Johnny English</a>
          </h3>
        </article>


        <article className="small-film-card catalog__films-card">
          <div className="small-film-card__image">
            <img src="public/img/shutter-island.jpg" alt="Shutter Island" width="280" height="175"/>
          </div>
          <h3 className="small-film-card__title">
            <a className="small-film-card__link" href="#">Shutter Island</a>
          </h3>
        </article>
      </div>
    </section>

    <footer className="page-footer">
      <div className="logo">
        <a href="#" className="logo__link logo__link--light">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>

      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  </div>
);

export default MyList;
