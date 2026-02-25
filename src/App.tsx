import React, { Suspense, useEffect, useState } from "react";
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { notifications } from '@mantine/notifications';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { IconX } from "@tabler/icons-react";
import FullScreenLoader from "./FullScreenLoader";
import Home from "./Home";
import { getCurrentUserInfo } from "./util/wpApi";

// Define the available tiers
export type AddifectEdition = 'lite' | 'studio' | 'enterprise';

// Lazy-loaded components
const BlockEditor = React.lazy(() => import("./BlockEditor"));

export interface Effect {
  id: string,
  category: string,
  type: string,
  default?: boolean,
  title: string,
  createdAt: number,
  lastUpdatedAt: number,
  isSync: boolean,
  effectStatus: 'draft' | 'publish' | 'trash',
  props: {
    [key: string]: any
  }
}

export interface RenderEffect {
  id: string,
  type: string,
  category: string,
  props: {
    [key: string]: any
  }
}

export interface EffectsData {
  effects: {
    [key: string]: Effect;
  },
  renderEffectsData: {
    [key: string]: RenderEffect;
  },
  lastId: number
}

// 1. DEFINE IMMEDIATELY (Top Level)
window.AddifectCore = window.AddifectCore || {
  version: '1.0.0',
  registry: {
    features: {}
  },
  registerProFeature: (name, config) => {
    window.AddifectCore.registry.features[name] = config;
    // Notify React Hooks that the registry changed.
    window.dispatchEvent(new CustomEvent('addifect_registry_updated'));
  }
};

function App() {
  const [userData, setUserData] = useState<{ name: string, url: string, capable?: '1' | '2' | '3' | '4' }>(
    { name: '', url: '', }
  ); // User's name and avatar URL
  const [editor, setEditor] = useState<null | { id?: string, type: string }>(null); // Current editor state (if any)
  const [edition, setEdition] = useState<AddifectEdition>('lite');

  useEffect(() => {
    // 2. SIGNAL READINESS
    // Now that React is mounting, tell addons they can start calling registerProFeature
    window.dispatchEvent(new CustomEvent('addifect_init'));
  }, []);

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const data = await getCurrentUserInfo();
        setUserData({
          name: data?.user_name || '',
          url: data?.user_avatar || '',
          capable: data?.signature
        })

      } catch (error) {
        console.error('Failed to fetch user info', error);
      }
    }

    fetchUserInfo();
  }, []);

  return <MantineProvider
    theme={{
      fontFamily: "'Poppins', sans-serif",
    }}
    defaultColorScheme="dark"
  >
    {
      editor && editor.type === 'block' ?
        <Suspense fallback={<FullScreenLoader variant="1" />}>
          <BlockEditor
            id={editor.id as string}
            edition={edition}
            setEdition={setEdition}
            back={() => setEditor(null)}
          />
        </Suspense>
        :
        <Home
          userData={userData}
          setEditor={setEditor}
          edition={edition}
          setEdition={setEdition}
        />
    }
    <Notifications
      position="top-right"
      zIndex={999}
      containerWidth={260} />
  </MantineProvider>
}

export default App;
