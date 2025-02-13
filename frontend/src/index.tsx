import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import App from './App.tsx';
import React from 'react';

const root = createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

