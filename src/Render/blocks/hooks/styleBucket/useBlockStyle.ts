import { useEffect } from 'react';
import { addStyleCSR, removeStyleCSR } from './styleStore';

export function useBlockStyle(id: string, css: string, renderType: 'SSR' | 'CSR') {
  // For SSR, do nothing here — block outputs inline <style> directly
  if (renderType === 'SSR') {
    return;
  }

  // For CSR, register and unregister styles globally
  useEffect(() => {
    addStyleCSR(id, css);
    return () => {
      removeStyleCSR(id);
    };
  }, [id, css]);
}
