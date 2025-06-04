import express from "express";
const app = express();
export default app;
import dinosRouter from "./api/dinosaurs.js";
import erasRouter from "./api/era.js";


app.use(express.json());

app.use("/dinosuars", dinosRouter);

app.use("/eras", erasRouter);

app.use((err, req, res, next)=>{
    console.error(err);
    res.status(500).send(`Sorry! Something went wrong!`);
});