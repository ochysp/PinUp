import React from 'react';
import { shallow, mount, render } from 'enzyme';

const sum = require('../components/TESTING_Demo');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});