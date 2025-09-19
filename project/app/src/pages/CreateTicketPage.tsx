import TicketForm from '../features/tickets/components/TicketForm';

/**
 *
 */
export default function CreateTicketPage() {

  return (
    <div
      className='h-screen w-full bg-cover bg-center flex flex-col items-center px-10 py-10'
    >
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Crear Nuevo Ticket</h1>
      <div className="rounded-xl bg-base flex flex-col flex-1 max-w-3xl w-full p-8 shadow-lg">
        <div className="flex-1 overflow-y-auto">
          <TicketForm />
        </div>
      </div>
    </div>
  );
}
