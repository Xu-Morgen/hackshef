import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './home';
import HelloPage from './title';
const router = createBrowserRouter([
  {
    path: "/:id",
    element: <App></App>,
  },
  {
    path: "/home/:id",
    element: <Home></Home>,
  },
  {
    path: "/hello",
    element: <HelloPage />
  }
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


