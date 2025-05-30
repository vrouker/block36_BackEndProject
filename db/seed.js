import db from "../client.js";
import { createDinosaur} from "./queries/dinosaurs.js";
import { createEra } from "./queries/era.js";

await db.connect();
await seedDinosaurs();
await seedEras(); 
await db.end();
console.log(`database seeded`);


async function seedEras(){
    await createEra({
        name:"Late Cretaceous",
        years_ago: 145500000
    });

    await createEra({
        name: "Early Cretaceous",
        years_ago: 67000000
    });

    await createEra({
        name: "Late Jurassic",
        years_ago: 150000000
    });

    await createEra({
        name: "Late Triasic",
        years_ago:210000000
    });

    await createEra({
        name: "Early Jurassic",
        years_ago: 184000000
    });
}

async function seedDinosaurs(){
    await createDinosaur({
        name: "Trex",
        mass: 15000,
        lifespan: 30,
        diet: "Carnivore",
        era_id:1
    });

    await createDinosaur({
        name: "Triceatops",
        mass: 20000, 
        lifespan: 30,
        diet: "Herbivore",
        era_id:2
    });

    await createDinosaur({
        name: "Velociraptor",
        mass: 16, 
        lifespan: 17,
        diet: "Carnivore",
        era_id: 1
    });

    await createDinosaur({
        name: "Ankylosaurus",
        mass: 11000,
        lifespan: 50, 
        diet: "Herbivore",
        era_id: 1
    });

    await createDinosaur({
        name: "Brontosaurus",
        mass: 77162,
        lifespan: 75, 
        diet: "Herbivore",
        era_id:3
    });

    await createDinosaur({
        name: "Plateosaurus",
        mass: 6000,
        lifespan: 17,
        diet: "Herbivore",
        era_id: 4
    });

    await createDinosaur({
        name: "Dilophosaurus",
        mass: 882,
        lifespan: 75,
        diet: "Carnivore",
        era_id:5
    });
}
