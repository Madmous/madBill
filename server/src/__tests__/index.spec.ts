import request from 'supertest';

import startServer from '../index';

const aPayload = (props: any) => {
  const defaultPayload = {
    billTo: '2 Avenue Madmous',
    dueDate: '02/02/2019',
    from: 'Dakar',
    invoiceDate: '02/02/2019',
    invoiceNumber: 'AS33',
    items: [
      {
        amount: 1,
        description: 'mango',
        quantity: 1,
        unitPrice: 1,
      },
    ],
    shipTo: 'Paris',
  };

  return {
    ...defaultPayload,
    ...props,
  };
};

describe.skip('POST /save-invoice', () => {
  [{}, aPayload({ from: 2 })].forEach(payload => {
    it('should not work when payload is either missing or not correct', done => {
      request(startServer)
        .post('/save-invoice')
        .send(payload)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toContain('fails because');
          done();
        });
    });
  });

  it('should work when payload is correct', done => {
    request(startServer)
      .post('/save-invoice')
      .send(aPayload({}))
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(_ => {
        done();
      });
  });
});
