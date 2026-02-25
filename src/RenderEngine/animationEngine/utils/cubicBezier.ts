// cubicBezier.ts
export function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  // Constants from the spec
  const NEWTON_ITERATIONS = 4;
  const NEWTON_MIN_SLOPE = 0.001;
  const SUBDIVISION_PRECISION = 0.0000001;
  const SUBDIVISION_MAX_ITERATIONS = 10;

  const kSplineTableSize = 11;
  const kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

  const float32ArraySupported = typeof Float32Array === 'function';

  // Precompute sample values table
  const sampleValues = float32ArraySupported
    ? new Float32Array(kSplineTableSize)
    : new Array(kSplineTableSize);

  function A(aA1: number, aA2: number) {
    return 1.0 - 3.0 * aA2 + 3.0 * aA1;
  }
  function B(aA1: number, aA2: number) {
    return 3.0 * aA2 - 6.0 * aA1;
  }
  function C(aA1: number) {
    return 3.0 * aA1;
  }

  function calcBezier(t: number, aA1: number, aA2: number) {
    return ((A(aA1, aA2) * t + B(aA1, aA2)) * t + C(aA1)) * t;
  }

  function getSlope(t: number, aA1: number, aA2: number) {
    return 3.0 * A(aA1, aA2) * t * t + 2.0 * B(aA1, aA2) * t + C(aA1);
  }

  function binarySubdivide(x: number, a: number, b: number, x1: number, x2: number) {
    let currentX: number;
    let currentT: number;
    let i = 0;

    do {
      currentT = a + (b - a) / 2.0;
      currentX = calcBezier(currentT, x1, x2) - x;
      if (currentX > 0.0) {
        b = currentT;
      } else {
        a = currentT;
      }
    } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);

    return currentT;
  }

  function newtonRaphsonIterate(x: number, guessT: number, x1: number, x2: number) {
    for (let i = 0; i < NEWTON_ITERATIONS; ++i) {
      const currentSlope = getSlope(guessT, x1, x2);
      if (currentSlope === 0.0) return guessT;
      const currentX = calcBezier(guessT, x1, x2) - x;
      guessT -= currentX / currentSlope;
    }
    return guessT;
  }

  function bezier(t: number) {
    if (x1 === y1 && x2 === y2) return t; // linear

    // Find t for x
    let intervalStart = 0.0;
    let currentSample = 1;
    const lastSample = kSplineTableSize - 1;

    for (; currentSample !== lastSample && sampleValues[currentSample] <= t; ++currentSample) {
      intervalStart += kSampleStepSize;
    }

    --currentSample;

    const dist = (t - sampleValues[currentSample]) /
      (sampleValues[currentSample + 1] - sampleValues[currentSample]);

    const guessForT = intervalStart + dist * kSampleStepSize;

    const initialSlope = getSlope(guessForT, x1, x2);

    return calcBezier(
      initialSlope >= NEWTON_MIN_SLOPE
        ? newtonRaphsonIterate(t, guessForT, x1, x2)
        : initialSlope === 0.0
          ? guessForT
          : binarySubdivide(t, intervalStart, intervalStart + kSampleStepSize, x1, x2),
      y1, y2
    );
  }

  for (let i = 0; i < kSplineTableSize; ++i) {
    sampleValues[i] = calcBezier(i * kSampleStepSize, x1, x2);
  }

  return bezier;
}


export function splitBezier(
  [x1, y1, x2, y2]: [number, number, number, number],
  t0: number,
  t1: number
): [number, number, number, number] {
  const p0: [number, number] = [0, 0];
  const p1: [number, number] = [x1, y1];
  const p2: [number, number] = [x2, y2];
  const p3: [number, number] = [1, 1];

  const lerp = (a: [number, number], b: [number, number], t: number): [number, number] => [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
  ];

  const getPoint = (t: number) => {
    const a = lerp(p0, p1, t);
    const b = lerp(p1, p2, t);
    const c = lerp(p2, p3, t);
    const d = lerp(a, b, t);
    const e = lerp(b, c, t);
    return lerp(d, e, t);
  };

  const pA = getPoint(t0);
  const pD = getPoint(t1);
  const pB = getPoint((2 * t0 + t1) / 3);
  const pC = getPoint((t0 + 2 * t1) / 3);

  const dx = pD[0] - pA[0];
  const dy = pD[1] - pA[1];

  const normalize = ([x, y]: [number, number]): [number, number] => [
    dx !== 0 ? (x - pA[0]) / dx : 0,
    dy !== 0 ? (y - pA[1]) / dy : 0,
  ];

  const [nx1, ny1] = normalize(pB);
  const [nx2, ny2] = normalize(pC);

  return [nx1, ny1, nx2, ny2];
}