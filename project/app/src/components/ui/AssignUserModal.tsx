import { useState } from 'react';
import { User } from '../../features/users/types';
import { Ticket } from '../../features/tickets/types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
  ticket: Ticket | null;
  onAssign: (ticketId: string, userId: string) => void;
}

export default function AssignUserModal({ isOpen, onClose, users, ticket, onAssign }: Props) {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  if (!isOpen || !ticket) {
    return null;
  }

  const handleAssign = () => {
    if (selectedUserId) {
      onAssign(ticket._id, selectedUserId);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Asignar Ticket</h2>
        <p className="mb-2">Ticket: <span className="font-semibold">{ticket.title}</span></p>
        <p className="mb-4">Cliente: <span className="font-semibold">{ticket.client.name}</span></p>

        <div className="mb-6">
          <label htmlFor="user-select" className="block mb-2 text-sm font-medium text-gray-900">Seleccionar usuario:</label>
          <select
            id="user-select"
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="">-- Seleccione un usuario --</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancelar
          </button>
          <button
            onClick={handleAssign}
            disabled={!selectedUserId}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300"
          >
            Asignar
          </button>
        </div>
      </div>
    </div>
  );
}
