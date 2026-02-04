import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      <nav>
        <div className="container">
          <h1>Travel Planner</h1>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/destinations">Destinations</Link>
            <Link to="/trips">Trips</Link>
            <Link to="/favorites">Favorites</Link>
          </div>
        </div>
      </nav>
      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;