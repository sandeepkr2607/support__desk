const express = require('express')
const router = express.Router({ mergeParams: true })

// mergeParams

const { getNotes, createNote } = require('../controller/noteController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getNotes).post(protect, createNote)
module.exports = router

// /api/tickets/:ticketId/notes