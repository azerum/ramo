import { describe, test, expect } from 'vitest';
import { Var } from '../lib/common.js';
import { reify } from '../lib/reify.js';

describe('Reification', () => {
  test('`reify` acts like the identity for non-Var terms', () => {
    const sub = new Map();
    expect(reify('three', sub)).toBe('three');
  });

  test('`reify` reifies fresh Vars as identifiable strings', () => {
    const x = Var.new();
    const sub = new Map();
    expect(reify(x, sub)).toBe('_0');
  });

  test('`reify` reifies associated Vars as their associated terms', () => {
    const x = Var.new();
    const sub = new Map().set(x, { a: 'term' });
    expect(reify(x, sub)).toEqual({ a: 'term' });
  });

  test('`reify` reifies the same fresh Var using the same string', () => {
    const x = Var.new();
    const y = Var.new();
    const sub = new Map();
    const r = { a: '_0', b: '_1', c: '_0' };
    expect(reify({ a: x, b: y, c: x }, sub)).toEqual(r);
  });

  test('`reify` walks Vars to find associations', () => {
    const x = Var.new();
    const y = Var.new();
    const sub = new Map().set(x, y);
    const r = { a: '_0', b: '_0' };
    expect(reify({ a: x, b: y }, sub)).toEqual(r);
  });
});
