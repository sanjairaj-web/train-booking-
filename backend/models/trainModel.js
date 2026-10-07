const trains = [

    {
        id: 1,
        number: "12607",
        name: "Chennai Express",
        from: "Chennai",
        to: "Bangalore",
        departure: "21:00",
        arrival: "05:30",
        fare: 650
    },

    {
        id: 2,
        number: "12639",
        name: "Brindavan Express",
        from: "Chennai",
        to: "Bangalore",
        departure: "07:00",
        arrival: "13:00",
        fare: 550
    }

];


function searchTrains(from, to, date) {

    return trains.filter(train =>

        train.from.toLowerCase() ===
            from.toLowerCase()

        &&

        train.to.toLowerCase() ===
            to.toLowerCase()

    );

}


function getTrainById(id) {

    return trains.find(
        train => train.id === Number(id)
    );

}


module.exports = {

    searchTrains,

    getTrainById

};