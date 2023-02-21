//  making controller for the different point such as createTicket,getTicket

const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')


// @desc Get user Ticket
// @dsec GET /api/tickets
// @access Private
const getTicket = asyncHandler(async (req, res) => {
    // Get user using the id in the jwt
    const user = await User?.findById(req.user.id)
    if (!user) {
        return res.status(401).json({ message: 'User not found' })

    }
    const tickets = await Ticket?.find({ user: req.user.id })

    return res.status(200).json(tickets)
})
// @desc Get user Ticket
// @dsec GET /api/tickets/:id
// @access Private
const getOneTicket = asyncHandler(async (req, res) => {
    // Get user using the id in the jwt
    const user = await User?.findById(req.user.id)
    if (!user) {
        return res.status(401).json({ message: 'User not found' })

    }
    const ticket = await Ticket?.findById(req.params.id)

    if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" })
    }
    if (ticket.user.toString() !== req.user.id) {
        return req.status(401).json({ message: "Not Authorized" })
    }
    return res.status(200).json(ticket)
})


// @desc Delete ticket
// @dsec Delete /api/tickets/:id
// @access Private
const deleteTicket = asyncHandler(async (req, res) => {
    // Get user using the id in the jwt
    const user = await User?.findById(req.user.id)
    if (!user) {
        return res.status(401).json({ message: 'User not found' })

    }
    const ticket = await Ticket?.findById(req.params.id)

    if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" })
    }
    if (ticket.user.toString() !== req.user.id) {
        return req.status(401).json({ message: "Not Authorized" })
    }
    await ticket.remove()
    return res.status(200).json({ success: "Ticket has been deleted" })
})


// @desc Update Ticket
// @dsec PUT /api/tickets/:id
// @access Private
const updateTicket = asyncHandler(async (req, res) => {
    // Get user using the id in the jwt
    const user = await User?.findById(req.user.id)
    if (!user) {
        return res.status(401).json({ message: 'User not found' })

    }
    const ticket = await Ticket?.findById(req.params.id)

    if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" })
    }
    if (ticket.user.toString() !== req.user.id) {
        return req.status(401).json({ message: "Not Authorized" })
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })
    return res.status(200).json(updatedTicket)
})


// @desc Create user Ticket
// @dsec POST /api/tickets
// @access Private
const createTicket = asyncHandler(async (req, res) => {
    const { product, description } = req.body;
    if (!product || !description) {
        return res.status(400).json({ message: 'Please add a product and description' })
    }
    const user = await User?.findById(req.user.id)
    if (!user) {
        return res.status(401).json({ message: 'User not found' })
    }
    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: 'new'
    })

    return res.status(201).json(ticket)
})
module.exports = {
    getTicket, createTicket,
    getOneTicket,
    deleteTicket,
    updateTicket
}