import { FilmDetails, FilmPreview } from '../types/film.ts';
import * as faker from 'faker';
import { UserCredentials, UserData } from '../types/user.ts';
import { VideoPlayerProps } from '../components/video-player/video-player.tsx';
import { Review } from '../types/review.ts';

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
    rating: faker.datatype.number({ max: 10 }),
    scoresCount: faker.datatype.number(),
    director: faker.name.findName(),
    starring: Array.from({ length: 10 }, () => faker.name.findName()),
    runTime: faker.datatype.number(),
    released: faker.datatype.number(),
    isFavorite: faker.datatype.boolean(),
    previewImage: faker.image.imageUrl(),
    previewVideoLink: faker.internet.url(),
  });
}

export function mockFilmArray(): (FilmDetails & FilmPreview)[] {
  const arrayLength = faker.datatype.number({ min: 5, max: 20 });
  return Array.from({ length: arrayLength }, () => mockFilmDetails());
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
    password: faker.internet.password(),
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
    comment: faker.commerce.productDescription(),
    rating: faker.datatype.number({ max: 10 }),
  });
}

export function mockReviewArray(): Review[] {
  const arrayLength = faker.datatype.number({ min: 5, max: 20 });
  return Array.from({ length: arrayLength }, () => mockReview());
}

export function mockToken(): string {
  return faker.datatype.string();
}
