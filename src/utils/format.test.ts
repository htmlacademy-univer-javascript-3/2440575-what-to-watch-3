import { formatDate, formatPlayerTime, formatRunTime } from './format.ts';
import { SHORT_DATE_FORMAT, STANDARD_DATE_FORMAT } from '../constants/date.ts';

describe('Utils: Formats', () => {
  it('should format player time', () => {
    const mockedSeconds = 5000;
    expect(formatPlayerTime(mockedSeconds)).toEqual('01:23:20');
  });

  it('should format dates', () => {
    const mockedDate = new Date('Sat Nov 16 1996');
    expect(formatDate(new Date(mockedDate), STANDARD_DATE_FORMAT)).toEqual('Nov 16, 1996');
    expect(formatDate(new Date(mockedDate), SHORT_DATE_FORMAT)).toEqual('11/16/1996');
  });

  it('should format run time', () => {
    const mockedMinutes = 100;
    expect(formatRunTime(mockedMinutes)).toEqual('1h 40m');
  });
});
