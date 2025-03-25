import { MissionControl } from "./missionControl/MissionControl.js";
import { createHttpServer } from "./networkCommunication/ActiveListener.js";
import { startPassiveListener } from "./networkCommunication/PassiveListener.js";
import { startCommandListeningTerminal } from "./networkCommunication/TerminalControl.js";
import { Map } from "./rover/Map.js";
import { Orientation } from "./rover/Orientation.js";
import { Rover } from "./rover/Rover.js";
import { generateRandomObstacles } from "./utils/utlis.js";

const obstacles = generateRandomObstacles(10, 10, Math.floor(Math.random() * 11));

const world = new Map(10, 10, obstacles);
const rover = new Rover(0, 0, Orientation.North, world);
const missionControl = new MissionControl(rover);

async function startAllServers() {
    await createHttpServer(rover, world, missionControl); 
    startPassiveListener(rover, world, missionControl);
    startCommandListeningTerminal(); 
}

startAllServers().catch((err) => console.error("Erreur lors du démarrage:", err));
