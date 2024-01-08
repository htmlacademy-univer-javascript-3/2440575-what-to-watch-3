import { FilmDetails, FilmPreview } from '../types/film.ts';
import * as faker from 'faker';
import { UserCredentials, UserData } from '../types/user.ts';
import { VideoPlayerProps } from '../components/video-player/video-player.tsx';
import { Review, ReviewFormLimitations } from '../types/review.ts';

function getRandomArrayLength(): number {
  return faker.datatype.number({ min: 5, max: 20 });
}

export function mockFilmDetails(): FilmDetails & FilmPreview {
  return ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    genre: faker.music.genre(),
    posterImage: faker.image.imageUrl(),
    backgroundImage: faker.image.imageUrl(),
    backgroundColor: faker.internet.color(),
    videoLink: faker.internet.url(),
    description: faker.commerce.productDescription(),
    rating: faker.datatype.number({ max: ReviewFormLimitations.MaxRating }),
    scoresCount: faker.datatype.number(),
    director: faker.name.findName(),
    starring: Array.from({ length: getRandomArrayLength() }, () => faker.name.findName()),
    runTime: faker.datatype.number(),
    released: faker.datatype.number(),
    isFavorite: faker.datatype.boolean(),
    previewImage: faker.image.imageUrl(),
    previewVideoLink: faker.internet.url(),
  });
}

export function mockFilmArray(): (FilmDetails & FilmPreview)[] {
  return Array.from({ length: getRandomArrayLength() }, () => mockFilmDetails());
}

export function mockUserDetails(): UserData {
  return ({
    name: faker.name.findName(),
    avatarUrl: faker.image.imageUrl(),
    email: faker.internet.email(),
    token: faker.datatype.string(),
  });
}

export function mockUserCredentials(): UserCredentials {
  return ({
    email: faker.internet.email(),
    password: `${faker.internet.password()}1A`,
  });
}

export function mockPlayerDetails(): VideoPlayerProps {
  return ({
    posterImage: faker.image.imageUrl(),
    videoLink: faker.internet.url(),
  });
}

export function mockReview(): Review {
  return ({
    id: faker.datatype.uuid(),
    date: faker.datatype.datetime().toDateString(),
    user: faker.name.findName(),
    comment: faker.commerce.productDescription()
      .repeat(ReviewFormLimitations.CommentMinLength)
      .slice(0, ReviewFormLimitations.CommentMinLength + 2)
      .trim(),
    rating: faker.datatype.number({ max: ReviewFormLimitations.MaxRating }),
  });
}

export function mockReviewArray(): Review[] {
  return Array.from({ length: getRandomArrayLength() }, () => mockReview());
}

export function mockToken(): string {
  return faker.datatype.string();
}
