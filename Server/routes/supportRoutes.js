const express = require('express');
const router = express.Router();


const{getSupportTickets, getSupportTicket, createTicket, updateTicket, deleteTicket, responseTicket} = require('../controllers/supportController');

router.get('/', getSupportTickets);

router.get('/:id', getSupportTicket);

router.post('/create', createTicket);

router.put('/update', updateTicket);

router.delete('/delete', deleteTicket);

router.post('/response', responseTicket);

module.exports = router;