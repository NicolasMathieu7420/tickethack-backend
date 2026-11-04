const request = require('supertest');
const app = require('./app');

let cartid
// Post cart, ajout d'un trajet dans le panier
it('/POST cart', async () => {

    const res = await request(app).post('/carts').send({departure:'Paris',arrival:'Lyon',date:'2026-11-03 21:52:00',price:126});

    expect(res.body.result).toBe(true);
    expect(res.body.cart.departure).toEqual('Paris')
    expect(res.body.cart.arrival).toEqual('Lyon');
    expect(res.body.cart.date).toEqual('21:52');
    expect(res.body.cart.price).toEqual(126);

});

// Post booking, commande du panier
it('/POST booking', async () => {

    const res = await request(app).post('/booking');

    expect(res.body.result).toBe(true);
    expect(res.body.bookings[0].departure).toEqual('Paris')
    expect(res.body.bookings[0].arrival).toEqual('Lyon');
    expect(res.body.bookings[0].date).toEqual('21:52');
    expect(res.body.bookings[0].price).toEqual(126);

});

// Get cart, aucun article dans le panier
it('/GET cart nothing', async () => {

    const res = await request(app).get('/carts');

    expect(res.body.result).toBe(false);
    expect(res.body.error).toBe('No ticket in your card');

});
