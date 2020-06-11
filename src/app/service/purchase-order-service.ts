import { DatabaseClientApi } from '../client/database-client.api';
import { FileDatabaseClient } from '../client/file-database-client';
import { PurchaseOrder } from '../model/purchase-order';

export default class PurchaseOrderService {
    private readonly databaseClient: DatabaseClientApi = new FileDatabaseClient();

    async getPurchaseOrders(): Promise<PurchaseOrder[]> {
        return await this.databaseClient.getPurchaseOrders();
    }
}
