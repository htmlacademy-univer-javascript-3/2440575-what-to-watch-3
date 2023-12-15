import { FilmDetails, FilmPageTabs } from '../../../types/film.ts';
import classNames from 'classnames';
import { useState } from 'react';
import ReviewTab from './review-tab';
import { Review } from '../../../types/review.ts';
import OverviewTab from './overview-tab';
import DetailsTab from './details-tab';

interface FilmTabsProps extends FilmDetails {
  reviews: Review[];
}

export default function FilmTabs({ reviews, ...filmData }: FilmTabsProps) {
  const [selectedTab, setSelectedTab] = useState<FilmPageTabs>(FilmPageTabs.Overview);

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {Object.values(FilmPageTabs).map((tab) => (
            <li
              key={tab}
              className={classNames('film-nav__item', tab === selectedTab && 'film-nav__item--active')}
              onClick={() => setSelectedTab(tab)}
            >
              <span className="film-nav__link">{tab}</span>
            </li>
          ))}
        </ul>
      </nav>
      {selectedTab === FilmPageTabs.Overview && <OverviewTab {...filmData} />}
      {selectedTab === FilmPageTabs.Details && <DetailsTab {...filmData} />}
      {selectedTab === FilmPageTabs.Reviews && <ReviewTab reviews={reviews} />}
    </div>
  );
}
