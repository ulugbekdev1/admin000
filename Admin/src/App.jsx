import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';
import Jariza from './components/Jariza';
import {Routes, Route} from 'react-router-dom'
import {Main, Register, Login} from './components'
import Navbar from './components/Navbar'


function App() {
  const [requests, setRequests] = useState([]);

  

  return (
    <div className=" flex flex-col bg-base-100 min-h-screen">
  <Navbar />
  <Routes>
      <Route path='/' element={<Main />}/>
      <Route path='/Login' element={<Login />}/>
      <Route path='/Register' element={<Register />}/>
    </Routes>
  <main className="flex flex-1">
    <Sidebar />

    <div className="p-4 w-full">
      <Outlet />
      <h2 className="text-lg font-semibold"></h2>
      <ul>
        {requests.map((request) => (
          <li key={request.id} className="mb-2">
            <strong>{request.type}</strong> {request.description}
          </li>
        ))}
      </ul>
    </div>
  </main>
</div>

  );
}

export default App;
