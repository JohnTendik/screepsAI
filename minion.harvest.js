const Minion = require('./minion');

class HarvesterMinion extends Minion {
  constructor(name) {
    super(name);
  }

  harvestResource() {
    const target = this.getCreep().pos.findClosestByRange(FIND_SOURCES_ACTIVE);
    if (target) {
      const harvestResult = this.getCreep().harvest(target);
      console.log(harvestResult);
      if (harvestResult == ERR_NOT_IN_RANGE) {
        this.getCreep().moveTo(target);
      }
    }
  }

  transferEnergyToBase() {
    if (this.getCreep().transfer(Game.spawns['Houston'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      this.getCreep().moveTo(Game.spawns['Houston']);
    }
  }

  work() {
    if (!this.getCreep()) {
      console.log('returning');
      return;
    };

    if (this.getCreep().store.getFreeCapacity() > 0) {
      this.harvestResource();
    } else {
      this.transferEnergyToBase();
    }
  }
}

module.exports = HarvesterMinion