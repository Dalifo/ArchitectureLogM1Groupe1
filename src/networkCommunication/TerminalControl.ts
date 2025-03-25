import { spawn } from "child_process";

const startCommandListeningTerminal = () => {
    const commandProcess = spawn('cmd', ['/c', 'node', 'dist/networkCommunication/TerminalControlListening.js'], {
      stdio: 'inherit',
      detached: true,
      shell: true
    });
  
    commandProcess.on('error', (err) => {
      console.error("Erreur lors de l'ouverture du terminal de commandes :", err);
    });
  
    console.log("Un autre terminal est maintenant prêt à recevoir les commandes.");
  };
  

startCommandListeningTerminal();
