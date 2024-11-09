import React from 'react';

const UserProfile = () => {
  return (
    <div className="user-profile">
      <h2>Profil uživatele</h2>
      <div className="profile-info">
        <img src="https://via.placeholder.com/150" alt="Profilový obrázek" className="profile-image" />
        <div className="profile-details">
          <h3>Jan Novák</h3>
          <p>Email: jan.novak@example.com</p>
          <p>Člen od: 1. ledna 2023</p>
          <p>Počet mincí ve sbírce: 42</p>
        </div>
      </div>
      <div className="profile-actions">
        <button className="edit-profile-button">Upravit profil</button>
        <button className="change-password-button">Změnit heslo</button>
      </div>
    </div>
  );
};

export default UserProfile;