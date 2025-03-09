import React, { useState } from "react";// Importar React y useState para manejar el estado
import "../../styles/Secciones.css";// Importar estilos específicos para la sección
import Carrito from "../../components/Carrito";// Importar componente Carrito
import CarritoFlotante from "../../components/CarritoFlotante";// Importar componente Carrito Flotante
import Header from "../../components/Header";// Importar componente Header
import { useCarrito } from "../../context/CarritoContext";// Importar contexto de carrito
import Alerta from "../../components/Alerta";// Importar componente de Alerta

// Definición de productos disponibles en la sección de Abarrotes
const productos = [
  { id: 89, nombre: "Arroz Diana", descripcion: "Arroz blanco, 1000g", precio: 3920, precioOriginal: 4900, descuento: 20, imagen: "../images/PRODUCTOS/arroz diana.png" },
  { id: 86, nombre: "Aceite Girasol", descripcion: "Aceite vegetal, 1L", precio: 12500, imagen: "../images/PRODUCTOS/aceite girasol.png" },
  { id: 87, nombre: "Azúcar Manuelita", descripcion: "Azúcar refinada, 1kg", precio: 5900, imagen: "../images/PRODUCTOS/azucar manuelita.png" },
  { id: 88, nombre: "Frijoles", descripcion: "Frijoles rojos, 500g", precio: 7900, imagen: "../images/PRODUCTOS/frijoles.png" },
  { id: 89, nombre: "Lentejas", descripcion: "Lentejas, 500g", precio: 4900, imagen: "../images/PRODUCTOS/lentejas.png" },
  { id: 90, nombre: "Pasta Doria", descripcion: "Espagueti, 500g", precio: 2145, precioOriginal: 3900, descuento: 45, imagen: "../images/PRODUCTOS/pasta doria.png" },
  { id: 91, nombre: "Sal Refisal", descripcion: "Sal refinada, 1kg", precio: 2900, imagen: "../images/PRODUCTOS/sal refisal.png" },
  { id: 92, nombre: "Atún Van Camps", descripcion: "Atún en agua, 170g", precio: 6900, imagen: "../images/PRODUCTOS/atun van camps.png" },
  { id: 93, nombre: "Café Sello Rojo", descripcion: "Café molido, 500g", precio: 15900, imagen: "../images/PRODUCTOS/cafe sello rojo.png" },
  { id: 94, nombre: "Chocolate Corona", descripcion: "Chocolate de mesa, 500g", precio: 8900, imagen: "../images/PRODUCTOS/chocolate corona.png" },
  { id: 95, nombre: "Panela", descripcion: "Panela tradicional, 1kg", precio: 4900, imagen: "../images/PRODUCTOS/panela.png" },
  { id: 96, nombre: "Sardinas Van Camps", descripcion: "En salsa de tomate, 425g", precio: 7900, imagen: "../images/PRODUCTOS/sardinas van camps.png" },
];
// Número de productos a mostrar por página
const ITEMS_PER_PAGE = 4; // Número de productos por página

const Abarrotes = () => {
  const { agregarAlCarrito } = useCarrito();// Obtener la función para agregar productos al carrito desde el contexto
  const [currentPage, setCurrentPage] = useState(1);// Estado para la página actual
  const [mensaje, setMensaje] = useState('');// Estado para el mensaje de alerta

  // Calcular el índice de inicio y fin de los productos a mostrar
  const indexOfLastProduct = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - ITEMS_PER_PAGE;
  const currentProducts = productos.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(productos.length / ITEMS_PER_PAGE);

  // Función para manejar la adición de un producto al carrito
  const handleAgregarAlCarrito = (producto) => {
    agregarAlCarrito(producto);
    setMensaje('Producto añadido al carrito'); // Establecer el mensaje de alerta
    setTimeout(() => {
      setMensaje('');
    }, 4000);
  };

  return (
    <div className="app-container">
      <Header />
      <Alerta mensaje={mensaje} onClose={() => setMensaje('')} /> {/* Mostrar alerta si hay un mensaje */}

      {/* Contenedor principal de productos */}
      <main className="productos-container">
        <h1>Abarrotes</h1>
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
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span>Página {currentPage} de {totalPages}</span>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>

        {/* Mensaje de alerta en la parte inferior derecha */}
        {mensaje && (
          <div className="alerta">
            {mensaje}
            <button className="cerrar-alerta" onClick={() => setMensaje('')}>×</button>
          </div>
        )}
      </main>

      <CarritoFlotante />{/* Renderizar el carrito flotante */}
      <Carrito />{/* Renderizar el carrito */}
    </div>
  );
};

export default Abarrotes;
