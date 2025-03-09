import React from 'react'; // Importar React
import '../styles/Modal.css'; // Importar estilos específicos para el modal

// Componente Modal que muestra un cuadro de diálogo para confirmar el pago
const Modal = ({ isOpen, onClose, productos, onConfirm }) => {
    // Si el modal no está abierto, no renderizar nada
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}> 
            <div className="modal-container" onClick={(e) => e.stopPropagation()}> 
                <h3>Confirmar Pago</h3> 
                <div className="modal-content"> 
                    {productos.map((item) => ( 
                        <div key={item.id} className="modal-item"> 
                            <img src={item.imagen} alt={item.nombre} className="modal-item-imagen" /> 
                            <div className="modal-item-detalles"> 
                                <h4>{item.nombre}</h4> 
                                <p>Precio: ${item.precio}</p> 
                                <p>Cantidad: {item.cantidad}</p> 
                                <p>Total: ${(item.precio * item.cantidad).toFixed(2)}</p> 
                            </div>
                        </div>
                    ))}
                </div>
                <div className="modal-footer"> {/* Contenedor para los botones del modal */}
                    <button className="btn-cancelar" onClick={onClose}>Cancelar</button> {/* Botón para cancelar */}
                    <button className="btn-confirmar" onClick={onConfirm}>Confirmar</button> {/* Botón para confirmar */}
                </div>
            </div>
        </div>
    );
};

export default Modal; 