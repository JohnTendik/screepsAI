class Minion {
  constructor(name) {
    this.name = name;
  }

  getCreep() {
    return Game.creeps[this.name];
  }

  getName() {
    return this.name;
  }
}

module.exports = Minion