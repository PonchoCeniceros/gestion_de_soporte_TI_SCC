import React, { useState, useEffect } from 'react';
import { Service } from '../types';

interface Props {
  service?: Service | null;
  onSave: (serviceData: Omit<Service, '_id'>) => void;
  onCancel: () => void;
}

export default function ServiceForm({ service, onSave, onCancel }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name,
        description: service.description,
      });
    }
  }, [service]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        <label htmlFor="name" className={labelStyle}>Nombre del Servicio</label>
        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className={inputStyle} required />
      </div>
      <div>
        <label htmlFor="description" className={labelStyle}>Descripción</label>
        <textarea name="description" id="description" rows={4} value={formData.description} onChange={handleChange} className={inputStyle} required />
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
