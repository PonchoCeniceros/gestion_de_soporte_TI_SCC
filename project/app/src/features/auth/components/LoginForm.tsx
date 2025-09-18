import useLogin from "../hooks/useLogin";

/**
 *
 */
export default function Login() {
  const [user, handleChange, handleSubmit] = useLogin();

  return (
    <div className="flex justify-center items-center h-screen bg-[linear-gradient(to_right,_#84BCEE,_#AECB92,_#C893DF,_#DA888A,_#E5CC95)]">
      <div className="absolute t-0 l-0 flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-quaternary rounded-2xl border border-secondary shadow-xl">
        <div className="flex flex-col justify-center mx-auto items-center gap-3 pb-4 pt-4">
          {/* <Logo2cap /> */}
          <h1 className="text-3xl text-center font-bold text-black my-auto">{import.meta.env.VITE_TITLE}</h1>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="pb-2">
            <label htmlFor="user" className="block mb-2 text-sm font-medium text-black">Usuario</label>
            <div className="relative text-black">
              <input
                type="text"
                name="name"
                id="name"
                className="pl-4 mb-2 bg-quaternary text-black border focus:border-transparent border-secondary sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
                placeholder="ingresa tu usuario"
                value={user.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="pb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">Contraseña</label>
            <div className="relative text-black">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••••"
                className="pl-4 mb-2 bg-quaternary text-black border focus:border-transparent border-secondary sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
                value={user.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-base bg-baseDark focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
          >
            iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}
