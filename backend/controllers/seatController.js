const seatModel =
    require("../models/seatModel");

function getSeats(req, res) {

    const busId = req.params.busId;

    const seats =
        seatModel.getSeats(busId);

    res.json({
        success: true,
        seats
    });
}


function selectSeat(req, res) {

    const { busId, seatNumber } = req.body;

    const result =
        seatModel.selectSeat(
            busId,
            seatNumber
        );

    res.json(result);
}


module.exports = {
    getSeats,
    selectSeat
};