import { test } from 'node:test';
import assert from 'node:assert';
import { sum } from './index.js';

test('sum should add two positive numbers correctly', () => {
  const result = sum(2, 3);
  assert.strictEqual(result, 5);
});

test('sum should add positive and negative numbers correctly', () => {
  const result = sum(5, -3);
  assert.strictEqual(result, 2);
});

test('sum should add two negative numbers correctly', () => {
  const result = sum(-4, -6);
  assert.strictEqual(result, -10);
});

test('sum should handle zero values correctly', () => {
  const result1 = sum(0, 5);
  const result2 = sum(10, 0);
  const result3 = sum(0, 0);
  
  assert.strictEqual(result1, 5);
  assert.strictEqual(result2, 10);
  assert.strictEqual(result3, 0);
});

test('sum should handle decimal numbers correctly', () => {
  const result = sum(1.5, 2.3);
  assert.strictEqual(result, 3.8);
});

test('sum should handle large numbers correctly', () => {
  const result = sum(999999, 1);
  assert.strictEqual(result, 1000000);
});