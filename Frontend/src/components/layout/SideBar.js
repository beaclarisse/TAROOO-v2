import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <div className="hamburger-icon" onClick={toggleSidebar}>
        <MenuIcon fontSize="large" />
      </div>

      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        {isSidebarOpen && (
          <ul>
            <li>
              <Link to="/saved-posts">Saved Posts</Link>
            </li>
            <li>
              <Link to="/liked-posts">Liked Posts</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
