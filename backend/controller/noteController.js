const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Note = require('../models/nodeModal')
const Ticket = require('../models/ticketModel')

// @desc Get Notes for a ticket
// @dsec GET /api/tickets/:ticketId/notes
// @access Private
const getNotes = asyncHandler(async (req, res) => {
    // Get user using the id in the jwt
    const user = await User?.findById(req.user.id)
    if (!user) {
        return res.status(401).json({ message: 'User not found' })

    }
    const ticket = await Ticket?.findById(req.params.ticketId)
    if (ticket.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorised' })
    }

    const notes = await Note.find({ticket:req.params.ticketId})

    return res.status(200).json(notes)
})

// @desc create note for a ticket
// @dsec POST /api/tickets/:ticketId/notes
// @access Private
const createNote = asyncHandler(async (req, res) => {
    // Get user using the id in the jwt
    const user = await User?.findById(req.user.id)
    if (!user) {
        return res.status(401).json({ message: 'User not found' })

    }
    const ticket = await Ticket?.findById(req.params.ticketId)
    if (ticket.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorised' })
    }

    const note = await Note.create({
        text:req.body.text,
        isStaff:false,
        user:req.user.id,
        ticket:req.params.ticketId})

    return res.status(200).json(note)
})



module.exports= {
    getNotes,
    createNote
}