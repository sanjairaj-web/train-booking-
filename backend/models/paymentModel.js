const payments = [];


function createPayment(data) {

    const payment = {

        id: "PAY" + Date.now(),

        bookingId:
            data.bookingId,

        amount:
            data.amount,

        method:
            data.method,

        status: "SUCCESS"

    };


    payments.push(payment);

    return payment;

}


function getPayment(id) {

    return payments.find(
        payment => payment.id === id
    );

}


module.exports = {
    createPayment,
    getPayment
};