import fastify from "fastify";
import cors from '@fastify/cors'

const server = fastify({ logger: true });

server.register(cors, {
    origin: "*",
    methods: ["GET", "POST"]
});

const teams = [
    { id: 1, name: "McLaren", base: "Woking, United Kingdom" },
    { id: 2, name: "Mercedes", base: "Brackley, United Kingdom" },
    { id: 3, name: "Red Bull", base: "Milton Keynes, United Kingdom" },
    { id: 4, name: "Ferrari", base: "Maranello, Italy" },
    { id: 5, name: "Alpine", base: "Enstone, United Kingdom" },
    { id: 6, name: "Aston Martin", base: "Silverstone, United Kingdom" },
    { id: 7, name: "Haas", base: "Kannapolis, United States" },
    { id: 8, name: "AlphaTauri", base: "Faenza, Italy" },
    { id: 9, name: "Alfa Romeo", base: "Hinwil, Switzerland" },
    { id: 10, name: "Williams", base: "Grove, United Kingdom" }
];

const drivers = [
    { id: 1, name: "Oscar Piastri", team: "McLaren" },
    { id: 2, name: "Lando Norris", team: "McLaren" },
    { id: 3, name: "Max Verstappen", team: "Red Bull Racing" },
    { id: 4, name: "George Russell", team: "Mercedes" },
    { id: 5, name: "Charles Leclerc", team: "Ferrari" },
    { id: 6, name: "Lewis Hamilton", team: "Ferrari" },
    { id: 7, name: "Kimi Antonelli", team: "Mercedes" },
    { id: 8, name: "Alexander Albon", team: "Williams" },
    { id: 9, name: "Nico Hülkenberg", team: "Sauber" },
    { id: 10, name: "Isack Hadjar", team: "Racing Bulls" }
];

server.get("/teams", async (request, response) => {
    response.type("application/json").code(200);
    return { teams };
});

server.get("/drivers", async (request, response) => {
    response.type("application/json").code(200);
    return { drivers };
});

interface DriverParams {
    id: string;
}

server.get<{Params: DriverParams}> ("/drivers/:id",
    async (request, response) => {
    const id = parseInt(request.params.id);
    const driver = drivers.find( d => d.id === id)
    if(!driver){
        response.type("application/json").code(404);
        return {message: "Driver Not Found"}
    } else {
        response.type("application/json").code(200);
        return { driver }
    }
    });

server.listen({ port: 3333 }, () => {
    console.log("Server init");
});
