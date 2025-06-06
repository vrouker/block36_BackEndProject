import express from "express";
import { createEra, deleteEra, getAllEras, getEraById, updateEra } from "../db/queries/era.js";
const router = express.Router();
export default router;

//GET /
    router.route("/").get(async(req, res)=>{
        const eras = await getAllEras();

        res.send(eras);
    });




//GET /:id
    router.route("/:id").get(async(req, res)=>{
        const id = req.params.id;

        if (!Number.isInteger(id) && id < 0){
            return res.status(400).send({error: `Please use a valid number for the ID.`})
        };

        const era = await getEraById(id);

        if (!era){
            return res.status(404).send({error: `Era not found.`})
        };

        res.send(era);
    });




//POST /
    router.route("/").post(async(req,res)=>{
        if (!req.body){
            return res.status(400).send({error: `Please send more details.`})
        };

        const {name, years_ago} = req.body;

        if (!name || !years_ago){
            return res.status(400).send({error: `Misisng required params.`})
        };

        const era = await createEra({name, years_ago});

        res.status(201).send(era);
    })




//PUT /:id
    router.route("/:id").put(async(req, res)=>{
        const id = req.params.id;


        if(!req.body){
            return res.status(400).send({error: `Please send more details.`})
        };

        const {name, years_ago} = req.body;
        
        if (!name || !years_ago){
            return res.status(400).send({error: `Missing required fields.`})
        };

        if(!Number.isInteger(id) && id < 0){
            return res.status(400).send({error: `Please use a valid number for the ID.`})
        };

        const era = await getEraById(id);

        if (!era){
            return res.status(404).send({error: `Era not found`})
        };

        const updatedEra = await updateEra({id, name, years_ago});

        res.send({updatedEra});
    });



//DELETE /:id
    router.route("/:id").delete(async(req,res)=>{
        const id = req.params.id;

        if (!Number.isInteger(id) && id < 0){
            return res.status(400).send({error: `Please use a valid number for the ID.`})
        };

        const deletedEra = await deleteEra(id);

        if (!deletedEra){
            return res.status(404).send({error: `Era not found.`})
        };

        res.sendStatus(204);
    })