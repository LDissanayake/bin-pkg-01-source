import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useRef,
  ReactNode,
  ReactElement,
} from 'react';

interface PageContextType {
  elements: ReactElement[]; // You can type this more specifically if you know the element type
  add: (el: any) => void;
  remove: (el: any) => void;
  isAnimatingRef: React.MutableRefObject<boolean>;
  setIsAnimating: () => void;
}

const PageContext = createContext<PageContextType | null>(null);

interface PageProviderProps {
  children: ReactNode;
}

export function PageProvider({ children }: PageProviderProps) {
  const [elements, setElements] = useState<React.ReactElement<any, string | React.JSXElementConstructor<any>>[]>([]); // Replace any with specific element type if possible

  const add = useCallback((el: any) => setElements((prev) => [...prev, el]), []);
  const remove = useCallback((el: any) => setElements((prev) => prev.filter((e) => e !== el)), []);

  const isAnimatingRef = useRef<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const setIsAnimating = () => {
    isAnimatingRef.current = true;
    // invalidate(); // TODO: bring this back
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      isAnimatingRef.current = false;
    }, 250); // adjust this timeout based on animation durations
  };

  return (
    <PageContext.Provider value={{ elements, add, remove, isAnimatingRef, setIsAnimating }}>
      {children}
    </PageContext.Provider>
  );
}

export function usePage() {
  const ctx = useContext(PageContext);
  if (!ctx) throw new Error('usePage must be used within a PageProvider');
  return ctx;
}
