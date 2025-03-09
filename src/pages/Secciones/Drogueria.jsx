import React, { useState } from "react"; // Importar React y useState para manejar el estado
import "../../styles/Secciones.css"; // Importar estilos específicos para la sección
import Carrito from "../../components/Carrito"; // Importar componente Carrito
import CarritoFlotante from "../../components/CarritoFlotante"; // Importar componente Carrito Flotante
import Header from "../../components/Header"; // Importar componente Header
import { useCarrito } from "../../context/CarritoContext"; // Importar contexto de carrito
import Alerta from "../../components/Alerta"; // Importar componente de Alerta

// Definición de productos disponibles en la sección de Drogueria
const productos = [
    { id: 105, nombre: "Acetaminofén", descripcion: "500mg, 10 tabletas", precio: 3540, precioOriginal: 5900, imagen: "../images/PRODUCTOS/acetaminofen.png", descuento: 40 },
    { id: 50, nombre: "Ibuprofeno", descripcion: "400mg, 10 tabletas", precio: 7500, imagen: "../images/PRODUCTOS/ibuprofeno.png" },
    { id: 51, nombre: "Vitamina C", descripcion: "1000mg, 30 tabletas", precio: 15900, imagen: "../images/PRODUCTOS/vitamina c.png" },
    { id: 52, nombre: "Alcohol Antiséptico", descripcion: "700ml", precio: 4900, imagen: "../images/PRODUCTOS/alcohol antiseptico.png" },
    { id: 53, nombre: "Curitas", descripcion: "Caja x 20 unidades", precio: 6900, imagen: "../images/PRODUCTOS/curitas.png" },
    { id: 54, nombre: "Algodón", descripcion: "Paquete 100g", precio: 3900, imagen: "../images/PRODUCTOS/algodon.png" },
    { id: 55, nombre: "Vendas Elásticas", descripcion: "10cm x 4m", precio: 8900, imagen: "../images/PRODUCTOS/vendas elasticas.png" },
    { id: 56, nombre: "Agua Oxigenada", descripcion: "500ml", precio: 3900, imagen: "../images/PRODUCTOS/agua oxigenada.png" },
    { id: 57, nombre: "Termómetro Digital", descripcion: "Medición rápida", precio: 12900, imagen: "../images/PRODUCTOS/termometro digital.png" },
    { id: 58, nombre: "Suero Oral", descripcion: "Sobre x 5 unidades", precio: 9900, imagen: "../images/PRODUCTOS/suero oral.png" },
    { id: 59, nombre: "Gasas Estériles", descripcion: "Paquete x 10 unidades", precio: 5900, imagen: "../images/PRODUCTOS/gasas esteriles.png" },
    { id: 60, nombre: "Omeprazol", descripcion: "20mg, 14 cápsulas", precio: 8900, imagen: "../images/PRODUCTOS/omeprazol.png" }
  ];
// Número de productos a mostrar por página
const ITEMS_PER_PAGE = 4;

const Drogueria = () => {
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
        <h1>Droguería</h1>
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

export default Drogueria;
