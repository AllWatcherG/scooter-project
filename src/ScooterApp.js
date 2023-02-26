const User = require('./User')
const Scooter = require('./Scooter')

class ScooterApp {
  // ScooterApp code here
  constructor() {
    this.stations = {
      "Los Santos Station": [],
      "The Scorpions Station": [],
      "Parker Station": []
    };
    this.registeredUsers = {};
  }
  registerUser(username, password, age) {
    if (this.registeredUsers[username]) {
      throw new Error("User already registered");
    } else if (age < 18) {
      throw new Error("User is too young to register");
    } else {
      const newUser = new User(username, password, age);
      this.registeredUsers[username] = newUser.username;
      console.log("User has been registered");
      return newUser;
    }
  }
  loginUser(username, password) {
    const user = this.registeredUsers[username];
    if (user) {
      login(password);
      console.log("User has been logged in");
    } else {
      throw new Error("Username or password is incorrect");
    }
  }
  logoutUser(username) {
    const user = this.registeredUsers[username];
    if (user) {
      user.logout();
      console.log("User is logged out");
    } else {
      throw new Error("No such user is logged in");
    }
  }
  createScooter(station) {
    if (!this.stations[station]) {
      throw new Error("No such station exists");
    } else {
      const newScooter = new Scooter(station);
      this.stations[station].push(newScooter);
      console.log("Created new scooter");
      return newScooter;
    }
  }

  dockScooter(scooter, station) {
    if (!this.stations[station]) {
      throw new Error("No such station exists");
    } else if (this.stations[station].includes(scooter)) {
      throw new Error("Scooter already at station");
    } else {
      this.stations[station].push(scooter);
      scooter.dock(station);
      console.log("Scooter is docked");
    }
  }

  rentScooter(scooter, user) {
    const station = Object.keys(this.stations).find(station =>
      this.stations[station].includes(scooter)
    );
    if (!station) {
      throw new Error("Scooter not found at any station");
    } else if (scooter.user) {
      throw new Error("Scooter already rented");
    } else {
      const index = this.stations[station].indexOf(scooter);
      this.stations[station].splice(index, 1);
      scooter.rent(user);
      console.log("Scooter is rented");
    }
  }

  print() {
    console.log("Registered users:");
    Object.values(this.registeredUsers).forEach(user => console.log(user));
    console.log("Stations:");
    Object.entries(this.stations).forEach(([station, scooters]) =>
      console.log(`${station}: ${scooters.length} scooters`)
    );
  }
}

module.exports = ScooterApp
