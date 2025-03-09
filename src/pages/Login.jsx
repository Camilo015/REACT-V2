import React, { useState } from "react";
import "../styles/style.css";
import { useNavigate } from 'react-router-dom';
import { IoPersonOutline, IoKeyOutline, IoCloseCircleOutline } from "react-icons/io5";
import { appFirebase } from '../credenciales';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth(appFirebase);

const LoginPage = () => {

  const [registrando, setRegistrando] = useState(false);
  const navigate = useNavigate();

  // Función para el registro de usuarios
  const handleRegister = async (e) => {
    e.preventDefault();

    const correo = e.target.emailRegister.value;
    const contraseña = e.target.passwordRegister.value;

    try {
      await createUserWithEmailAndPassword(auth, correo, contraseña);
      alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
      navigate('/');  // Redirige correctamente a la página del Login
    } catch (error) {
      console.error("Error en el registro:", error.message);
      alert("Error en el registro: " + error.message);
    }
  };

  // Función para el inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault();

    const correo = e.target.emailLogin.value;
    const contraseña = e.target.passwordLogin.value;

    try {
      await signInWithEmailAndPassword(auth, correo, contraseña);
      navigate('/Cliente'); 
    } catch (error) {
      alert("El correo o la contraseña son incorrectos");
    }
  };

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isPopupActive, setIsPopupActive] = useState(false);

  const handleOpenLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
    setIsPopupActive(true);
  };

  const handleOpenRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
    setRegistrando(true); // Activar modo registro
  };

  const handleClosePopup = () => {
    setIsPopupActive(false);
    setTimeout(() => {
      setShowLogin(false);
      setShowRegister(false);
    }, 400);
  };

  return (
    <div>
      <header>
        <h2 className="logo">
          <img src="../LOGO SENA.png" width="200" height="70" alt="Logo SENA" />
        </h2>

        <div className="nav-buttons">
          <nav className="navigation">
            <button className="btnLogin-popup" onClick={handleOpenLogin}>LOGIN</button>
          </nav>
        </div>
      </header>

      <div className={`wrapper ${isPopupActive ? "active-popup" : ""}`} style={{ transform: isPopupActive ? "scale(1)" : "scale(0)" }}>
        <span className="icon-close" onClick={handleClosePopup}>
          <IoCloseCircleOutline />
        </span>

        {/* Formulario de Login */}
        {showLogin && (
          <div className="form-box login active">
            <h2>Ingreso</h2>
            <form onSubmit={handleLogin}>
              <div className="input-box">
                <span className="icon"><IoPersonOutline /></span>
                <input type="text" required name="emailLogin" id="emailLogin" />
                <label>Usuario</label>
              </div>

              <div className="input-box">
                <span className="icon"><IoKeyOutline /></span>
                <input type="password" required name="passwordLogin" id="passwordLogin" />
                <label>Contraseña</label>
              </div>

              <div className="Guardar-Datos">
                <label>
                  <input type="checkbox" /> Guardar Datos
                </label>
                <a href="#">Restablecer contraseña</a>
              </div>

              <button type="submit" className="btn">Ingresar</button>

              <div className="Ingreso-Registro">
                <p>No tienes una cuenta? <a href="#" className="Link-de-registro" onClick={handleOpenRegister}>Registrarse</a></p>
              </div>
            </form>
          </div>
        )}

        {/* Formulario de Registro */}
        {showRegister && (
          <div className="form-box register active">
            <h2>Registro</h2>
            <form onSubmit={handleRegister}>
              <div className="input-box">
                <span className="icon"><IoPersonOutline /></span>
                <input type="text" required name="emailRegister" id="emailRegister" />
                <label>Correo</label>
              </div>

              <div className="input-box">
                <span className="icon"><IoKeyOutline /></span>
                <input type="password" required name="passwordRegister" id="passwordRegister" />
                <label>Contraseña</label>
              </div>

              <div className="Guardar-Datos">
                <label>
                  <input type="checkbox" /> Aceptar términos y condiciones
                </label>
              </div>

              <button type="submit" className="btn">Registrarse</button>

              <div className="Ingreso-Registro">
                <p>Ya tienes una cuenta? <a href="#" className="Link-de-ingreso" onClick={handleOpenLogin}>Ingresar</a></p>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Enlaces a otras páginas */}
      <a href="1-Administrador/Administrador.html">
        <img src="ADMINISTRADOR LOGIN.png" alt="Administrador" className="LogoAdmin" />
      </a>

      <a href="2-Personal de supermercado/personaldesupermercado.html">
        <img src="PERSONAL LOGIN.png" alt="Personal de supermercado" className="LogoPersonal" />
      </a>
    </div>
  );
};

export default LoginPage;

