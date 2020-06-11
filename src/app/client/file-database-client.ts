import { DatabaseClientApi } from './database-client.api';
import { Material } from '../model/material';
import fs from 'fs';
import Config from '../configuration/config';
import { PurchaseOrder } from '../model/purchase-order';

export class FileDatabaseClient implements DatabaseClientApi {

    private readonly materialsFilePath = `${Config.instance().AppRootPath}/data/materials.json`;
    private readonly purchaseOrdersFilePath = `${Config.instance().AppRootPath}/data/purchase_orders.json`;

    public getMaterials(): Promise<Material[]> {
        const jsonMaterials: string = fs.readFileSync(this.materialsFilePath).toString('utf8');
        return JSON.parse(jsonMaterials);
    }

    public  getPurchaseOrders(): Promise<PurchaseOrder[]> {
        const jsonPurchaseOrders: string = fs.readFileSync(this.purchaseOrdersFilePath).toString('utf8');
        return JSON.parse(jsonPurchaseOrders);
    }
}
