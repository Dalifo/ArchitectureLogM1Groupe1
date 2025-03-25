import { existsSync, readFileSync } from "fs";
import { createServer, IncomingMessage, ServerResponse } from "http";
import path from "path";
import { MissionControl } from "../missionControl/MissionControl.js";
import { Map } from "../rover/Map.js";
import { Orientation } from "../rover/Orientation.js";
import { Rover } from "../rover/Rover.js";
import { checkForObstacle, generateRandomObstacles } from "../utils/utlis.js";

const obstacleCount = Math.floor(Math.random() * 11);
const obstacles = generateRandomObstacles(10, 10, obstacleCount);

const world = new Map(10, 10, obstacles);
const rover = new Rover(0, 0, Orientation.North, world);
const missionControl = new MissionControl(rover);

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    const filePath = path.join("public", req.url ?? "");

    if (req.method === "GET" && req.url === "/") {
        const html = readFileSync("public/index.html", "utf8");
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(html);
    } 
    else if (req.method === "GET" && req.url === "/index.css") {
        if (existsSync(filePath)) {
            const css = readFileSync(filePath, "utf8");
            res.writeHead(200, { "Content-Type": "text/css; charset=utf-8" });
            res.end(css);
        } else {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("CSS file not found");
        }
    } 

    else if (req.method === "POST" && req.url === "/command") {
        let body = "";
        req.on("data", (chunk) => (body += chunk.toString()));
        req.on("end", () => {
            try {
                const { command } = JSON.parse(body);
                const obstaclePosition = checkForObstacle(rover, world, command);
                if (obstaclePosition) {
                    res.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
                    res.end(JSON.stringify({ error: `Obstacle rencontré à la position (${obstaclePosition.x}, ${obstaclePosition.y})` }));
                    return;
                }

                const result = missionControl.executeCommands(command);
                res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
                res.end(JSON.stringify({ message: "Commande exécutée", result }));
            } catch (error) {
                res.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
                res.end(JSON.stringify({ error: (error as Error).message }));
            }
        });
    } 
    else {
        res.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify({ error: "Route non trouvée" }));
    }
});

server.listen(3000, () => console.log("✅ Serveur HTTP actif sur http://localhost:3000"));

export { missionControl, rover, world };

