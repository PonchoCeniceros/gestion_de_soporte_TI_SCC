import express from 'express';
import { getAllTickets, createTicket, updateTicketStatus, assignTicket } from './controllers';

const router = express.Router();

router.get('/', getAllTickets);
router.post('/', createTicket);
router.patch('/:id/status', updateTicketStatus);
router.patch('/:id/assign', assignTicket);

export default router;
