// App.jsx
import React from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="flex flex-col bg-base-100 min-h-screen">
      <Navbar />
      <main className="flex flex-1">
        <Sidebar />
        <div className="p-4 w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default App;
