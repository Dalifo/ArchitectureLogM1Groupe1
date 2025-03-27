import { WebSocket, WebSocketServer } from "ws";
import { MissionControl } from "../missionControl/MissionControl.js";
import { Map } from "../rover/Map.js";
import { Rover } from "../rover/Rover.js";
import { checkForObstacle, generateMapString, sendJsonResponse } from "../utils/utlis.js";

export function startPassiveListener(rover: Rover, world: Map, missionControl: MissionControl) {
  const wss = new WebSocketServer({ port: 3001 });

  function broadcastMap() {
    const mapData = {
      type: "map",
      mapVisualization: generateMapString(rover, world),
      roverDirection: rover.getOrientation()
    };
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(mapData));
      }
    });
  }

  wss.on("connection", (ws: WebSocket) => {
    console.log("Nouveau client WebSocket connecté !");
    
    sendJsonResponse(ws, { type: "map", mapVisualization: generateMapString(rover, world) });

    ws.on("message", (data: string) => {
      try {
        const command = data.toString().trim();
        if (!command || typeof command !== "string") {
          throw new Error("Commande invalide : doit être une chaîne de caractères");
        }

        const obstaclePosition = checkForObstacle(rover, world, command);
        if (obstaclePosition) {
          sendJsonResponse(ws, { type: "error", error: `Obstacle rencontré à la position (${obstaclePosition.x}, ${obstaclePosition.y})` });
          return;
        }

        const result = missionControl.executeCommands(command);

        broadcastMap();

        sendJsonResponse(ws, { type: "success", message: "Commandes exécutées", result });
      } catch (error) {
        sendJsonResponse(ws, { type: "error", error: (error as Error).message });
      }
    });

    ws.on("close", () => console.log("Client WebSocket déconnecté"));
  });

  console.log("✅ Serveur WebSocket actif sur ws://localhost:3001");
  
  return wss;
}