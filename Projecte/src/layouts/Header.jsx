import React from 'react';

function Header({ userName, onLogout }) {
  return (
    <header>
      <nav>
        <ul>
          <li>Welcome, {userName}</li>
          <li><button onClick={onLogout}>Logout</button></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
