import React, { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FullScreenLoader from './FullScreenLoader';

const App = lazy(() => import('./App'));
const Surface = lazy(() => import('./RenderEngine/Surface'));

// Webpack public path (prod only)
if (process.env.NODE_ENV === 'production') {
  // @ts-ignore
  __webpack_public_path__ = window.addifectStudio.path || '/';
}


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={''}>
        <App />
      </Suspense>
    ),
    errorElement: <div>404 error here</div>,
  },
  {
    path: "/site-canvas",
    element: (
      <Suspense fallback={<FullScreenLoader variant='1' />}>
        <Surface renderType="EPR" />
      </Suspense>
    ),
  },
  {
    path: "/__addifect/studio/",
    element: (
      <Suspense fallback={''}>
        <App />
      </Suspense>
    ),
    errorElement: <div>404 error</div>,
  },
  {
    path: "/__addifect/studio/site-canvas/",
    element: (
      <Suspense fallback={<FullScreenLoader variant='1' />}>
        <Surface renderType="EPR" />
      </Suspense>
    ),
    errorElement: <div>404 error</div>,
  },
]);

let container = document.getElementById("addifect-studio-root");

if (!container) {
  container = document.createElement("div");
  container.id = "addifect-studio-root";
  document.body.appendChild(container);
}

const root = createRoot(container);

root.render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
