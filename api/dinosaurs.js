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
    console.log(req.params.id)
    console.log(dinoID);

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


//PUT /:id - routes to an updated dino by id


//DELETE /:id - sends back a success message if the dino with the given id is deleted