import type { PublicEvent } from './types.ts';

export type Status = 'open' | 'few' | 'full';

// 剩 5 個名額以內算「即將額滿」
export const FEW_SEATS = 5;

// 不限名額的活動一律可報名
export function getStatus(event: Pick<PublicEvent, 'remainingSeats'>): Status {
  if (event.remainingSeats === null) return 'open';
  if (event.remainingSeats === 0) return 'full';
  return event.remainingSeats <= FEW_SEATS ? 'few' : 'open';
}

export function seatsText(event: Pick<PublicEvent, 'remainingSeats' | 'capacity'>): string {
  if (event.remainingSeats === null) return '不限名額';
  if (event.remainingSeats === 0) return `名額 ${event.capacity} 人已滿`;
  return `剩 ${event.remainingSeats} 個名額`;
}
