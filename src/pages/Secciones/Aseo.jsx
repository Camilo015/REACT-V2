import React, { useState } from "react";// Importar React y useState para manejar el estado
import "../../styles/Secciones.css";// Importar estilos específicos para la sección de Aseo
import Carrito from "../../components/Carrito";// Importar componente Carrito
import CarritoFlotante from "../../components/CarritoFlotante"; // Importar componente Carrito Flotante
import Header from "../../components/Header"; // Importar componente Header
import { useCarrito } from "../../context/CarritoContext";
import Alerta from "../../components/Alerta"; // Importar componente de Alerta para mostrar mensajes

// Definición de productos disponibles en la sección de Aseo
const productos = [
    { id: 108, nombre: "Jabón en Polvo", descripcion: "Detergente en polvo, 3kg", precio: 14175, precioOriginal: 18900, descuento: 25, imagen: "../images/PRODUCTOS/jabon en polvo.png" },
    { id: 62, nombre: "Suavizante", descripcion: "Suavizante para ropa, 1L", precio: 12500, imagen: "../images/PRODUCTOS/suavizante.png" },
    { id: 63, nombre: "Blanqueador", descripcion: "Blanqueador desinfectante, 2L", precio: 8900, imagen: "../images/PRODUCTOS/blancox.png" },
    { id: 64, nombre: "Limpia Pisos", descripcion: "Limpiador multiusos, 1L", precio: 7900, imagen: "../images/PRODUCTOS/fabuloso.png" },
    { id: 65, nombre: "Jabón de Baño", descripcion: "Pack x3 unidades", precio: 9900, imagen: "../images/PRODUCTOS/protex.png" },
    { id: 110, nombre: "Papel Higiénico", descripcion: "Pack x12 rollos", precio: 10335, precioOriginal: 15900, descuento: 35, imagen: "../images/PRODUCTOS/papel higienico.png" },
    { id: 67, nombre: "Limpiavidrios", descripcion: "Spray limpiador, 500ml", precio: 6900, imagen: "../images/PRODUCTOS/limpiavidrios.png" },
    { id: 68, nombre: "Esponja Multiusos", descripcion: "Pack x3 unidades", precio: 4900, imagen: "../images/PRODUCTOS/esponja multiusos.png" },
    { id: 69, nombre: "Escoba", descripcion: "Escoba con mango", precio: 12900, imagen: "../images/PRODUCTOS/escoba.png" },
    { id: 70, nombre: "Trapero", descripcion: "Trapero con mango", precio: 14900, imagen: "../images/PRODUCTOS/trapero.png" },
    { id: 71, nombre: "Guantes de Aseo", descripcion: "Guantes de caucho, talla M", precio: 5900, imagen: "../images/PRODUCTOS/guantes de aseo.png" },
    { id: 72, nombre: "Recogedor", descripcion: "Recogedor con mango", precio: 8900, imagen: "../images/PRODUCTOS/recogedor.png" }
  ];
// Número de productos a mostrar por página
const ITEMS_PER_PAGE = 4;

const Aseo = () => {
  const { agregarAlCarrito } = useCarrito(); // Obtener la función para agregar productos al carrito desde el contexto
  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
  const [mensaje, setMensaje] = useState(''); // Estado para el mensaje de alerta

  // Calcular el índice de inicio y fin de los productos a mostrar
  const indexOfLastProduct = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - ITEMS_PER_PAGE;
  const currentProducts = productos.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(productos.length / ITEMS_PER_PAGE);

    // Función para manejar la adición de un producto al carrito
  const handleAgregarAlCarrito = (producto) => {
    agregarAlCarrito(producto);
    setMensaje('Producto añadido al carrito');
    setTimeout(() => {
      setMensaje('');
    }, 4000);
  };

  return (
    <div className="app-container">
      <Header />
      <Alerta mensaje={mensaje} onClose={() => setMensaje('')} />{/* Mostrar alerta si hay un mensaje */}

      {/* Contenedor principal de productos */}
      <main className="productos-container">
        <h1>Aseo</h1>
        <div className="productos-grid">
          {currentProducts.map((producto) => (
            <div className="producto-card" key={producto.id}>
              {producto.descuento && <div className="descuento-badge">-{producto.descuento}%</div>}
              <img src={producto.imagen} alt={producto.nombre} />
              <h3>{producto.nombre}</h3>
              <p className="descripcion">{producto.descripcion}</p>
              {producto.precioOriginal && <p className="precio-original">${producto.precioOriginal}</p>}
              <p className="precio">${producto.precio}</p>
              <button 
                className="agregar-carrito" 
                onClick={() => handleAgregarAlCarrito(producto)}
              >
                Agregar al Carrito
              </button>
            </div>
          ))}
        </div>

        {/* Paginación */}
        <div className="pagination">
          <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Anterior</button>
          <span>Página {currentPage} de {totalPages}</span>
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Siguiente</button>
        </div>
      </main>

      <CarritoFlotante />{/* Renderizar el carrito flotante */}
      <Carrito />{/* Renderizar el carrito */}
    </div>
  );
};

export default Aseo;
