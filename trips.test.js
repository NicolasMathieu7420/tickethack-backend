const request = require('supertest');
const app = require('./app');

// Get trips, retourne la liste des trajets pour une combinaison, départ, arrivée, date de départ
it('/GET trips?departure&arrivale&date', async () => {

    const res = await request(app).get('/trips?departure=Paris&arrival=Lyon&date=2026-11-03');

    expect(res.body.result).toBe(true);
    expect(res.body.tripExisting.length).toEqual(22);

});

// Get trips, aucun résultat si les gares sont inconnues
it('/GET trips?departure&arrivale&date', async () => {

    const res = await request(app).get('/trips?departure=Madrid&arrival=Valence&date=2026-11-03');

    expect(res.body.result).toBe(false);
    expect(res.body.error).toBe('No trip found')
});
