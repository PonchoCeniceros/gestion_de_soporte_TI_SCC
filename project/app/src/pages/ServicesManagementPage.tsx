import { useState, useEffect } from 'react';
import { Service } from '../features/services/types';
import ServiceApiAdapter from '../features/services/services/api';
import ServicesTable from '../features/services/components/ServicesTable';
import ServiceForm from '../features/services/components/ServiceForm';

export default function ServicesManagementPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const serviceApi = ServiceApiAdapter();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const response = await serviceApi.getAll();
      if (response.isOk && response.data) {
        setServices(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Ocurrió un error inesperado al cargar los servicios.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (serviceData: Omit<Service, '_id'>) => {
    setError(null);
    try {
      const response = editingService
        ? await serviceApi.update(editingService._id, serviceData)
        : await serviceApi.create(serviceData);

      if (response.isOk) {
        fetchServices(); // Re-fetch to show the latest data
        setIsModalOpen(false);
        setEditingService(null);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Ocurrió un error inesperado al guardar el servicio.');
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleDelete = async (service: Service) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar a ${service.name}?`)) {
      setError(null);
      try {
        const response = await serviceApi.delete(service._id);
        if (response.isOk) {
          fetchServices(); // Re-fetch
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError('Ocurrió un error inesperado al eliminar el servicio.');
      }
    }
  };

  return (
    <div className='h-screen w-full bg-cover bg-center flex flex-col p-10'>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Gestión de Servicios</h1>
        <button
          onClick={() => {
            setEditingService(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-xl"
        >
          Crear Servicio
        </button>
      </div>

      <div className="rounded-xl bg-base flex flex-col flex-1 w-full p-4 overflow-hidden border border-black">
        {isLoading && <p className="text-center">Cargando...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {!isLoading && !error && (
          <div className="flex-1 overflow-y-auto">
            <ServicesTable services={services} onEdit={handleEdit} onDelete={handleDelete} />
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="relative mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <h2 className="text-2xl font-bold mb-4">{editingService ? 'Editar Servicio' : 'Crear Servicio'}</h2>
            <ServiceForm
              service={editingService}
              onSave={handleSave}
              onCancel={() => {
                setIsModalOpen(false);
                setEditingService(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
