import React, { useState } from "react"; // Importar React y useState para manejar el estado
import "../../styles/Secciones.css"; // Importar estilos específicos para la sección
import Carrito from "../../components/Carrito"; // Importar componente Carrito
import CarritoFlotante from "../../components/CarritoFlotante"; // Importar componente Carrito Flotante
import Header from "../../components/Header"; // Importar componente Header
import { useCarrito } from "../../context/CarritoContext"; // Importar contexto de carrito
import Alerta from "../../components/Alerta"; // Importar componente de Alerta

// Definición de productos disponibles en la sección de Mascotas
const productos = [
    { id: 104, nombre: "Dog Chow Adulto", descripcion: "Alimento seco para perros, 2kg", precio: 16835, precioOriginal: 25900, descuento: "35", imagen: "../images/PRODUCTOS/dog chow adulto.png" },
    { id: 111, nombre: "Whiskas Adulto", descripcion: "Alimento seco para gatos, 1.5kg", precio: 11250, precioOriginal: 22500, descuento: "50", imagen: "../images/PRODUCTOS/whiskas adulto.png" },
    { id: 39, nombre: "Arena para Gatos", descripcion: "Arena sanitaria, 4kg", precio: 15900, imagen: "../images/PRODUCTOS/arena para gatos.png" },
    { id: 40, nombre: "Juguete para Perro", descripcion: "Pelota de goma resistente", precio: 12900, imagen: "../images/PRODUCTOS/juguete para perro.png" },
    { id: 41, nombre: "Collar para Perro", descripcion: "Collar ajustable, talla M", precio: 18900, imagen: "../images/PRODUCTOS/collar para perro.png" },
    { id: 42, nombre: "Cama para Mascota", descripcion: "Cama acolchada, tamaño mediano", precio: 45900, imagen: "../images/PRODUCTOS/cama para mascota.png" },
    { id: 43, nombre: "Plato para Mascota", descripcion: "Plato doble de acero inoxidable", precio: 19900, imagen: "../images/PRODUCTOS/plato para mascota.png" },
    { id: 44, nombre: "Shampoo para Mascota", descripcion: "Shampoo antipulgas, 500ml", precio: 16900, imagen: "../images/PRODUCTOS/shampoo para mascota.png" },
    { id: 45, nombre: "Rascador para Gato", descripcion: "Rascador con poste y juguete", precio: 35900, imagen: "../images/PRODUCTOS/rascador para gato.png" },
    { id: 46, nombre: "Peine para Mascota", descripcion: "Cepillo desenredante", precio: 14900, imagen: "../images/PRODUCTOS/peine para mascota.png" },
    { id: 47, nombre: "Snacks para Perro", descripcion: "Galletas premium, 250g", precio: 8900, imagen: "../images/PRODUCTOS/snacks para perro.png" },
    { id: 48, nombre: "Transportadora", descripcion: "Transportadora plástica, talla M", precio: 55900, imagen: "../images/PRODUCTOS/transportadora plastica.png" }
  ];

// Número de productos a mostrar por página
const ITEMS_PER_PAGE = 4;

const Mascotas = () => {
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
        <h1>Mascotas</h1>
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

export default Mascotas;
