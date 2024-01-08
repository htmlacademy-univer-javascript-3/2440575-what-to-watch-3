import { getRatingDescription } from './film.ts';
import { RatingDescription } from '../types/film.ts';

describe('Function: getRatingDescription', () => {
  it('should return Bad in range [0; 3)', () => {
    expect(getRatingDescription(0)).toEqual(RatingDescription.Bad);
    expect(getRatingDescription(2.99)).toEqual(RatingDescription.Bad);
  });

  it('should return Normal in range [3; 5)', () => {
    expect(getRatingDescription(3)).toEqual(RatingDescription.Normal);
    expect(getRatingDescription(4.99)).toEqual(RatingDescription.Normal);
  });

  it('should return Good in range [5; 8)', () => {
    expect(getRatingDescription(5)).toEqual(RatingDescription.Good);
    expect(getRatingDescription(7.99)).toEqual(RatingDescription.Good);
  });

  it('should return Very Good in range [8; 10)', () => {
    expect(getRatingDescription(8)).toEqual(RatingDescription.VeryGood);
    expect(getRatingDescription(9.99)).toEqual(RatingDescription.VeryGood);
  });

  it('should return Awesome in case of 10', () => {
    expect(getRatingDescription(10)).toEqual(RatingDescription.Awesome);
  });
});
