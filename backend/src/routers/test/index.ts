import { Router, Request, Response } from 'express';

export default class Test {
    public router: any;

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', this.data);
    }

    private data = async (req: Request, res: Response) => {
        return res.status(200).send({data: "Hello world!"});
    }

    public build() {
        return this.router;
    }
}