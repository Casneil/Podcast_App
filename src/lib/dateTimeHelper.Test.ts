import {getWeekDay, WeekDayEnum, humanDuration} from './dateTimeHelper';

describe('dateTimeHelper', () => {
  // given a certain date, recieve human readable weekday
  describe('#getWeekDay()', () => {
    test.each`
      date                                    | expected
      ${new Date('2020-07-05T13:48:01.728Z')} | ${WeekDayEnum.Sunday}
      ${new Date('2020-07-06T13:48:01.728Z')} | ${WeekDayEnum.Monday}
      ${new Date('2020-07-07T13:48:01.728Z')} | ${WeekDayEnum.Tuesday}
      ${new Date('2020-07-08T13:48:01.728Z')} | ${WeekDayEnum.Wednesday}
      ${new Date('2020-07-09T13:48:01.728Z')} | ${WeekDayEnum.Thursday}
      ${new Date('2020-07-10T13:48:01.728Z')} | ${WeekDayEnum.Friday}
      ${new Date('2020-07-11T13:48:01.728Z')} | ${WeekDayEnum.Saturday}
    `('should return $expected for given date', ({date, expected}) => {
      expect(getWeekDay(date)).toBe(expected);
    });
  });
  describe('#humanDuration()', () => {
    it('should return human readable duration', () => {
      expect(humanDuration('03:13:00')).toBe('3hrs. 13min');
      expect(humanDuration('13:10:00')).toBe('13hrs. 10min');
      expect(humanDuration('16:18')).toBe('16min');
    });
  });
});
