import { IntegrationTools } from './integration-tools';
import request, { SuperTest, Test } from 'supertest';
import { expect } from 'chai';
import materials from '../../data/materials.json';

describe('Material endpoint integration test', () => {
    const integrationTools: IntegrationTools = new IntegrationTools();
    const app: SuperTest<Test> = request(integrationTools.getApp());

    it('should get all materials as a response of GET request on /materials/all', async () => {
        return app
            .get('/api/v1/materials/all')
            .expect(response => {
                expect(response.status).to.eql(200);
                expect(response.body).to.eql(materials);
            })
    });
})
