import WebSocket from "ws";
import readline from "readline";

const socket = new WebSocket('ws://localhost:3001');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

const listenForCommands = () => {
  rl.on('line', (input) => {
    const commands = input.trim().toUpperCase();

    for (const command of commands) {
      if (command === 'F' || command === 'B' || command === 'L' || command === 'R') {
        socket.send(command); 
        console.log(`Commande envoyée : ${command}`);
      } else {
        console.log('Commande non reconnue, utilisez F, B, L ou R.');
      }
    }
  });
};

socket.on('open', () => {
  console.log('WebSocket connecté dans le terminal secondaire !');
  listenForCommands();
});

socket.on('message', (data) => {
    try {
      const message = typeof data === 'string' ? data : (Buffer.isBuffer(data) ? data.toString() : JSON.stringify(data));
      const response = JSON.parse(message);
  
      if (response.type === 'map') {
        console.clear();
        console.log("\n--- Carte actuelle ---");
        console.log(response.mapVisualization);
        console.log("\nDirection du rover :", response.roverDirection ?? 'N');
        console.log('Appuyez sur les touches suivantes pour contrôler le Rover :');
        console.log('F (Avancer)');
        console.log('B (Reculer)');
        console.log('L (Tourner à gauche)');
        console.log('R (Tourner à droite)');
      } else if (response.type === 'success') {
        console.log(`Réponse : ${response.message}`);
      } else if (response.type === 'error') {
        console.log(`Erreur : ${response.error}`);
      }
    } catch (error) {
      console.error('Erreur lors du traitement de la réponse WebSocket :', error);
    }
  });
  
socket.on('error', (error) => {
  console.error('Erreur WebSocket :', error);
});

socket.on('close', () => {
  console.log('Connexion WebSocket fermée');
  rl.close();
});

process.stdin.resume();