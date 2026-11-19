import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getStatus, seatsText } from '../lib/status.ts';

describe('getStatus', () => {
  it('is open when capacity is not set', () => {
    assert.equal(getStatus({ remainingSeats: null }), 'open');
  });

  it('is open when plenty of seats remain', () => {
    assert.equal(getStatus({ remainingSeats: 6 }), 'open');
  });

  it('is few when 5 or fewer seats remain', () => {
    assert.equal(getStatus({ remainingSeats: 5 }), 'few');
    assert.equal(getStatus({ remainingSeats: 1 }), 'few');
  });

  it('is full when no seats remain', () => {
    assert.equal(getStatus({ remainingSeats: 0 }), 'full');
  });
});

describe('seatsText', () => {
  it('describes remaining seats in plain words', () => {
    assert.equal(seatsText({ remainingSeats: null, capacity: null }), '不限名額');
    assert.equal(seatsText({ remainingSeats: 3, capacity: 30 }), '剩 3 個名額');
    assert.equal(seatsText({ remainingSeats: 0, capacity: 5 }), '名額 5 人已滿');
  });
});
