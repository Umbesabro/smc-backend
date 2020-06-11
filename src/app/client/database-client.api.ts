import { Material } from "../model/material";
import { PurchaseOrder } from "../model/purchase-order";

export interface DatabaseClientApi {
    getMaterials(): Promise<Material[]>;
    getPurchaseOrders():Promise<PurchaseOrder[]>;
}
