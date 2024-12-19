const express = require('express');
const router = express.Router();
const reservationController = require('../../controllers/reservations/reservationController');
const validate = require('../../middlewares/validate');
const reservationSchema = require('../../validationSchemas/reservations/reservationSchema');
const authenticateToken = require('../../middlewares/authenticateToken');
const checkRole = require('../../middlewares/checkRole');
const logAudit = require('../../middlewares/auditLogger');

// Get all reservations
router.get('/', authenticateToken, checkRole(['Admin', 'Manager', 'Driver']), logAudit, reservationController.getAll);

// Get one reservation by ID
router.get('/:id', authenticateToken, checkRole(['Admin', 'Manager', 'Driver']), logAudit, reservationController.getById);

// Create a new reservation
router.post('/', authenticateToken, checkRole(['Admin', 'Driver', 'Driver']), validate(reservationSchema), logAudit, reservationController.create);

// Update a reservation
router.put('/:id', authenticateToken, checkRole(['Admin', 'Driver', 'Driver']), validate(reservationSchema), logAudit, reservationController.update);

// Delete a reservation
router.delete('/:id', authenticateToken, checkRole(['Admin', 'Driver', 'Driver']), logAudit, reservationController.delete);

module.exports = router;
