import type { FilmPreview } from '../../types/film.ts';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../types/routes.ts';
import VideoPlayer from '../video-player';
import { useEffect, useRef, useState } from 'react';
import { FILM_PREVIEW_DELAY } from '../../constants/film.ts';

export default function FilmCard({ id, name, previewImage, previewVideoLink }: FilmPreview) {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  function clearPlayerTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  function handleMouseOver() {
    clearPlayerTimeout();
    timeoutRef.current = setTimeout(() => setIsHovering(true), FILM_PREVIEW_DELAY);
  }

  function handleMouseLeave() {
    clearPlayerTimeout();
    setIsHovering(false);
  }

  useEffect(() => () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);


  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate(AppRoutes.Film.replace(':id', id))}
    >
      {isHovering ? (
        <VideoPlayer videoLink={previewVideoLink} posterImage={previewImage} muted autoPlay />
      ) : (
        <>
          <div className="small-film-card__image">
            <img src={previewImage} alt={name} width="280" height="175" />
          </div>
          <h3 className="small-film-card__title">
            <span className="small-film-card__link">
              {name}
            </span>
          </h3>
        </>
      )}
    </article>
  );
}
