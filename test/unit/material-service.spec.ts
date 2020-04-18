import InMemoryDatabaseClient from '../../src/app/client/in-memory-database-client';
import { Material } from '../../src/app/model/material';
import sinon, { SinonSandbox } from 'sinon';
import MaterialService from '../../src/app/service/material-service';
import { expect } from 'chai';

describe('Material service', () => {
    const sandbox: SinonSandbox = sinon.createSandbox();
    const materialService: MaterialService = new MaterialService();

    it('should get materials from the database', async () => {
        const mockedMaterialsFromDatabase: Material[] = [
            { code: 'xyz1', description: 'Description of xyz1', stock: 100, avgUsage: 25, safetyStock: 50 },
            { code: 'xyz2', description: 'Description of xyz2', stock: 150, avgUsage: 55, safetyStock: 75 }
        ]
        sandbox.stub(InMemoryDatabaseClient.prototype, 'getMaterials').resolves(mockedMaterialsFromDatabase);

        const result = await materialService.getMaterials();

        expect(result).to.eql(mockedMaterialsFromDatabase);
    })
})
