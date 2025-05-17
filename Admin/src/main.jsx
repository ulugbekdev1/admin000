import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// import Statistika from './Pages/Statistika.jsx';
import Hodimqoshish from './Pages/Hodimqoshish.jsx';
import Xizmatlar from './Pages/Xizmatlar.jsx';
import Jariza from './components/Jariza.jsx';
import StatsChart from './components/countByStatus.jsx'

const router = createBrowserRouter([
  {
    path : '/',
    element : <App/>,
    children: [
      {
       path: 'arizalar',
       element: <Jariza/>
      },
      // {
      //   path: 'statistika',
      //   element : <Statistika/>
      // },
      {
        path: 'hodimqoshish',
        element: <Hodimqoshish/>
      },
      {
        path: 'statistika',
        element: <StatsChart/>
      },
      {
        path: 'xizmatlar',
        element: <Xizmatlar/>
      },
    
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
