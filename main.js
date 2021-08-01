const GameManager = require('game-manager');
const GM = new GameManager();


// Main loop. Execute once every tick.
module.exports.loop = function () {
  
  // Clean up memory
  GM.cleanUpMemory(Memory);

  // Spawn creeps
  GM.spawnCreeps();

  // Work
  GM.workTheCreeps();
}