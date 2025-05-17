import { Link, NavLink } from 'react-router-dom'
const Navbar = () => (
  <div className="navbar bg-base-200 shadow-sm   ">
  <div className="flex-1">
    <div className="flex items-center gap-2 font-medium pl-4">
    <img className="w-10" src="https://lms.tuit.uz/assets/images/logo-md.png" alt="" />
    <span>Student Admissions Department</span>
    </div>
  </div>
  <div className="flex">
   
    <div className="dropdown dropdown-end flex gap-4">
      <img className="w-6" src="https://www.svgrepo.com/show/31480/notification-bell.svg" alt="" />
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar" >
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <NavLink to={'/register'}>
        <li>Register</li>
        </NavLink>
        <NavLink to={'/login'}>
        <li>Login</li>
        </NavLink>
      </ul>
    </div>
  </div>
</div>
);

export default Navbar;
