const gameConfig = require('game-config');

const HarvesterMinion = require('./minion.harvest');

class GameManager {
  constructor() {

  }

  /**
   * This function looks into the global memory object and removes
   * and unused variables or resourses to save on CPU / resourse usage
   * 
   * @param {Object} Memory - Memory global object
   */
  cleanUpMemory(Memory) {
    // Clean up any left over creep objects that are no longer alive
    if (Memory.creeps) {
      Object.keys(Memory.creeps).map((name) => {
        if (!Game.creeps[name]) {
          delete Memory.creeps[name];
          delete this.creeps[name];
          console.log('Clearing non-existing creep memory:', name);
        }
      });
    }
  }

  /**
   * Check if the number of creeps required are spawned
   */
  spawnCreeps() {
    const creepList = Game.creeps;
    const harvesters = Object.keys(creepList).filter((creepKey) => creepList[creepKey].memory.role === 'harvester');


    if (Object.keys(this.creeps).length < Object.keys(creepList).length) {
      Object.keys(Game.creeps).forEach((creepName) => {
        if (!this.creeps[creepName]) {
          const creepRole = Game.creeps[creepName].memory.role;
          
          if (creepRole === 'harvester') {
            const newHarvester = new HarvesterCreep(creepName);
            this.creeps[newHarvester.getName()] = newHarvester;
          }
        }
      });
    }

    // If there are not enough harvesters, spawn them
    if (harvesters.length < gameConfig.harvesterCount) {
      console.log('Not enough harvesters, creating 1');
      
      // spawn creep
      const result = this.home.spawnCreep([WORK, CARRY, MOVE, MOVE], `Harvester${harvesters.length + 1}`, {
        memory: { role: 'harvester' }
      });
      
      if (result === OK) {
        const newHarvester = new HarvesterCreep();
        this.creeps[newHarvester.getName()] = newHarvester;
      }
    }
  }

  /**
   * Work creeps
   */
  workTheCreeps() {
    Object.values(this.creeps).forEach(creep => {
      creep.work();
    });
  }
}

module.exports = GameManager;