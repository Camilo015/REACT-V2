import React, { useEffect, useRef } from 'react'; // Importar React, useEffect y useRef
import '../styles/Secciones.css'; // Importar estilos específicos para el encabezado
import { usePerfil } from '../context/PerfilContext'; // Importar el contexto de perfil

import {getAuth, signOut} from 'firebase/auth';
import {appFirebase} from '../credenciales';
const auth = getAuth(appFirebase);

// Componente Header que representa la barra de navegación superior
const Header = () => {
  const { perfilMenuActivo, togglePerfilMenu, cerrarMenu } = usePerfil(); // Obtener estado y funciones del contexto de perfil
  const menuRef = useRef(); // Referencia para el menú de perfil

  // Efecto para cerrar el menú de perfil al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        cerrarMenu(); // Cerrar el menú si se hace clic fuera
      }
    };

    document.addEventListener('mousedown', handleClickOutside); // Agregar el evento de clic
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Limpiar el evento al desmontar
    };
  }, [cerrarMenu]);

  return (
    <>
      <header className="header"> 
        <div className="logo"> 
          <img src="../LOGO SENA.png" width="200" height="70" alt="Logo" /> 
        </div>
        <nav ref={menuRef}> {/* Contenedor de navegación */}
          <button className="perfil" onClick={togglePerfilMenu}>PERFIL</button> {/* Botón para mostrar/ocultar el menú de perfil */}
          <div className={`perfil-dropdown ${perfilMenuActivo ? 'active' : ''}`}> {/* Menú desplegable de perfil */}
            <ul>
              <li><a href="/" onClick={() => signOut(auth)}>Cerrar sesion</a></li> 
            </ul>
          </div>
        </nav>
        <div className="search-container"> 
          <input type="text" placeholder="¿Qué estás buscando?" className="search-box" /> 
          <button className="search-btn">🔍</button> 
        </div>
      </header>

      <nav className="navbar"> 
        <ul className="menu"> 
          <li><a href="/Inicio">INICIO</a></li> 
          <li><a href="/Categorias">CATEGORÍAS</a></li> 
          <li><a href="/Promociones">PROMOCIONES</a></li> 
          <li><a href="/Servicios">SERVICIOS</a></li> 
          <li><a href="/Soporte">SOPORTE</a></li> 
        </ul>
      </nav>
    </>
  );
};

export default Header; 