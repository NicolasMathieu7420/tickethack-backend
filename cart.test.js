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

// Get cart, retourne la liste des trajets dans le panier
it('/GET cart', async () => {

    const res = await request(app).get('/carts');
    //console.log(res.body.cart)
    cartid = res.body.cart[0]._id

    expect(res.body.result).toBe(true);
    expect(res.body.cart[0].departure).toEqual('Paris')
    expect(res.body.cart[0].arrival).toEqual('Lyon');
    expect(res.body.cart[0].date).toEqual('21:52');
    expect(res.body.cart[0].price).toEqual(126);

});

// Delete cart, supprime un trajet dans le panier
it('/Delete cart', async () => {
    //console.log(cartid)
    const res = await request(app).delete(`/carts/${cartid}`);

    expect(res.body.result).toBe(true);
    expect(res.body.message).toEqual('Trip removed from cart');
});

// Get cart, aucun article dans le panier
it('/GET cart nothing', async () => {

    const res = await request(app).get('/carts');

    expect(res.body.result).toBe(false);
    expect(res.body.error).toBe('No ticket in your card');

});

// Delete cart, aucun article dans le panier
it('/DELETE cart nothing', async () => {

    const res = await request(app).delete('/carts/6ae9f23a9594d5744434e3cf');

    expect(res.body.result).toBe(false);
    expect(res.body.error).toBe('Trip not found in cart');

});

