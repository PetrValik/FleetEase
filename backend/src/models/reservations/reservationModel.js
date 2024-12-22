module.exports = {
    tableName: 'Reservations',
    fields: {
        id: 'reservation_id',
        vehicleId: 'vehicle_id',
        userId: 'user_id',
        startTime: 'start_time',
        endTime: 'end_time',
        pickupLocation: 'pickup_location',
        returnLocation: 'return_location',
        reservationStatus: 'reservation_status',
        notes: 'notes',
        createdAt: 'created_at',
    },
};
