import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Index from './Index.tsx';
import Links from './Links.tsx';
import Player from './Player.tsx';
import Game from './Game.tsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/links',
    element: <Links />,
  },
  {
    path: '/player/:base64',
    element: <Player />,
  },
  {
    path: '/game/:base64',
    element: <Game />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
