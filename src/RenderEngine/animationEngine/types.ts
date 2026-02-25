export type StyleValue = string | number | (string | number | null)[];

export interface TransitionProps {
  ease?: [number, number, number, number];
  times?: number[];
  duration?: number;
  delay?: number;
  formula?: any;
}

export interface Variant {
  transition?: Record<string, TransitionProps>;
  [key: string]: StyleValue | Record<string, TransitionProps> | undefined;
}

export interface VariantData {
  [variantName: string]: Variant;
}

export interface ElementRegistry {
  element: HTMLElement;
  currentValues: Variant;
  variants: VariantData;
  playing: boolean;
  animationFrameId?: number;
  custom?: {[key:string] : any}
}

export interface Animation {
  key: string;
  unit: string;
  frames: number[] | [number, number, number, number][];
  times: number[];
  duration: number;
  delay: number;
  easeFns: ((t: number) => number)[];
  easeArray: [number, number, number, number];
  isColor: boolean;
  isAuto?: boolean;
}
