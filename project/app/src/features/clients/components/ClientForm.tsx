import React, { useState, useEffect } from 'react';
import { Client, ClientClass } from '../types';

interface Props {
  client?: Client | null;
  onSave: (clientData: Omit<Client, '_id'>) => void;
  onCancel: () => void;
}

export default function ClientForm({ client, onSave, onCancel }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    contactEmail: '',
    class: ClientClass.EXTERNAL,
  });

  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name,
        contactPerson: client.contactPerson,
        contactEmail: client.contactEmail,
        class: client.class,
      });
    }
  }, [client]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const inputStyle = "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5";
  const labelStyle = "block mb-2 text-sm font-medium text-gray-900";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className={labelStyle}>Nombre del Cliente</label>
        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className={inputStyle} required />
      </div>
      <div>
        <label htmlFor="class" className={labelStyle}>Clase de Cliente</label>
        <select name="class" id="class" value={formData.class} onChange={handleChange} className={inputStyle} required>
          <option value={ClientClass.EXTERNAL}>Cliente Externo</option>
          <option value={ClientClass.INTERNAL}>Cliente Interno</option>
          <option value={ClientClass.BRANCH}>Sucursal</option>
        </select>
      </div>
      <div>
        <label htmlFor="contactPerson" className={labelStyle}>Persona de Contacto</label>
        <input type="text" name="contactPerson" id="contactPerson" value={formData.contactPerson} onChange={handleChange} className={inputStyle} required />
      </div>
      <div>
        <label htmlFor="contactEmail" className={labelStyle}>Email de Contacto</label>
        <input type="email" name="contactEmail" id="contactEmail" value={formData.contactEmail} onChange={handleChange} className={inputStyle} required />
      </div>
      <div className="flex justify-end space-x-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
          Cancelar
        </button>
        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
          Guardar
        </button>
      </div>
    </form>
  );
}
