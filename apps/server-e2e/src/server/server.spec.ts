import axios from 'axios';

const payload = {
  apparelType: 'T-Shirt',
  material: 'Light',
  color: 'White',
  customText: 'Something',
  customImage: '',
  currency: 'CAD',
};

describe('AppController (e2e)', () => {
  it('/apparel (GET) - should return 404 when no apparel is found', async () => {
    try {
      await axios.get(`/apparel`);
    } catch (error) {
      expect(error.status).toBe(404);
    }
  });

  it('/apparel (POST) - should save an apparel', async () => {
    const res = await axios.post(`/apparel`, payload);
    expect(res.status).toBe(201);
  });

  it('/apparel (GET) - should return the saved apparel', async () => {
    const res = await axios.get(`/apparel`);
    expect(res.status).toBe(200);
    expect(res.data).toEqual(payload);
  });

  it('/exchange-rates (GET) - should return exchange rates', async () => {
    const res = await axios.get(`/exchange-rates`);
    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty('success', true);
    expect(res.data).toHaveProperty('rates.USD');
  });
});
