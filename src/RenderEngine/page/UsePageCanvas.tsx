import { useEffect } from 'react';
import { usePage } from './PageContext';

type Props = {
  rect: { top: number; left: number; width: number; height: number };
  children: (position: [x: number, y: number, z: number]) => React.ReactNode;
};

const UsePageCanvas = ({ rect, meshRef, children }: Props) => {
  const { add, remove } = usePage();

  useEffect(() => {
    const x = rect.left + rect.width / 2 - window.innerWidth / 2;
    const y = -(rect.top + rect.height / 2 - window.innerHeight / 2);
    const z = 0;

    const element = children({ position: [x, y, z], ref:meshRef });

    add(element);
    return () => remove(element);
  }, [rect]);

  return null;
};

export default UsePageCanvas;
