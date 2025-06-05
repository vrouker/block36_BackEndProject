import express from "express";
const router = express.Router();
export default router;

import { createDinosaur, getAllDinos, updateDino, getDinoById, deleteDino } from "../db/queries/dinosaurs.js";


//GET / - routes to all dinos
router.route("/").get(async(req, res)=>{
    const dinosaurs = await getAllDinos();
    res.send(dinosaurs);
});




//GET /:id - routes to a dino with a given id
router.route("/:id").get(async(req,res)=>{
    const dinoID = req.params.id;

    //if the ID is not a valid integer
    if (!Number.isInteger(dinoID) && dinoID <0){
        return res.status(400).send({error:`Please use a valid number for the ID.`})
    };

    const dinosaur = await getDinoById(dinoID);

    //if the ID does not exist
    if (!dinosaur){
        return res.status(404).send({error: `Dinosaur ID not found`})
    };

    res.send(dinosaur);
});





//POST / - routes to a created dino
router.route("/").post(async(req,res)=>{
    if (!req.body){
        return res.status(400).send({error: `Missing req.body.`})
    };

    const {name, mass, lifespan, diet, era_id} = req.body;

    if (!name || !mass || !lifespan || !diet || !era_id){
        return res.status(400).send({error: `Missing required params.`})
    };

    const dinosaur = await createDinosaur({name, mass, lifespan, diet, era_id});

    res.status(201).send(dinosaur);
});





//PUT /:id - routes to an updated dino by id
router.route("/:id").put(async(req, res)=>{
    const id = req.params.id;

    if (!req.body){
        return res.status(400).send({error: `Please send more details.`})
    };

    const {name, mass, lifespan, diet, era_id} = req.body;

    if (!name || !mass || !lifespan || !diet || !era_id){
        return res.status(400).send({error: `Missing required params.`})
    };

    if (!Number.isInteger(id) && id < 0){
        return res.status(400).send({error: `Please use a valid number for the ID.`})
    };

    const dinosaur = await getDinoById(id);

    if (!dinosaur){
        return res.status(404).send({error: `Dinosaur not found.`})
    };

    const updatedDino = await updateDino({id, name, mass, lifespan, diet, era_id});

    res.send({updateDino});
})





//DELETE /:id - sends back a success message if the dino with the given id is deleted
router.route("/:id").delete(async(req, res)=>{
    const id = req.params.id;

    if (!Number.isInteger(id) && id < 0){
        return res.status(400).send({error: `Please use a valid number for the ID.`})
    };

    const deletedDino = await deleteDino(id);

    if (!deletedDino){
        return res.status(404).send({error: `Dinosaur not found.`})
    };

    res.sendStatus(204);
})