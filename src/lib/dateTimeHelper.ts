export enum WeekDayEnum {
    Monday = 'Monday',
    Tuesday = 'Tuesday',
    Wednesday = 'Wednesday',
    Thursday = 'Thursday',
    Friday = 'Friday',
    Saturday = 'Saturday',
    Sunday = 'Sunday',
}
export const getWeekDay = (date: Date): WeekDayEnum => {
    const day = date.getDay();

    const lookups = {
        [WeekDayEnum.Monday]: 1,
        [WeekDayEnum.Tuesday]: 2,
        [WeekDayEnum.Wednesday]: 3,
        [WeekDayEnum.Thursday]: 4,
        [WeekDayEnum.Friday]: 5,
        [WeekDayEnum.Saturday]: 6,
        [WeekDayEnum.Sunday]: 0,
    };
    for (const key in lookups) {
        if (lookups[key as keyof typeof lookups] === day) {
            return key as keyof typeof lookups;
        }
    }
    throw new Error('Invalid date');
};

export const humanDuration = (duration: string): string => {
    const durationSplit = duration.split(':');

    if (durationSplit.length === 2) {
        const [minute] = durationSplit;
        return `${Number(minute)}min`;
    }

    const [hour, minute] = durationSplit;

    if (hour === '00') {
        return `${Number(minute)}min`;
    }

    return `${Number(hour)}hrs. ${minute}min`;
};
