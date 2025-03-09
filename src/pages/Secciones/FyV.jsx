import React, { useState } from "react"; // Importar React y useState para manejar el estado
import "../../styles/Secciones.css"; // Importar estilos específicos para la sección
import Carrito from "../../components/Carrito"; // Importar componente Carrito
import CarritoFlotante from "../../components/CarritoFlotante"; // Importar componente Carrito Flotante
import Header from "../../components/Header"; // Importar componente Header
import { useCarrito } from "../../context/CarritoContext"; // Importar contexto de carrito
import Alerta from "../../components/Alerta"; // Importar componente de Alerta

// Definición de productos disponibles en la sección de Frutas y Verduras
const productos = [
    { id: 13, nombre: "Manzana Roja", descripcion: "Manzana roja fresca, 500g", precio: 3850, precioOriginal: 5500, descuento: "30", imagen: "../images/PRODUCTOS/Manzana roja.png" },
    { id: 14, nombre: "Plátano", descripcion: "Plátano maduro, 1kg", precio: 3200, imagen: "../images/PRODUCTOS/platano.png" },
    { id: 15, nombre: "Tomate", descripcion: "Tomate chonto fresco, 1kg", precio: 4800, imagen: "../images/PRODUCTOS/tomate.png" },
    { id: 16, nombre: "Cebolla Cabezona", descripcion: "Cebolla cabezona blanca, 1kg", precio: 3900, imagen: "../images/PRODUCTOS/cebolla cabezona.png" },
    { id: 17, nombre: "Papa Pastusa", descripcion: "Papa pastusa seleccionada, 1kg", precio: 2800, imagen: "../images/PRODUCTOS/papa pastusa.png" },
    { id: 18, nombre: "Zanahoria", descripcion: "Zanahoria fresca, 1kg", precio: 2500, imagen: "../images/PRODUCTOS/zanahoria.png" },
    { id: 19, nombre: "Naranja Valencia", descripcion: "Naranja valencia jugosa, 1kg", precio: 3600, imagen: "../images/PRODUCTOS/naranja.png" },
    { id: 20, nombre: "Pera", descripcion: "Pera importada, 1kg", precio: 6200, imagen: "../images/PRODUCTOS/pera.png" },
    { id: 21, nombre: "Lechuga Crespa", descripcion: "Lechuga crespa verde, unidad", precio: 2900, imagen: "../images/PRODUCTOS/lechuga.png" },
    { id: 22, nombre: "Aguacate Hass", descripcion: "Aguacate hass maduro, unidad", precio: 4500, imagen: "../images/PRODUCTOS/aguacate.png" },
    { id: 23, nombre: "Limón Tahití", descripcion: "Limón tahití fresco, 500g", precio: 2300, imagen: "../images/PRODUCTOS/limon.png" },
    { id: 24, nombre: "Piña Gold", descripcion: "Piña gold dulce, unidad", precio: 5900, imagen: "../images/PRODUCTOS/piña.png" }
  ];
// Número de productos a mostrar por página
const ITEMS_PER_PAGE = 4;

const FyV = () => {
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
        <h1>Frutas y Verduras</h1>
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

export default FyV;
