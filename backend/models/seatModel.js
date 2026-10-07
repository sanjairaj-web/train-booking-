const seats = {

    101: [
        { number: "A1", available: true },
        { number: "A2", available: true },
        { number: "A3", available: false },
        { number: "B1", available: true },
        { number: "B2", available: true }
    ]

};


function getSeats(busId) {

    return seats[busId] || [];

}


function selectSeat(busId, seatNumber) {

    const busSeats = seats[busId];

    if (!busSeats) {

        return {
            success: false,
            message: "Bus not found"
        };

    }


    const seat =
        busSeats.find(
            s => s.number === seatNumber
        );


    if (!seat) {

        return {
            success: false,
            message: "Seat not found"
        };

    }


    if (!seat.available) {

        return {
            success: false,
            message: "Seat already booked"
        };

    }


    seat.available = false;


    return {
        success: true,
        message: "Seat selected",
        seat
    };

}


module.exports = {
    getSeats,
    selectSeat
};