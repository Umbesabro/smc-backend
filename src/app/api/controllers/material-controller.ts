import BaseController from '../endpoint';
import { NextFunction, Request, Response } from 'express';
import MaterialService from '../../service/material-service';

export default class MaterialController extends BaseController {

    public constructor() {
        super('/materials');
        this.Router.get('/getAll', this.getAllMaterials);
    }

    public async getAllMaterials(req: Request, res: Response, next: NextFunction) {
        try {
            const materials = await new MaterialService().getMaterials();
            res.status(200).json(materials);
        } catch (err) {
            next(err);
        }
    }
}
