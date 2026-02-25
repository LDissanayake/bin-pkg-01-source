// src/hooks/useAddonRegistry.ts
import { useState, useEffect } from 'react';

export const useAddonRegistry = () => {
  const [registry, setRegistry] = useState(window.AddifectCore?.registry.features || {});

  useEffect(() => {
    // Handler to refresh state when a new plugin registers
    const syncRegistry = () => {
      setRegistry({ ...window.AddifectCore.registry.features });
    };

    // Listen for the main init and any subsequent updates
    window.addEventListener('addifect_init', syncRegistry);
    window.addEventListener('addifect_registry_updated', syncRegistry);

    return () => {
      window.removeEventListener('addifect_init', syncRegistry);
      window.removeEventListener('addifect_registry_updated', syncRegistry);
    };
  }, []);

  return registry;
};