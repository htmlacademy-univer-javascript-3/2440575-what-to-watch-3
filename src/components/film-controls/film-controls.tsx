import { PropsWithChildren } from 'react';
import AddReviewLink from './add-review-link';
import MyListButton from './my-list-button';
import PlayLink from './play-link';

export default function FilmControls({ children }: PropsWithChildren) {
  return (
    <div className="film-card__buttons">
      {children}
    </div>
  );
}

FilmControls.AddReviewLink = AddReviewLink;
FilmControls.MyListButton = MyListButton;
FilmControls.PlayLink = PlayLink;
