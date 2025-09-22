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
import ClientsManagementPage from './pages/ClientsManagementPage';
import CreateTicketPage from './pages/CreateTicketPage';
import CreateExternalTicketPage from './pages/CreateExternalTicketPage';
import CreateInternalTicketPage from './pages/CreateInternalTicketPage';
import CreateBranchTicketPage from './pages/CreateBranchTicketPage';
import AppointmentSchedulingPage from './pages/AppointmentSchedulingPage';
import ServicesManagementPage from './pages/ServicesManagementPage';

/**
 *
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="tickets/new/external" element={<CreateExternalTicketPage />} />
        <Route path="tickets/new/internal" element={<CreateInternalTicketPage />} />
        <Route path="tickets/new/branch" element={<CreateBranchTicketPage />} />
        <Route path="appointments" element={<AppointmentSchedulingPage />} />
        <Route path="/" element={<Sidebar />}>
          <Route path="tickets" element={<TicketManagementPage />} />
          <Route path="tickets/new" element={<CreateTicketPage />} />
          <Route path="clients" element={<ClientsManagementPage />} />
          <Route path="services" element={<ServicesManagementPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
