// dominio
// aplicación
// infraestructura
import './main.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// ui
import LoginForm from './features/auth/components/LoginForm';
import Sidebar from './components/sidebar';
import TicketManagementPage from './pages/TicketManagementPage';
// import ClientsManagementPage from './pages/ClientsManagementPage';
import CreateTicketPage from './pages/CreateTicketPage';
import CreatingTicketPage from './pages/CreatingTicketPage';

/**
 *
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/solicitudes" element={<CreatingTicketPage />} />
        <Route path="/" element={<Sidebar />}>
          <Route path="tickets" element={<TicketManagementPage />} />
          <Route path="tickets/new" element={<CreateTicketPage />} />
          {/* <Route path="clients" element={<ClientsManagementPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
