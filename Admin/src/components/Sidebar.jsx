import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
      <aside className="max-w-64 bg-blue-950  p-4 hidden md:block   ">
        <nav className="space-y-2 text-white">
          <Link to={''} className="block w-full text-white  px-4 py-2 hover:  font-medium">Joyida xal qilinadigan murojaatlar</Link>
          <Link to={''} className="block w-full text-white px-4 py-2 rounded hover: font-medium">Ariza qoldiriladigan murojaatlar</Link>
          <Link to={'arizalar'} className="block w-full text-white  px-4 py-2 rounded hover: font-medium">Arizalar</Link>
          <Link to={'hodimqoshish'} className="block w-full text-white px-4 py-2 rounded hover: font-medium">Hodim qo'shish</Link>

          <Link to={'xizmatlar'} className="block w-full text-white px-4 py-2 rounded hover: font-medium">Xizmatlar</Link>
          <div>
           <img src="" alt="" />
          <Link to={'statistika'} className="block w-full text-white  px-4 py-2 rounded hover: font-medium">Statistika</Link>
          </div>
        </nav>
      </aside>
    );
  };
  export default Sidebar;
