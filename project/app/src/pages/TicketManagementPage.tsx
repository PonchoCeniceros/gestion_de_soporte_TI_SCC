import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Ticket, TicketStatus, Service } from '../features/tickets/types';
import { TicketFilters } from '../features/tickets/services/api';
import TicketApiAdapter from '../features/tickets/services/api';
import ServiceApiAdapter from '../features/services/services/api';
import TicketsTable from '../features/tickets/components/TicketsTable';
import Pagination from '../components/ui/Pagination';
import useSession from '../store/session'; // Import useSession
import TicketDetailModal from '../components/ui/TicketDetailModal';

export default function TicketManagementPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [filters, setFilters] = useState<Omit<TicketFilters, 'page'>>({
    status: '',
    date: '',
    service: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const ticketApi = TicketApiAdapter();
  const serviceApi = ServiceApiAdapter();
  const { session } = useSession(); // Get session

  // Fetch services once on component mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await serviceApi.getAll();
        if (response.isOk && response.data) {
          setServices(response.data);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError('Ocurrió un error al cargar los servicios.');
      }
    };
    fetchServices();
  }, []);

  // Fetch tickets whenever filters or page change
  useEffect(() => {
    const fetchTickets = async () => {
      setIsLoading(true);
      try {
        const response = await ticketApi.getAll({ ...filters, page: currentPage });
        if (response.isOk && response.data) {
          setTickets(response.data.tickets);
          setTotalPages(response.data.totalPages);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError('Ocurrió un error inesperado al cargar los tickets.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, [filters, currentPage]);

  const handleStatusChange = async (ticketId: string, newStatus: TicketStatus) => {
    setError(null);
    try {
      const response = await ticketApi.updateStatus(ticketId, newStatus);
      if (response.isOk && response.data) {
        setTickets(prevTickets =>
          prevTickets.map(ticket =>
            ticket._id === ticketId ? response.data! : ticket
          )
        );
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Ocurrió un error inesperado al actualizar el estado.');
    }
  };

  const handleAssignToMe = async (ticketId: string) => {
    if (!session?.userId) {
      setError('No hay usuario logueado para asignar.');
      return;
    }
    setError(null);
    try {
      const response = await ticketApi.assignTicket(ticketId, session.userId);
      if (response.isOk && response.data) {
        setTickets(prevTickets =>
          prevTickets.map(ticket =>
            ticket._id === ticketId ? response.data! : ticket
          )
        );
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Ocurrió un error inesperado al asignar el ticket.');
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };

  return (
    <div className='h-screen w-full bg-cover bg-center flex flex-col p-10'>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Gestión de Tickets</h1>
        <Link to="/tickets/new">
          <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
            Crear Ticket
          </button>
        </Link>
      </div>

      {/* Filter Controls */}
      <div className="flex items-center space-x-4 mb-4 p-4 bg-white rounded-lg shadow">
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Filtrar por Estado</label>
          <select
            id="status"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Todos</option>
            <option value={TicketStatus.OPEN}>Abierto</option>
            <option value={TicketStatus.IN_PROGRESS}>En Progreso</option>
            <option value={TicketStatus.CLOSED}>Cerrado</option>
          </select>
        </div>
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-700">Filtrar por Servicio</label>
          <select
            id="service"
            name="service"
            value={filters.service}
            onChange={handleFilterChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Todos</option>
            {services.map(service => (
              <option key={service._id} value={service._id}>{service.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Filtrar por Fecha</label>
          <input
            type="date"
            id="date"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          />
        </div>
      </div>

      <div className="rounded-xl bg-base flex flex-col flex-1 w-full p-4 overflow-hidden">
        {isLoading && <p className="text-center">Cargando...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {!isLoading && !error && (
          <>
            <div className="flex-1 overflow-y-auto">
              <TicketsTable
                tickets={tickets}
                onStatusChange={handleStatusChange}
                onAssign={handleAssignToMe}
                onTicketClick={handleTicketClick}
              />
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </>
        )}
      </div>

      <TicketDetailModal ticket={selectedTicket} onClose={handleCloseModal} />
    </div>
  );
}
