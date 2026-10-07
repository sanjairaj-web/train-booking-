const trainModel =
    require("../models/trainModel");


function searchTrains(req, res) {

    const { from, to, date } =
        req.query;


    const trains =
        trainModel.searchTrains(
            from,
            to,
            date
        );


    res.json({

        success: true,

        count: trains.length,

        trains

    });

}


function getTrain(req, res) {

    const train =
        trainModel.getTrainById(
            req.params.id
        );


    if (!train) {

        return res.status(404).json({

            success: false,

            message: "Train not found"

        });

    }


    res.json({

        success: true,

        train

    });

}


module.exports = {

    searchTrains,

    getTrain

};