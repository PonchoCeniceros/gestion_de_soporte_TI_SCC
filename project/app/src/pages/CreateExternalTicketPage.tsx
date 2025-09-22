import TicketForm from '../features/tickets/components/TicketForm';
import { ClientClass } from '../features/clients/types';

export default function CreateExternalTicketPage() {
  return (
    <div className='min-h-screen w-full bg-cover bg-center flex flex-col items-center px-10 py-10 bg-[linear-gradient(45deg,#E5181D,#014F80,#ECAE02)]'>
      <h1 className="text-3xl font-bold mb-6 text-white">Solicitudes de Soporte para Clientes Externos</h1>
      <div className="rounded-xl bg-base flex flex-col flex-1 max-w-3xl w-full p-8 shadow-lg">
        <div className="flex-1 overflow-y-auto">
          <TicketForm clientClassFilter={ClientClass.EXTERNAL} />
        </div>
      </div>
    </div>
  );
}
