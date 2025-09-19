// dominio
// aplicación
// infraestructura
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useSession from "../../store/session";

/**
 *
 */
export default function useSidebar() {
  const location = useLocation();
  const { isAuthenticated, session, signOut } = useSession();
  const [isMinimized, setIsMinimized] = useState(true);

  useEffect((): void => {
    if (session) {
      const tokenExpiration = session.expiresAt * 1000;
      if (tokenExpiration <= Date.now()) signOut();
    }
  }, [location.pathname, session, signOut]);

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  return { isAuthenticated, isMinimized, toggleSidebar };
}
