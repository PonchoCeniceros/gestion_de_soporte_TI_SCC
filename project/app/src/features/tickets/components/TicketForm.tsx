import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TicketPriority, Client, Service } from '../types';
import TicketApiAdapter from '../services/api';
import ClientApiAdapter from '../../clients/services/api';
import ServiceApiAdapter from '../../services/services/api';

export default function TicketForm() {
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: TicketPriority.MEDIUM,
    client: '',
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    service: '',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const clientApi = ClientApiAdapter();
    const serviceApi = ServiceApiAdapter();

    const fetchData = async () => {
      try {
        const clientResponse = await clientApi.getAll();
        if (clientResponse.isOk && clientResponse.data) {
          setClients(clientResponse.data);
        } else {
          setError(clientResponse.message);
        }

        const serviceResponse = await serviceApi.getAll();
        if (serviceResponse.isOk && serviceResponse.data) {
          setServices(serviceResponse.data);
        } else {
          setError(error => error ? `${error}, ${serviceResponse.message}` : serviceResponse.message);
        }
      } catch (err) {
        setError('Ocurrió un error inesperado al cargar los datos.');
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.client || !formData.service) {
      setError("Por favor, seleccione un cliente y un servicio.");
      return;
    }

    const ticketApi = TicketApiAdapter();
    try {
      const response = await ticketApi.create({
        ...formData,
        status: 'abierto' // default status
      });

      if (response.isOk) {
        alert('Ticket creado exitosamente!');
        navigate('/tickets');
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Ocurrió un error inesperado al crear el ticket.');
    }
  };

  const inputStyle = "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5";
  const labelStyle = "block mb-2 text-sm font-medium text-gray-900";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="title" className={labelStyle}>Solicitud</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className={inputStyle}
            required
          />
        </div>
        <div>
          <label htmlFor="clientName" className={labelStyle}>Nombre del Solicitante</label>
          <input
            type="text"
            name="clientName"
            id="clientName"
            value={formData.clientName}
            onChange={handleChange}
            className={inputStyle}
            required
          />
        </div>
        <div>
          <label htmlFor="clientPhone" className={labelStyle}>Teléfono del Solicitante</label>
          <input
            type="tel"
            name="clientPhone"
            id="clientPhone"
            value={formData.clientPhone}
            onChange={handleChange}
            className={inputStyle}
            required
          />
        </div>
        <div>
          <label htmlFor="clientEmail" className={labelStyle}>Correo Electrónico del Solicitante</label>
          <input
            type="email"
            name="clientEmail"
            id="clientEmail"
            value={formData.clientEmail}
            onChange={handleChange}
            className={inputStyle}
            required
          />
        </div>
        <div>
          <label htmlFor="client" className={labelStyle}>Cliente</label>
          <select
            name="client"
            id="client"
            value={formData.client}
            onChange={handleChange}
            className={inputStyle}
            required
          >
            <option value="" disabled>Seleccione un cliente</option>
            {clients.map(client => (
              <option key={client._id} value={client._id}>{client.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="service" className={labelStyle}>Tipo de Servicio</label>
          <select
            name="service"
            id="service"
            value={formData.service}
            onChange={handleChange}
            className={inputStyle}
            required
          >
            <option value="" disabled>Seleccione un servicio</option>
            {services.map(service => (
              <option key={service._id} value={service._id}>{service.name}</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="priority" className={labelStyle}>Prioridad</label>
          <select
            name="priority"
            id="priority"
            value={formData.priority}
            onChange={handleChange}
            className={inputStyle}
            required
          >
            <option value={TicketPriority.LOW}>Baja</option>
            <option value={TicketPriority.MEDIUM}>Media</option>
            <option value={TicketPriority.HIGH}>Alta</option>
            <option value={TicketPriority.URGENT}>Urgente</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="description" className={labelStyle}>Descripción</label>
          <textarea
            name="description"
            id="description"
            rows={6}
            value={formData.description}
            onChange={handleChange}
            className={inputStyle}
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Crear Ticket
      </button>
    </form>
  );
}
