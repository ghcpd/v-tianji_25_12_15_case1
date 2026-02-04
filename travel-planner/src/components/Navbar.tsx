import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/destinations', label: 'Destinations' },
  { to: '/trips', label: 'Trips' },
  { to: '/favorites', label: 'Favorites' },
];

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex space-x-4">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end
            className={({ isActive }) =>
              isActive ? 'font-bold underline' : 'hover:underline'
            }
          >
            {l.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
