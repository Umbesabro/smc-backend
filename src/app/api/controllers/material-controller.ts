import BaseController from '../endpoint';
import { NextFunction, Request, Response } from 'express';
import MaterialService from '../../service/material-service';

export default class MaterialController extends BaseController {

    private readonly materialService = new MaterialService();

    public constructor() {
        super('/materials');
        this.Router.get('/all', this.getAllMaterials);
    }

    public getAllMaterials = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const materials = await this.materialService.getMaterials();
            res.status(200).json(materials);
        } catch (err) {
            next(err);
        }
    }
}
