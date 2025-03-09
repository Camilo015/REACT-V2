import React, { useState } from "react"; // Importar React y useState para manejar el estado
import "../../styles/Secciones.css"; // Importar estilos específicos para la sección
import Carrito from "../../components/Carrito"; // Importar componente Carrito
import CarritoFlotante from "../../components/CarritoFlotante"; // Importar componente Carrito Flotante
import Header from "../../components/Header"; // Importar componente Header
import { useCarrito } from "../../context/CarritoContext"; // Importar contexto de carrito
import Alerta from "../../components/Alerta"; // Importar componente de Alerta

// Definición de productos disponibles en la sección de Panadería
const productos = [
    { id: 73, nombre: "Pan Francés", descripcion: "Pan recién horneado, 6 unidades", precio: 2730, precioOriginal: 3900, imagen: "../images/PRODUCTOS/pan frances.png", descuento: 30 },
    { id: 74, nombre: "Croissant", descripcion: "Croissant de mantequilla, 4 unidades", precio: 8500, imagen: "../images/PRODUCTOS/croissant.png" },
    { id: 75, nombre: "Pan Tajado", descripcion: "Pan tajado integral, 500g", precio: 5900, imagen: "../images/PRODUCTOS/PAN TAJADO ALMEN.jpg" },
    { id: 76, nombre: "Pan de Queso", descripcion: "Pan de queso fresco, 6 unidades", precio: 7900, imagen: "../images/PRODUCTOS/pan de queso.png" },
    { id: 77, nombre: "Torta de Chocolate", descripcion: "Torta casera, porción", precio: 5900, imagen: "../images/PRODUCTOS/torta de chocolate.png" },
    { id: 78, nombre: "Galletas de Mantequilla", descripcion: "Paquete x12 unidades", precio: 6900, imagen: "../images/PRODUCTOS/galletas.png" },
    { id: 79, nombre: "Pan de Molde", descripcion: "Pan tajado blanco, 500g", precio: 5900, imagen: "../images/PRODUCTOS/pan de molde.png" },
    { id: 80, nombre: "Brownie", descripcion: "Brownie de chocolate, porción", precio: 4900, imagen: "../images/PRODUCTOS/brownie.png" },
    { id: 81, nombre: "Empanadas", descripcion: "Empanadas de carne, 6 unidades", precio: 9900, imagen: "../images/PRODUCTOS/empanadas.png" },
    { id: 82, nombre: "Buñuelos", descripcion: "Buñuelos frescos, 6 unidades", precio: 7900, imagen: "../images/PRODUCTOS/buñuelos.png" },
    { id: 83, nombre: "Almojábanas", descripcion: "Almojábanas frescas, 6 unidades", precio: 8900, imagen: "../images/PRODUCTOS/almojabanas.png" },
    { id: 84, nombre: "Pandebono", descripcion: "Pandebono fresco, 6 unidades", precio: 8900, imagen: "../images/PRODUCTOS/pan de bono.png" },
];

// Número de productos a mostrar por página
const ITEMS_PER_PAGE = 4;

const Panaderia = () => {
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
                <h1>Panadería</h1>
                <div className="productos-grid">
                    {currentProducts.map((producto) => (
                        <div className="producto-card" key={producto.id}>
                            {producto.descuento && <div className="descuento-badge">-{producto.descuento}%</div>}
                            <img src={producto.imagen} alt={producto.nombre} />
                            <h3>{producto.nombre}</h3>
                            <p className="descripcion">{producto.descripcion}</p>
                            {producto.precioOriginal && <p className="precio-original">${producto.precioOriginal}</p>}
                            <p className="precio">${producto.precio}</p>
                            <button className="agregar-carrito" onClick={() => handleAgregarAlCarrito(producto)}>Agregar al Carrito</button>
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

export default Panaderia;
