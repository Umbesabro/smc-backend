import { IntegrationTools } from './integration-tools';
import request, { SuperTest, Test } from 'supertest';
import { expect } from 'chai';
import { Material } from '../../src/app/model/material';
import InMemoryDatabaseClient from '../../src/app/client/in-memory-database-client';


describe('Material endpoint integration test', () => {
    const integrationTools: IntegrationTools = new IntegrationTools();
    const app: SuperTest<Test> = request(integrationTools.getApp());

    it('should get all materials as a response of GET request on /materials/getAll', async () => {
        const materials = await new InMemoryDatabaseClient().getMaterials(); // For now because app doesnt use external db, in the future it should mock request to the db

        return app
            .get('/api/v1/materials/getAll')
            .expect(response => {
                expect(response.status).to.eql(200);
                expect(response.body).to.eql(materials);
            })
    });
})
