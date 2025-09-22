import { Client, ClientClass } from '../types';

interface Props {
  clients: Client[];
  onEdit: (client: Client) => void;
  onDelete: (client: Client) => void;
}

export default function ClientsTable({ clients, onEdit, onDelete }: Props) {
  const tableHeaderStyle = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";
  const tableCellStyle = "px-6 py-4 whitespace-nowrap text-sm text-gray-900";

  const classTranslations: Record<ClientClass, string> = {
    [ClientClass.EXTERNAL]: 'Cliente Externo',
    [ClientClass.INTERNAL]: 'Cliente Interno',
    [ClientClass.BRANCH]: 'Sucursal',
  };

  if (clients.length === 0) {
    return <p className="text-center">No hay clientes para mostrar.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className={tableHeaderStyle}>Nombre</th>
            <th scope="col" className={tableHeaderStyle}>Clase</th>
            <th scope="col" className={tableHeaderStyle}>Persona de Contacto</th>
            <th scope="col" className={tableHeaderStyle}>Email de Contacto</th>
            <th scope="col" className={tableHeaderStyle}>Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {clients.map((client) => (
            <tr key={client._id}>
              <td className={tableCellStyle}>{client.name}</td>
              <td className={tableCellStyle}>{classTranslations[client.class] || client.class}</td>
              <td className={tableCellStyle}>{client.contactPerson}</td>
              <td className={tableCellStyle}>{client.contactEmail}</td>
              <td className={`${tableCellStyle} space-x-2`}>
                <button
                  onClick={() => onEdit(client)}
                  className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(client)}
                  className="px-3 py-1 text-xs font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
