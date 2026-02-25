// Declaration merging for React
declare global {
  namespace React {
  }
  namespace ReactDOM {
    interface Root {
      render: (element: React.ReactNode) => void;
    }
  }
  namespace JSX {
    interface IntrinsicElements {
      'post-query': any;
    }
  }
  interface Window {
    addifectRender: {
      assetsPath: string
      templatesUpdated: number | string,
    };
    addifectStudio: {
      root: string,
      nonce: string
    };
    AddifectCore: {
      version: string;
      // Define the registry where Pro features will live
      registry: {
        features: Record<string, any>;
      };
      // The function Pro version will call
      registerProFeature: (name: string, config: any) => void;
    };
    addifectProData: {
      pluginUrl: string;
      isPro: boolean;
    };
  }
  const __IS_EDITOR__: boolean;
  const __IS_SITE__: boolean;
}

export { };
