import express from 'express';
import { getAllTickets, createTicket, updateTicketStatus, assignTicket, addAttachment } from './controllers';
import upload from './multer.config';

const router = express.Router();

router.get('/', getAllTickets);
router.post('/', createTicket);
router.patch('/:id/status', updateTicketStatus);
router.patch('/:id/assign', assignTicket);
router.post('/:id/attachments', upload.single('attachment'), addAttachment);

export default router;
