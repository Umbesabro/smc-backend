import { Material } from '../model/material';
import { DatabaseClientApi } from '../client/database-client.api';
import { FileDatabaseClient } from '../client/file-database-client';
export default class MaterialService {
    private readonly databaseClient:DatabaseClientApi = new FileDatabaseClient();

    async getMaterials():Promise<Material[]> {
        return await this.databaseClient.getMaterials();
    }
}
