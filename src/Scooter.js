class Scooter{
  // scooter code here
  static nextSerial = 1;

  constructor(station) {
    this.station = station;
    this.user = null;
    this.serial = Scooter.nextSerial++;
    this.charge = 100;
    this.isBroken = false;
  }

  rent(user) {
    if (this.charge >= 20 && !this.isBroken) {
      this.user = user;
      this.station = null;
    } else {
      if (this.isBroken) {
        throw new Error("Scooter needs repair");
      } else {
        throw new Error("Scooter needs to charge");
      }
    }
  }

  dock(station) {
    this.station = station;
    this.user = null;
  }
  async recharge() {
    console.log('Starting charge');
    
    await new Promise(resolve => setTimeout(resolve, 2000)); // wait 2 seconds
    this.charge = 100

    console.log('Charge complete');   
}

  async requestRepair(){
    console.log('requesting Repair....');
    await new Promise(resolve => setTimeout(resolve, 5000)); // wait 5 seconds
    this.isBroken = false;
    console.log('Repair Complete')

  }

}


module.exports = Scooter
