import { NavLink, Outlet } from 'react-router-dom';

export default function AppShell() {
  // A helper function to style active links differently
  const getLinkStyle = ({ isActive }) => ({
    color: isActive ? '#646cff' : '#aaaaaa',
    textDecoration: 'none',
    fontWeight: isActive ? 'bold' : 'normal',
    display: 'block',
    padding: '10px 0'
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#1a1a1a', color: 'white' }}>
      
      {/* Sidebar Navigation */}
      <nav style={{ width: '250px', padding: '20px', borderRight: '1px solid #333' }}>
        <h2>Support Desk</h2>
        <ul style={{ listStyle: 'none', padding: 0, marginTop: '30px' }}>
          <li>
            <NavLink to="/app/dashboard" style={getLinkStyle}>
              📊 Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/app/tickets" style={getLinkStyle}>
              🎫 Tickets
            </NavLink>
          </li>
          <li>
            <NavLink to="/app/reports" style={getLinkStyle}>
              📈 Reports
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '20px' }}>
        {/* The Outlet is the magic hole where Dashboard, Tickets, or Reports will render */}
        <Outlet />
      </main>

    </div>
  );
}