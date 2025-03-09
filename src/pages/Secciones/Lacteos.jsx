import React, { useState } from "react"; // Importar React y useState para manejar el estado
import "../../styles/Secciones.css"; // Importar estilos específicos para la sección
import Carrito from "../../components/Carrito"; // Importar componente Carrito
import CarritoFlotante from "../../components/CarritoFlotante"; // Importar componente Carrito Flotante
import Header from "../../components/Header"; // Importar componente Header
import { useCarrito } from "../../context/CarritoContext"; // Importar contexto de carrito
import Alerta from "../../components/Alerta"; // Importar componente de Alerta

// Definición de productos disponibles en la sección de Lácteos
const productos = [
    { id: 1, nombre: "Leche Entera", descripcion: "Leche entera pasteurizada, 1 litro", precio: 2625, precioOriginal: 3500, descuento: 25, imagen: "../images/PRODUCTOS/LECHE ENTERA.png" },
    { id: 2, nombre: "Yogurt Natural", descripcion: "Yogurt natural, 900g", precio: 8900, imagen: "../images/PRODUCTOS/yogurt natural.png" },
    { id: 3, nombre: "Queso Campesino", descripcion: "Queso campesino fresco, 500g", precio: 8500, imagen: "../images/PRODUCTOS/Queso campesino.png" },
    { id: 4, nombre: "Kumis", descripcion: "Kumis natural, bebida láctea fermentada, 1 litro", precio: 4800, imagen: "../images/PRODUCTOS/kumis.png" },
    { id: 5, nombre: "Mantequilla", descripcion: "Mantequilla sin sal, 250g", precio: 6900, imagen: "../images/PRODUCTOS/mantequilla.png" },
    { id: 6, nombre: "Queso Mozarella", descripcion: "Queso mozarella tajado, 250g", precio: 7500, imagen: "../images/PRODUCTOS/Quezo mozarella.png" },
    { id: 7, nombre: "Queso Doble Crema", descripcion: "Queso doble crema, 500g", precio: 9800, imagen: "../images/PRODUCTOS/Queso doble crema.png" },
    { id: 8, nombre: "Leche Deslactosada", descripcion: "Leche deslactosada, 1 litro", precio: 4200, imagen: "../images/PRODUCTOS/Leche deslactosada.png" },
    { id: 9, nombre: "Crema de Leche", descripcion: "Crema de leche, 200ml", precio: 3900, imagen: "../images/PRODUCTOS/Crema de leche.png" },
    { id: 10, nombre: "Arequipe", descripcion: "Arequipe tradicional, 250g", precio: 5500, imagen: "../images/PRODUCTOS/Arequipe.png" },
    { id: 11, nombre: "Queso Parmesano", descripcion: "Queso parmesano rallado, 125g", precio: 8900, imagen: "../images/PRODUCTOS/Queso Parmesano.png" },
    { id: 12, nombre: "Leche Condensada", descripcion: "Leche condensada, 395g", precio: 7200, imagen: "../images/PRODUCTOS/Leche condensada.png" }
];

// Número de productos a mostrar por página
const ITEMS_PER_PAGE = 4;

const Lacteos = () => {
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
                <h1>Lácteos</h1>
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

export default Lacteos;
