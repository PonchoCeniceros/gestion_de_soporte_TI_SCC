import { Ticket, TicketStatus } from '../types';

interface Props {
  tickets: Ticket[];
  onStatusChange: (id: string, status: TicketStatus) => void;
  onAssign: (ticketId: string) => void; // For now, just "assign to me"
}

export default function TicketsTable({ tickets, onStatusChange, onAssign }: Props) {
  const tableHeaderStyle = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";
  const tableCellStyle = "px-6 py-4 whitespace-nowrap text-sm text-gray-900";

  if (tickets.length === 0) {
    return <p className="text-center">No hay tickets para mostrar.</p>;
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>, ticketId: string) => {
    onStatusChange(ticketId, e.target.value as TicketStatus);
  };

  const getLastStatusUpdate = (ticket: Ticket) => {
    if (ticket.statusHistory && ticket.statusHistory.length > 0) {
      // The history is sorted by date in the schema, but let's be safe
      const lastUpdate = ticket.statusHistory[ticket.statusHistory.length - 1];
      return new Date(lastUpdate.changedAt).toLocaleString();
    }
    return 'N/A';
  }

  return (
    <div className="overflow-x-auto">
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
                {
                  ticket.assignedTo && (
                    <select
                      value={ticket.status}
                      onChange={(e) => handleStatusChange(e, ticket._id)}
                      disabled={ticket.status === TicketStatus.CLOSED}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value={TicketStatus.OPEN} disabled={ticket.status !== TicketStatus.OPEN}>Abierto</option>
                      <option value={TicketStatus.IN_PROGRESS} disabled={ticket.status !== TicketStatus.OPEN}>En Progreso</option>
                      <option value={TicketStatus.CLOSED} disabled={ticket.status !== TicketStatus.IN_PROGRESS}>Cerrado</option>
                    </select>
                  )
                }
                {
                  !ticket.assignedTo && (
                    <button
                      onClick={() => onAssign(ticket._id)}
                      className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                    >
                      Asignarme
                    </button>
                  )
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
