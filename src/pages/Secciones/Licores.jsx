import React, { useState } from "react"; // Importar React y useState para manejar el estado
import "../../styles/Secciones.css"; // Importar estilos específicos para la sección
import Carrito from "../../components/Carrito"; // Importar componente Carrito
import CarritoFlotante from "../../components/CarritoFlotante"; // Importar componente Carrito Flotante
import Header from "../../components/Header"; // Importar componente Header
import { useCarrito } from "../../context/CarritoContext"; // Importar contexto de carrito
import Alerta from "../../components/Alerta"; // Importar componente de Alerta

// Definición de productos disponibles en la sección de Licores
const productos = [
    { id: 45, nombre: "Aguardiente", descripcion: "Aguardiente, 750ml", precio: 31120, precioOriginal: 38900, descuento: "20", imagen: "../images/PRODUCTOS/Aguardiente.png" },
    { id: 26, nombre: "Ron Medellín", descripcion: "Ron añejo, 750ml", precio: 42500, imagen: "../images/PRODUCTOS/Ron Medellin.png" },
    { id: 27, nombre: "Whisky Old Parr", descripcion: "Whisky 12 años, 750ml", precio: 145900, imagen: "../images/PRODUCTOS/Whisky old parr.png" },
    { id: 28, nombre: "Vodka Absolut", descripcion: "Vodka original, 750ml", precio: 69900, imagen: "../images/PRODUCTOS/vodka absolute.png" },
    { id: 29, nombre: "Tequila José Cuervo", descripcion: "Tequila reposado, 750ml", precio: 89900, imagen: "../images/PRODUCTOS/tequila jose cuervo.png" },
    { id: 46, nombre: "Cerveza Club Colombia", descripcion: "Six pack, 330ml c/u", precio: 11340, precioOriginal: 18900, descuento: "40", imagen: "../images/PRODUCTOS/cerveza club colombia.png" },
    { id: 31, nombre: "Vino Casillero del Diablo", descripcion: "Cabernet Sauvignon, 750ml", precio: 49900, imagen: "../images/PRODUCTOS/vino casillero del diablo.png" },
    { id: 32, nombre: "Ginebra Bombay", descripcion: "Ginebra Sapphire, 750ml", precio: 129900, imagen: "../images/PRODUCTOS/Ginebra Bombay Sapphire.png" },
    { id: 33, nombre: "Champagne Moët", descripcion: "Brut Imperial, 750ml", precio: 289900, imagen: "../images/PRODUCTOS/champagne moet.png" },
    { id: 34, nombre: "Baileys", descripcion: "Crema de whisky, 750ml", precio: 79900, imagen: "../images/PRODUCTOS/Baileys.png" },
    { id: 35, nombre: "Jägermeister", descripcion: "Licor de hierbas, 700ml", precio: 89900, imagen: "../images/PRODUCTOS/jagermeister.png" },
    { id: 36, nombre: "Vino Santa Rita", descripcion: "Sauvignon Blanc, 750ml", precio: 45900, imagen: "../images/PRODUCTOS/vino santa rita.png" }
  ];

// Número de productos a mostrar por página
const ITEMS_PER_PAGE = 4;

const Licores = () => {
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
        <h1>Licores</h1>
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

export default Licores;
