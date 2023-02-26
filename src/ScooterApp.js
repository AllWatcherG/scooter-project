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
      this.registeredUsers[username] = newUser;
      console.log("User has been registered");
      return newUser;
    }
  }
  loginUser(username, password) {
    const user = this.registeredUsers[username];
    if (user) {
      user.login(password);
      console.log(`user has been logged in`);
      return user;
    } else {
      throw new Error(`Username or password is incorrect.`);
    }
  }
  logoutUser(username) {
    if(this.registeredUsers[username] !== undefined) {
        this.registeredUsers[username].logout()
        console.log(`${username} has been logged out`)
    }else if(user.loggedIn === false) {
        throw new Error(`user isn't logged in`)
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
    console.log(this.registeredUsers)
    console.log(this.stations)
}
}


module.exports = ScooterApp
