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
router.post('/', authenticateToken, checkRole(['Admin', 'Manager', 'Driver']), validate(reservationSchema), logAudit, reservationController.create);

// Update a reservation
router.put('/:id', authenticateToken, checkRole(['Admin', 'Manager', 'Driver']), validate(reservationSchema), logAudit, reservationController.update);

// Delete a reservation
router.delete('/:id', authenticateToken, checkRole(['Admin', 'Manager', 'Driver']), logAudit, reservationController.delete);

// Get all reservations by vehicle ID
router.get('/vehicle/:vehicle_id', authenticateToken, checkRole(['Admin', 'Manager', 'Driver']), logAudit, reservationController.getReservationsByVehicleId);

// Get all vehicles with reservations by user ID
router.get(
  '/vehicles/user/:userId',
  authenticateToken,
  checkRole(['Admin', 'Manager', 'Driver']),
  logAudit,
  reservationController.getVehiclesWithReservationsByUserId
);

// Check if a specific vehicle has an active reservation
router.get(
  '/vehicle/:vehicleId/active',
  authenticateToken,
  checkRole(['Admin', 'Manager', 'Driver']),
  logAudit,
  reservationController.checkVehicleActiveReservation
);

// Check if a specific vehicle is reserved
router.get(
    '/vehicle/:vehicleId/isReserved',
    authenticateToken,
    checkRole(['Admin', 'Manager', 'Driver']),
    logAudit,
    reservationController.isReserved
  );

module.exports = router;
