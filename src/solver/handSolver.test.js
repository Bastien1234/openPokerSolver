import handSolver from './handSolver';

test('Testing straight flush', () => {
    expect(handSolver(["As", "Ks", "Qs", "Js", "Ts", "5c", "2d"])).toBe(9_130_000_000);
  });