import React from "react"; // Importar React
import "../styles/Secciones.css"; // Importar estilos específicos para secciones
import "../styles/Cliente.css"; // Importar estilos específicos para la página del cliente
import Carrito from "../components/Carrito"; // Importar componente Carrito
import CarritoFlotante from "../components/CarritoFlotante"; // Importar componente Carrito Flotante
import { useCarrito } from "../context/CarritoContext"; // Importar contexto de carrito para manejar el estado del carrito
import Header from "../components/Header"; // Importar componente Header

// Definición de productos en promoción
const productos = [
  { id: 1, nombre: "Leche Entera", descripcion: "Leche entera pasteurizada, 1 litro", precio: 2625, precioOriginal: 3500, descuento: 25, imagen: "../images/PRODUCTOS/LECHE ENTERA.png" },
  { id: 13, nombre: "Manzana Roja", descripcion: "Manzana roja fresca, 500g", precio: 3850, precioOriginal: 5500, descuento: "30", imagen: "../images/PRODUCTOS/Manzana roja.png" },
  { id: 45, nombre: "Aguardiente", descripcion: "Aguardiente, 750ml", precio: 31120, precioOriginal: 38900, descuento: "20", imagen: "../images/PRODUCTOS/Aguardiente.png" },
  { id: 104, nombre: "Dog Chow Adulto", descripcion: "Alimento seco para perros, 2kg", precio: 16835, precioOriginal: 25900, descuento: "35", imagen: "../images/PRODUCTOS/dog chow adulto.png" },
  { id: 105, nombre: "Acetaminofén", descripcion: "500mg, 10 tabletas", precio: 3540, precioOriginal: 5900, imagen: "../images/PRODUCTOS/acetaminofen.png", descuento: 40 },
  { id: 108, nombre: "Jabón en Polvo", descripcion: "Detergente en polvo, 3kg", precio: 14175, precioOriginal: 18900, descuento: 25, imagen: "../images/PRODUCTOS/jabon en polvo.png" },
  { id: 73, nombre: "Pan Francés", descripcion: "Pan recién horneado, 6 unidades", precio: 2730, precioOriginal: 3900, imagen: "../images/PRODUCTOS/pan frances.png", descuento: 30 },
  { id: 89, nombre: "Arroz Diana", descripcion: "Arroz blanco, 1000g", precio: 3920, precioOriginal: 4900, descuento: 20, imagen: "../images/PRODUCTOS/arroz diana.png" },
  { id: 90, nombre: "Pasta Doria", descripcion: "Espagueti, 500g", precio: 2145, precioOriginal: 3900, descuento: 45, imagen: "../images/PRODUCTOS/pasta doria.png" },
  { id: 110, nombre: "Papel Higiénico", descripcion: "Pack x12 rollos", precio: 10335, precioOriginal: 15900, descuento: 35, imagen: "../images/PRODUCTOS/papel higienico.png" },
  { id: 111, nombre: "Whiskas Adulto", descripcion: "Alimento seco para gatos, 1.5kg", precio: 11250, precioOriginal: 22500, descuento: "50", imagen: "../images/PRODUCTOS/whiskas adulto.png" },
  { id: 46, nombre: "Cerveza Club Colombia", descripcion: "Six pack, 330ml c/u", precio: 11340, precioOriginal: 18900, descuento: "40", imagen: "../images/PRODUCTOS/cerveza club colombia.png" },
];

// Componente principal de Promociones
const Promociones = () => {
  const { agregarAlCarrito } = useCarrito(); // Obtener la función para agregar productos al carrito desde el contexto

  return (
    <div className="app-container">
      <Header /> 

      {/* Contenedor principal de productos */}
      <main className="productos-container"> 
        <h1>Promociones</h1> 
        <div className="productos-grid"> 
          {productos.map((producto) => ( 
            <div className="producto-card" key={producto.id}> 
              {producto.descuento && <div className="descuento-badge">-{producto.descuento}%</div>} {/* Mostrar descuento si existe */}
              <img src={producto.imagen} alt={producto.nombre} /> 
              <h3>{producto.nombre}</h3> 
              <p className="descripcion">{producto.descripcion}</p> 
              {producto.precioOriginal && <p className="precio-original">${producto.precioOriginal}</p>} {/* Precio original si existe */}
              <p className="precio">${producto.precio}</p> {/* Precio actual */}
              <button 
                className="agregar-carrito" 
                onClick={() => agregarAlCarrito(producto)} // Manejar clic en el botón para agregar al carrito
              >
                Agregar al Carrito
              </button>
            </div>
          ))}
        </div>
      </main>

      <CarritoFlotante /> {/* Renderizar el carrito flotante */}
      <Carrito /> {/* Renderizar el carrito */}
    </div>
  );
};

export default Promociones; 