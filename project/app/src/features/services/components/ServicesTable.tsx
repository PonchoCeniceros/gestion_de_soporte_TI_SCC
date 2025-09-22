import { Service } from '../types';

interface Props {
  services: Service[];
  onEdit: (service: Service) => void;
  onDelete: (service: Service) => void;
}

export default function ServicesTable({ services, onEdit, onDelete }: Props) {
  const tableHeaderStyle = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";
  const tableCellStyle = "px-6 py-4 whitespace-nowrap text-sm text-gray-900";

  if (services.length === 0) {
    return <p className="text-center">No hay servicios para mostrar.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className={tableHeaderStyle}>Nombre</th>
            <th scope="col" className={tableHeaderStyle}>Descripción</th>
            <th scope="col" className={tableHeaderStyle}>Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {services.map((service) => (
            <tr key={service._id}>
              <td className={tableCellStyle}>{service.name}</td>
              <td className={tableCellStyle}>{service.description}</td>
              <td className={`${tableCellStyle} space-x-2`}>
                <button
                  onClick={() => onEdit(service)}
                  className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(service)}
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
