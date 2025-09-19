import { useState, useEffect } from 'react';
import { Ticket, TicketStatus } from '../types';
import { User } from '../../users/types';
import { getUsers } from '../../users/services/api';
import AssignUserModal from '../../../components/ui/AssignUserModal';

interface Props {
  tickets: Ticket[];
  onStatusChange: (id: string, status: TicketStatus) => void;
  onAssign: (ticketId: string, userId: string) => void; // Updated to accept userId
  onTicketClick: (ticket: Ticket) => void;
}

export default function TicketsTable({ tickets, onStatusChange, onAssign, onTicketClick }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    fetchUsers();
  }, []);

  const tableHeaderStyle = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";
  const tableCellStyle = "px-6 py-4 whitespace-nowrap text-sm text-gray-900";

  if (tickets.length === 0) {
    return <p className="text-center">No hay tickets para mostrar.</p>;
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>, ticketId: string) => {
    onStatusChange(ticketId, e.target.value as TicketStatus);
  };

  const handleOpenAssignModal = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };

  const handleAssign = (ticketId: string, userId: string) => {
    onAssign(ticketId, userId);
    handleCloseModal();
  };

  const getLastStatusUpdate = (ticket: Ticket) => {
    if (ticket.statusHistory && ticket.statusHistory.length > 0) {
      const lastUpdate = ticket.statusHistory[ticket.statusHistory.length - 1];
      return new Date(lastUpdate.changedAt).toLocaleString();
    }
    return 'N/A';
  }

  return (
    <>
      <div className="overflow-x-auto rounded-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className={tableHeaderStyle}>Título</th>
              <th scope="col" className={tableHeaderStyle}>Cliente</th>
              <th scope="col" className={tableHeaderStyle}>Asignado a</th>
              <th scope="col" className={tableHeaderStyle}>Estado</th>
              <th scope="col" className={tableHeaderStyle}>Última Actualización</th>
              <th scope="col" className={tableHeaderStyle}>Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tickets.map((ticket) => (
              <tr key={ticket._id}>
                <td className={tableCellStyle}>{ticket.title}</td>
                <td className={tableCellStyle}>{ticket.client.name}</td>
                <td className={tableCellStyle}>{ticket.assignedTo ? ticket.assignedTo.name : 'Sin asignar'}</td>
                <td className={tableCellStyle}>{ticket.status}</td>
                <td className={tableCellStyle}>{getLastStatusUpdate(ticket)}</td>
                <td className={`${tableCellStyle} space-x-2`}>
                  <button
                    onClick={() => onTicketClick(ticket)}
                    className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200"
                  >
                    Detalles
                  </button>
                  {
                    ticket.assignedTo && (
                      <select
                        value={ticket.status}
                        onChange={(e) => handleStatusChange(e, ticket._id)}
                        disabled={ticket.status === TicketStatus.CLOSED}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value={TicketStatus.OPEN} disabled>Abierto</option>
                        <option value={TicketStatus.IN_PROGRESS} disabled={ticket.status === TicketStatus.CLOSED}>En Progreso</option>
                        <option value={TicketStatus.CLOSED} disabled={ticket.status !== TicketStatus.IN_PROGRESS}>Cerrado</option>
                      </select>
                    )
                  }
                  {
                    !ticket.assignedTo && (
                      <button
                        onClick={() => handleOpenAssignModal(ticket)}
                        className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                      >
                        Asignar
                      </button>
                    )
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AssignUserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        users={users}
        ticket={selectedTicket}
        onAssign={handleAssign}
      />
    </>
  );
}
