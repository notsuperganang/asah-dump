import { test } from 'node:test';
import assert from 'node:assert';
import sum from './index.js';

// Test case 1: Valid positive numbers - normal addition
test('sum should add two positive numbers correctly', () => {
  const result = sum(2, 3);
  assert.strictEqual(result, 5);
});

test('sum should add two positive numbers correctly (large numbers)', () => {
  const result = sum(1000, 2000);
  assert.strictEqual(result, 3000);
});

// Test case 2: Zero values (edge case for non-negative)
test('sum should handle zero values correctly', () => {
  const result1 = sum(0, 5);
  const result2 = sum(10, 0);
  const result3 = sum(0, 0);
  
  assert.strictEqual(result1, 5);
  assert.strictEqual(result2, 10);
  assert.strictEqual(result3, 0);
});

// Test case 3: Decimal numbers
test('sum should handle decimal numbers correctly', () => {
  const result = sum(1.5, 2.3);
  assert.strictEqual(result, 3.8);
});

// Test case 4: Negative numbers (should return 0)
test('sum should return 0 when first parameter is negative', () => {
  const result = sum(-5, 3);
  assert.strictEqual(result, 0);
});

test('sum should return 0 when second parameter is negative', () => {
  const result = sum(5, -3);
  assert.strictEqual(result, 0);
});

test('sum should return 0 when both parameters are negative', () => {
  const result = sum(-5, -3);
  assert.strictEqual(result, 0);
});

// Test case 5: Non-number types (should return 0)
test('sum should return 0 when first parameter is not a number', () => {
  assert.strictEqual(sum('5', 3), 0);
  assert.strictEqual(sum(true, 3), 0);
  assert.strictEqual(sum(null, 3), 0);
  assert.strictEqual(sum(undefined, 3), 0);
  assert.strictEqual(sum([], 3), 0);
  assert.strictEqual(sum({}, 3), 0);
});

test('sum should return 0 when second parameter is not a number', () => {
  assert.strictEqual(sum(5, '3'), 0);
  assert.strictEqual(sum(5, true), 0);
  assert.strictEqual(sum(5, null), 0);
  assert.strictEqual(sum(5, undefined), 0);
  assert.strictEqual(sum(5, []), 0);
  assert.strictEqual(sum(5, {}), 0);
});

test('sum should return 0 when both parameters are not numbers', () => {
  assert.strictEqual(sum('5', '3'), 0);
  assert.strictEqual(sum(true, false), 0);
  assert.strictEqual(sum(null, undefined), 0);
  assert.strictEqual(sum([], {}), 0);
});

// Test case 6: Special number values
test('sum should handle special number values', () => {
  // NaN cases (NaN is type number but should be handled)
  assert.strictEqual(sum(NaN, 5), NaN);
  assert.strictEqual(sum(5, NaN), NaN);
  
  // Infinity cases (positive)
  assert.strictEqual(sum(Infinity, 5), Infinity);
  assert.strictEqual(sum(5, Infinity), Infinity);
  
  // Negative Infinity should return 0 (negative number rule)
  assert.strictEqual(sum(-Infinity, 5), 0);
  assert.strictEqual(sum(5, -Infinity), 0);
});

// Test case 7: Edge cases with very small positive numbers
test('sum should handle very small positive numbers', () => {
  const result = sum(0.0000001, 0.0000002);
  assert.strictEqual(result, 0.0000003);
});
