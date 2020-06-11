import { IntegrationTools } from './integration-tools';
import request, { SuperTest, Test } from 'supertest';
import { expect } from 'chai';
import purchaseOrders from '../../data/purchase_orders.json';

describe('Purchase orders endpoint integration test', () => {
    const integrationTools: IntegrationTools = new IntegrationTools();
    const app: SuperTest<Test> = request(integrationTools.getApp());

    it('should get all purchase orders as a response of GET request on /orders/all', async () => {
        return app
            .get('/api/v1/purchase-orders/all')
            .expect(response => {
                expect(response.status).to.eql(200);
                expect(response.body).to.eql(purchaseOrders);
            })
    });
})
