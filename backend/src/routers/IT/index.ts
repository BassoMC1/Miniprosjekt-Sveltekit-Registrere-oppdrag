import { Router, Request, Response } from 'express';
import DatabaseIT from "../../database/ITProblems";
import DatabaseITProbemId from "../../database/Problemids";


export default class IT {
    public router: any;

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', this.data);
        this.router.post('/new', this.NewOpdrag);
        this.router.delete('/remove', this.RemoveAll);
    }

    private data = async (req: Request, res: Response) => {
        const data = await DatabaseIT.find({}).select('-_id -__v');
        return res.status(200).send({data});
    };
    

    private NewOpdrag = async (req: Request, res: Response) => {
        const { Dato, Name, Produkt, Skildring } = req.body;

        let problemRecord = await DatabaseITProbemId.findOne({});
        if (!problemRecord) {
            problemRecord = new DatabaseITProbemId({id: 1});
            await problemRecord.save();
        }
    
        console.log(problemRecord.id);
        await new DatabaseIT({
            ID: problemRecord.id,
            Dato,
            Name,
            Produkt,
            Skildring
        }).save();
    
        res.status(200).send({data: `Just made a new problem with id ${problemRecord.id}`});
        problemRecord.id++;
        await problemRecord.save();
        return
    }

    private RemoveAll = async (req: Request, res: Response) => {
        const { id } = req.query
        if(id == "all") {
            const data = await DatabaseIT.find({})
            for(let i = 0; i < data.length; i++) {
                console.log(data[i].ID)
                await DatabaseIT.findOneAndDelete({ID: data[i].ID})
            }
            return res.status(200).send({data: "All problems was removed"})
        }
        const data = await DatabaseIT.findOneAndDelete({ID: id})
        if(!data) {
            return res.status(200).send({data: `Cannot find a problem with id ${id} in database`});    
        }

        return res.status(200).send({data: `Deleted problem with the id ${id} from database`});
        
    }

    public build() {
        return this.router;
    }
}