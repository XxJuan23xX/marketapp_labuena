import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext'; // Asegúrate de que esta ruta sea correcta
import './UserProfile.css';
import { FaArrowLeft } from 'react-icons/fa';

const UserProfile = () => {
  const { userRole, logout } = useContext(AuthContext);
  const [avatar, setAvatar] = useState('/uploads/avatar-default.webp'); // Ruta por defecto
  const [selectedFile, setSelectedFile] = useState(null);

  // Petición GET para obtener el avatar actual del usuario desde el backend
  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/avatar', { credentials: 'include' });
        const data = await response.json();
        if (data.avatar) setAvatar(data.avatar); // Si hay avatar, lo asigna; si no, queda el default
      } catch (error) {
        console.error('Error al obtener el avatar:', error);
      }
    };
    fetchAvatar();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleAvatarUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('avatar', selectedFile);

      try {
        const response = await fetch('http://localhost:5000/api/users/avatar', {
          method: 'PUT',
          body: formData,
          credentials: 'include',
        });
        const data = await response.json();
        if (data.user && data.user.avatar) setAvatar(data.user.avatar);
        alert('Avatar actualizado exitosamente');
      } catch (error) {
        console.error('Error al subir el avatar:', error);
        alert('Error al actualizar el avatar');
      }
    }
  };

  return (
    <div className="user-profile-container">
      <div className="back-button" onClick={() => (window.location.href = '/')}>
        <FaArrowLeft /> Volver a Home
      </div>
      <h2>Mi Cuenta</h2>
      <div className="profile-content">
        <div className="profile-sidebar">
          <div className="avatar-section">
            <img src={avatar} alt="User Avatar" className="avatar-image" />
            <input type="file" id="fileUpload" onChange={handleFileChange} style={{ display: 'none' }} />
            <button onClick={() => document.getElementById('fileUpload').click()} className="upload-button">
              Cambiar Avatar
            </button>
          </div>
          <div className="user-info">
            <h3>Juan Manuel</h3>
            <p>{userRole === 'admin' ? 'Admin' : 'Cliente'}</p>
          </div>
          <ul className="menu">
            <li><a href="#personal-info">Información Personal</a></li>
            <li><a href="#settings">Configuración de Seguridad</a></li>
            <li><a href="#" onClick={logout}>Cerrar Sesión</a></li>
          </ul>
        </div>
        <div className="profile-main">
          <h3>Actualizar Avatar</h3>
          <div className="upload-preview">
            {selectedFile ? (
              <img src={URL.createObjectURL(selectedFile)} alt="Preview" className="preview-image" />
            ) : (
              <p>No se ha seleccionado archivo.</p>
            )}
          </div>
          <button onClick={handleAvatarUpload} className="save-button">Guardar Avatar</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;