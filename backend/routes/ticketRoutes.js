const express = require('express')
const router = express.Router()
const { getTicket, createTicket, getOneTicket, deleteTicket, updateTicket } = require('../controller/ticketController')

const { protect } = require('../middleware/authMiddleware')

// Re-router into note router
const noteRouter = require('./noteRoutes')
router.use('/:ticketId/notes', noteRouter)

// router.post('/', registerUser) , alteranative point as,...
router.route('/').get(protect, getTicket).post(protect, createTicket)

router.route('/:id').get(protect, getOneTicket).delete(protect, deleteTicket).put(protect, updateTicket)
// router.get('/', getTicket)
// router.post('/', createTicket)


module.exports = router