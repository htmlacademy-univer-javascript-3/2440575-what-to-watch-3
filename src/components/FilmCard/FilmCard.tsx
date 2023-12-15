import { FilmPreviewData } from '../../types';
import { Link } from 'react-router-dom';
import { AppRoute, FilmRoute } from '../../config/config.ts';
import VideoPlayer from '../VideoPlayer/VideoPlayer.tsx';
import { useEffect, useState } from 'react';

type FilmCardProps = {
  filmPreview: FilmPreviewData;
  clickHandler: (item: FilmPreviewData) => void;
}

const FilmCard = ({filmPreview, clickHandler}: FilmCardProps): JSX.Element => {
  const [video, setVideo] = useState(false);
  const [isArticleHover, setArticleHover] = useState(false);

  const mouseOverHandler = () => {
    setArticleHover(true);
  };

  const mouseOutHandler = () => {
    setArticleHover(false);
    setVideo(false);
  };

  useEffect(() => {
    const hoverTimout =
      isArticleHover
        ? setTimeout(() => {
          setVideo(true);
        }, 1000)
        : '';

    return () => {
      clearTimeout(hoverTimout);
    };
  }, [isArticleHover]);

  return (
    <article
      onClick={() => clickHandler(filmPreview)}
      onMouseOver={mouseOverHandler}
      onMouseOut={mouseOutHandler}
      className="small-film-card catalog__films-card"
    >
      <div className="small-film-card__image">
        {
          video ? (
            <VideoPlayer videoLink={filmPreview.previewVideoLink} posterImage={filmPreview.previewImage}></VideoPlayer>
          ) : (
            <img
              src={filmPreview.previewImage}
              alt={filmPreview.name}
              width="280"
              height="175"
            />
          )
        }
      </div>
      {
        !video && (
          <h3 className="small-film-card__title">
            <Link
              to={`${AppRoute.Film.replace(':id', filmPreview.id).replace(':info', FilmRoute.Overview)}`}
              className="small-film-card__link"
            >
              {filmPreview.name}
            </Link>
          </h3>
        )
      }
    </article>
  );
};

export default FilmCard;
