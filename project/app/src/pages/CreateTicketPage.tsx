import TicketForm from '../features/tickets/components/TicketForm';

/**
 *
 */
export default function CreateTicketPage() {

  return (
    <div
      className='h-screen w-full bg-cover bg-center flex flex-col items-center justify-center px-10'
    >
      <div className="m-8 rounded-xl bg-base flex flex-col h-full w-full p-8">
        <h1 className="text-3xl font-bold mb-4">Crear Nuevo Ticket</h1>
        <TicketForm />
      </div>
    </div>
  );
}
