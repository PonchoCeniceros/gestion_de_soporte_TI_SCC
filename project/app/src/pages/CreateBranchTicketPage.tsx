import TicketForm from '../features/tickets/components/TicketForm';
import { ClientClass } from '../features/clients/types';

export default function CreateBranchTicketPage() {
  return (
    <div
      className='min-h-screen w-full flex flex-col items-center px-10 py-10 bg-[url("https://caps.grupogardea.com/Images/2cap_live_store/bg_desktop_1080_1280.jpg")] bg-cover bg-center bg-[linear-gradient(45deg,#E5181D)]'
    >
      <div className='w-[650px] flex flex-row justify-center items-center mb-6'>
        < div className='relative flex justify-center items-center h-full pr-8'>
          <div
            className='absolute h-[42px] bg-[#E5181D] rounded-full m-24 w-[112px]'
            style={{ border: '4px solid white' }}
          >
          </div>
          <div className='2cap-text text-white font-black text-3xl' style={{ zIndex: '1' }} >2CAP</div>
        </div >
        <h1 className="text-3xl font-bold text-white">Solicitudes de Soporte a Sucursales</h1>
      </div>
      <div className="rounded-xl bg-base flex flex-col flex-1 max-w-3xl w-full p-8 shadow-lg">
        <div className="flex-1 overflow-y-auto">
          <TicketForm clientClassFilter={ClientClass.BRANCH} />
        </div>
      </div>
    </div>
  );
}
