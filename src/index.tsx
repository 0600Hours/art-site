import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Page from './components/Page';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Contact from './routes/Contact';
import Portfolio from './routes/Portfolio';

export const navMap = [
  {
    path: '/',
    element: <Page content={<Portfolio />} selected='Portfolio'/>,
    name: 'Portfolio',
  },
  {
    path: '/contact',
    element: <Page content={<Contact />} selected='Contact Info'/>,
    name: 'Contact Info',
  }
]
const router = createHashRouter(navMap)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
