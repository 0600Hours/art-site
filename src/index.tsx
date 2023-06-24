import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider, useParams } from 'react-router-dom';
import Page from './components/Page';
import './index.css';
import Contact from './routes/Contact';
import Gallery from './routes/Gallery';
import SingleImage from './routes/SingleImage';
import { portfolioImages } from "./img/portfolio/all";
import { conventionImages } from "./img/convention/all";

export const navMap = [
  {
    path: '/',
    element: 
      <Page
        selected='Portfolio'
        content={
          <Gallery
            images={portfolioImages}
            folder='portfolio'
          />
        }
      />,
    name: 'Portfolio',
  },
  {
    path: '/convention',
    element:
      <Page
        selected='Convention'
        content={
          <Gallery
            images={conventionImages}
            folder='convention'
          />
        }
      />,
    name: 'Convention',
  },
  {
    path: '/contact',
    element:
      <Page
        selected='Contact Info'
        content={<Contact />}
      />,
    name: 'Contact Info',
  },
  {
    path: 'portfolio/image/:id',
    element: <Page
      content={
        <SingleImage
          images={portfolioImages}
          folder='portfolio'
        />
      }
    />,
    name: 'Image',
  },
  {
    path: 'convention/image/:id',
    element:
      <Page
        content={
          <SingleImage
          images={conventionImages}
          folder='convention'
        />
      }
    />,
    name: 'Image',
  }
]
const router = createHashRouter(navMap);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
