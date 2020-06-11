import BaseController from '../endpoint';
import MaterialController from './material-controller';
import PurchaseOrderController from './purchase-order-controller';

export default class RootController extends BaseController {
    public constructor() {
        super('/api/v1');
        this.setSubController(new MaterialController());
        this.setSubController(new PurchaseOrderController());
    }
}