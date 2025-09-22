export default function AppointmentSchedulingPage() {
  return (
    <div className='min-h-screen w-full bg-cover bg-center flex flex-col items-center px-10 py-10  bg-[linear-gradient(45deg,#E5181D,#014F80,#ECAE02)]'>
      <h1 className="text-3xl font-bold mb-6 text-white">Agenda de Citas</h1>
      <div className="rounded-xl bg-base flex flex-col flex-1 max-w-7xl w-full p-8 shadow-lg">
        <iframe
          src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3Jb0dbWj-xc6SxSA07IHnrzrWApox-nSiksXx0HNc5aQG_0P-7AXMYdgfWsU0Sy7-VEI7cmbhw?gv=true"
          style={{ border: 0 }}
          width="100%"
          height="900"
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  );
}
