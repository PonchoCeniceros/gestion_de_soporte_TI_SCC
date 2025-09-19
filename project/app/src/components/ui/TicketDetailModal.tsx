import React from 'react';
import { Ticket } from '../../features/tickets/types';

interface TicketDetailModalProps {
  ticket: Ticket | null;
  onClose: () => void;
}

const TicketDetailModal: React.FC<TicketDetailModalProps> = ({ ticket, onClose }) => {
  if (!ticket) return null;

  const apiUrl = import.meta.env.VITE_API_URL.replace(/\/v1$/, ''); // Remove /v1 from the end

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={onClose}>
      <div
        className="relative top-20 mx-auto p-5 border w-7/12 shadow-lg rounded-md bg-white"
        onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
      >
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Detalles del Ticket</h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500 text-left">
              <strong>Título:</strong> {ticket.title}
            </p>
            <p className="text-sm text-gray-500 text-left mt-2">
              <strong>Descripción:</strong> {ticket.description}
            </p>
            <p className="text-sm text-gray-500 text-left mt-2">
              <strong>Estado:</strong> {ticket.status}
            </p>
            <p className="text-sm text-gray-500 text-left mt-2">
              <strong>Prioridad:</strong> {ticket.priority}
            </p>
            <p className="text-sm text-gray-500 text-left mt-2">
              <strong>Cliente:</strong> {ticket.client.name}
            </p>
            <p className="text-sm text-gray-500 text-left mt-2">
              <strong>Nombre del Solicitante:</strong> {ticket.clientName}
            </p>
            <p className="text-sm text-gray-500 text-left mt-2">
              <strong>Teléfono del Solicitante:</strong> {ticket.clientPhone}
            </p>
            <p className="text-sm text-gray-500 text-left mt-2">
              <strong>Correo del Solicitante:</strong> {ticket.clientEmail}
            </p>
            <p className="text-sm text-gray-500 text-left mt-2">
              <strong>Servicio:</strong> {ticket.service.name}
            </p>
            <p className="text-sm text-gray-500 text-left mt-2">
              <strong>Asignado a:</strong> {ticket.assignedTo ? ticket.assignedTo.name : 'N/A'}
            </p>
            <p className="text-sm text-gray-500 text-left mt-2">
              <strong>Creado el:</strong> {new Date(ticket.createdAt).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 text-left mt-2">
              <strong>Última actualización:</strong> {new Date(ticket.updatedAt).toLocaleString()}
            </p>

            {ticket.attachments && ticket.attachments.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 text-left font-bold">Adjuntos:</p>
                <div className="mt-2 flex flex-wrap gap-4">
                  {ticket.attachments.map((attachment, index) => (
                    <a key={index} href={`${apiUrl}${attachment}`} target="_blank" rel="noopener noreferrer">
                      <img
                        src={`${apiUrl}${attachment}`}
                        alt={`Adjunto ${index + 1}`}
                        className="h-24 w-24 object-cover rounded-md border border-gray-300 hover:border-blue-500 transition-all"
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="items-center px-4 py-3">
            <button
              id="ok-btn"
              className="px-4 py-2 bg-blue-700 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailModal;
