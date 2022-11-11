import { test, expect } from '@playwright/test';

test('The string is equal to itself', () => {
    expect('test').toBe('test');
});