export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isReached: boolean;
  totalSeconds: number;
}

// Target: November 6, 2026, 00:00:00 IST (UTC+05:30)
// In ISO: 2026-11-06T00:00:00+05:30
export const BIRTHDAY_TARGET_ISO = "2026-11-06T00:00:00+05:30";
export const TARGET_DATE_TIMESTAMP = new Date(BIRTHDAY_TARGET_ISO).getTime();

export function calculateTimeUntilBirthday(overrideTimestamp?: number): CountdownTime {
  const target = overrideTimestamp ?? TARGET_DATE_TIMESTAMP;
  const now = Date.now();
  const diffMs = target - now;

  if (diffMs <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isReached: true,
      totalSeconds: 0,
    };
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    isReached: false,
    totalSeconds,
  };
}
