import React, { useRef, useState } from 'react'; // Importar React, useRef y useState
import '../styles/Carrito.css'; // Importar estilos específicos para el carrito
import { useCarrito } from '../context/CarritoContext'; // Importar el contexto del carrito
import Modal from './Modal'; // Importar el componente Modal
import Alerta from './Alerta'; // Importar el componente Alerta

// Componente Carrito que muestra los productos en el carrito de compras
const Carrito = () => {
  const carritoRef = useRef(null); 
  const {
    carrito, // Lista de productos en el carrito
    mostrarCarrito, // Estado que controla la visibilidad del carrito
    setMostrarCarrito, // Función para mostrar/ocultar el carrito
    eliminarDelCarrito, // Función para eliminar un producto del carrito
    aumentarCantidad, // Función para aumentar la cantidad de un producto
    disminuirCantidad, // Función para disminuir la cantidad de un producto
    calcularTotal // Función para calcular el total del carrito
  } = useCarrito(); // Obtener valores y funciones del contexto del carrito

  const [modalOpen, setModalOpen] = useState(false); // Estado para controlar la visibilidad del modal
  const [mensajeAlerta, setMensajeAlerta] = useState(''); // Estado para el mensaje de alerta

  // Función para manejar la confirmación del pago
  const handleConfirmarPago = () => {
    console.log("Pago confirmado"); // Mensaje en consola al confirmar el pago
    setModalOpen(false); // Cerrar el modal
    setMostrarCarrito(false); // Ocultar el carrito
  };

  // Si el carrito no está visible, no renderizar nada
  if (!mostrarCarrito) return null;

  return (
    <div className="carrito-overlay" onClick={(e) => {
      if (e.target.className === 'carrito-overlay') {
        setMostrarCarrito(false); // Cerrar el carrito al hacer clic fuera de él
      }
    }}>
      <Alerta mensaje={mensajeAlerta} onClose={() => setMensajeAlerta('')} /> {/* Componente de alerta */}
      <div className="carrito-container" ref={carritoRef}> {/* Contenedor del carrito */}
        <div className="carrito-header"> 
          <h3>Carrito de Compras</h3> 
          <button className="cerrar-carrito" onClick={() => setMostrarCarrito(false)}>✕</button>
        </div>

        {/* Contenedor de los items del carrito */}
        <div className="carrito-items"> 
          {carrito.length === 0 ? ( // Verificar si el carrito está vacío
            <p className="carrito-vacio">El carrito está vacío</p> // Mensaje si el carrito está vacío
          ) : (
            carrito.map(item => ( // Iterar sobre los productos en el carrito
              <div key={item.id} className="carrito-item"> {/* Contenedor de cada item */}
                <div className="item-imagen">
                  <img src={item.imagen} alt={item.nombre} /> {/* Imagen del producto */}
                </div>
                <div className="item-detalles"> {/* Detalles del producto */}
                  <h4>{item.nombre}</h4> {/* Nombre del producto */}
                  <p className="item-precio">${item.precio}</p> {/* Precio del producto */}
                  <div className="item-controles"> {/* Controles para la cantidad */}
                    <div className="cantidad-controles">
                      <button onClick={() => disminuirCantidad(item.id)}>-</button> {/* Botón para disminuir cantidad */}
                      <span>{item.cantidad}</span> {/* Mostrar cantidad actual */}
                      <button onClick={() => aumentarCantidad(item.id)}>+</button> {/* Botón para aumentar cantidad */}
                    </div>
                    <button 
                      className="eliminar-item"
                      onClick={() => eliminarDelCarrito(item.id)} // Botón para eliminar el item
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
                <div className="item-total"> {/* Total del item */}
                  ${(item.precio * item.cantidad).toFixed(2)} {/* Calcular y mostrar el total */}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="carrito-footer"> 
          <div className="carrito-total"> 
            <span>Total:</span>
            <span>${calcularTotal().toFixed(2)}</span> 
          </div>
          <button className="btn-pagar" onClick={() => setModalOpen(true)}>Proceder al pago</button> 
        </div>
      </div>

      <Modal 
        isOpen={modalOpen} // Controlar la visibilidad del modal
        onClose={() => setModalOpen(false)} // Función para cerrar el modal
        productos={carrito} // Pasar los productos al modal
        onConfirm={handleConfirmarPago} // Función para manejar la confirmación del pago
      />
    </div>
  );
};

export default Carrito;