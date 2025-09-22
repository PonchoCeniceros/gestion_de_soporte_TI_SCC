import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TicketPriority, Client, Service } from '../types';
import { ClientClass } from '../../clients/types'; // Import ClientClass
import TicketApiAdapter from '../services/api';
import ClientApiAdapter from '../../clients/services/api';
import ServiceApiAdapter from '../../services/services/api';

interface Props {
  clientClassFilter?: ClientClass;
}

export default function TicketForm({ clientClassFilter }: Props) {
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
  const [attachment, setAttachment] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const clientApi = ClientApiAdapter();
    const serviceApi = ServiceApiAdapter();

    const fetchData = async () => {
      try {
        const clientResponse = await clientApi.getAll();
        if (clientResponse.isOk && clientResponse.data) {
          let filteredClients = clientResponse.data;
          if (clientClassFilter) {
            filteredClients = clientResponse.data.filter(client => client.class === clientClassFilter);
          }
          setClients(filteredClients);

          // Pre-select the first client if a filter is applied and there's only one client
          if (clientClassFilter && filteredClients.length === 1) {
            setFormData(prev => ({ ...prev, client: filteredClients[0]._id }));
          }

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
  }, [clientClassFilter]); // Re-run effect when clientClassFilter changes

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
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
      });

      if (response.isOk && response.data) {
        const newTicketId = response.data._id;
        if (attachment) {
          const attachmentResponse = await ticketApi.addAttachment(newTicketId, attachment);
          if (!attachmentResponse.isOk) {
            // Handle attachment error, maybe notify user but still proceed
            console.error('Failed to upload attachment:', attachmentResponse.message);
            alert('Ticket creado, pero falló la subida del adjunto.');
          } else {
            alert('Ticket creado y adjunto subido exitosamente!');
          }
        } else {
          alert('Ticket creado exitosamente!');
        }
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
            disabled={clientClassFilter && clients.length === 1} // Disable if pre-selected
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
        <div className="md:col-span-2">
          <label htmlFor="attachment" className={labelStyle}>Adjuntar Imagen</label>
          <input
            type="file"
            name="attachment"
            id="attachment"
            onChange={handleFileChange}
            className={`${inputStyle} p-0 file:mr-4 file:py-2.5 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100`}
            accept="image/png, image/jpeg, image/gif, image/webp"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full text-white bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Crear Ticket
      </button>
    </form>
  );
}
