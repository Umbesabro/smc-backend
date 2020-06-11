import BaseController from '../endpoint';
import { NextFunction, Request, Response } from 'express';
import PurchaseOrderService from '../../service/purchase-order-service';

export default class PurchaseOrderController extends BaseController {

    private readonly purchaseOrderService = new PurchaseOrderService();

    public constructor() {
        super('/purchase-orders');
        this.Router.get('/all', this.getAllOrders);
    }

    public getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orders = await this.purchaseOrderService.getPurchaseOrders();
            res.status(200).json(orders);
        } catch (err) {
            next(err);
        }
    }
}
