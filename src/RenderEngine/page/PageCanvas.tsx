import { Canvas, RenderProps } from '@react-three/fiber';
import React, { ReactElement, ReactNode } from 'react';
import { CanvasProps } from '@react-three/fiber';
import { usePage } from './PageContext';

type ResizeOptions = {
  debounce?: number | {
    scroll: number;
    resize: number;
  } | undefined;
  scroll?: boolean | undefined;
  polyfill?: (new (cb: ResizeObserverCallback) => ResizeObserver) | undefined;
  offsetSize?: boolean;
}

interface PageCanvasProps extends Omit<RenderProps<HTMLCanvasElement>, 'size'>, React.HTMLAttributes<HTMLDivElement> {
  showEffect: boolean;
  renderContent: (elements: ReactElement[]) => React.ReactNode;
  fallback?: React.ReactNode;
  /**
   * Options to pass to useMeasure.
   * @see https://github.com/pmndrs/react-use-measure#api
   */
  resize?: ResizeOptions;
  /** The target where events are being subscribed to, default: the div that wraps canvas */
  eventSource?: HTMLElement | React.MutableRefObject<HTMLElement>;
  /** The event prefix that is cast into canvas pointer x/y events, default: "offset" */
  eventPrefix?: 'offset' | 'client' | 'page' | 'layer' | 'screen';
}

export const PageCanvas = ({ showEffect, renderContent, ...canvasProps }: PageCanvasProps) => {
  const { elements } = usePage();

  return (
    <Canvas {...canvasProps}>
      {showEffect ? renderContent(elements) : null}
    </Canvas>
  );
};


export default PageCanvas;