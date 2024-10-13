import * as $ from '../lib/streams.js';
import { Var } from '../lib/common.js';
import { succeedo, failo, eq } from '../lib/goals.js';
import { describe, test, expect } from 'vitest';

describe('Goals', () => {
  test('`succeedo` produces a unit stream of its argument', () => {
    const subst = new Map();
    expect(succeedo(subst)).toEqual($.unit(subst));
  });

  test('`failo` produces the empty stream', () => {
    const subst = new Map();
    expect(failo(subst)).toEqual($.empty);
  });

  test('`eq(x, y)(s)` produces a unit stream if x and y unify in s', () => {
    const u = Var.new();
    const v = Var.new();
    const x = { this: u, a: 'test' };
    const y = { this: 'is', a: v };
    const sub = new Map().set(v, 'test');
    expect(eq(x, y)(sub)).toEqual($.unit(sub.set(u, 'is')));
  });

  test('`eq(x, y)(s)` produces the empty stream if x and y fail to unify in s', () => {
    const sub = new Map();
    expect(eq('a', 'b')(sub)).toEqual($.empty);
  });
});
