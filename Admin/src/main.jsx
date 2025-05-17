// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Main from './components/Main.jsx';
import Jariza from './components/Jariza.jsx';
import Hodimqoshish from './Pages/Hodimqoshish.jsx';
import Xizmatlar from './Pages/Xizmatlar.jsx';
import StatsChart from './components/countByStatus.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Main /> },
      { path: 'arizalar', element: <Jariza /> },
      { path: 'hodimqoshish', element: <Hodimqoshish /> },
      { path: 'statistika', element: <StatsChart /> },
      { path: 'xizmatlar', element: <Xizmatlar /> },
    ]
  },
  { path: '/register', element: <Register /> },
  { path: '/login', element: <Login /> }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
