import React from 'react';

function Profile({ userName }) {
  return (
    <div className="profile-container">
      <h2 className="profile-title">Bienvenido a Riftward: Guardians of Mithra, explorador {userName}!</h2>
      <div className="profile-content">
      </div>
    </div>
  );
}

export default Profile;
