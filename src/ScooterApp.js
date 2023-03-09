const User = require('./User')
const Scooter = require('./Scooter')

class ScooterApp {

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
    // consider checking if the user is already logged in
    if (user) {
      user.login(password);
      console.log(`user has been logged in`);

      // I don't think we need the return of the user here
      return user;
    } else {
      throw new Error(`Username or password is incorrect.`);
    }
  }

  logoutUser(username) {
    // let's complete the logout after checking both the 
    // validity of the username AND whether the user is logged in.
    // right now if the first if is passed, it'll still attempt to logout
    // even if the user isn't logged in
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
    // let's verify that the scooter's station exists beforehand as well.
    // perhaps we can use that scooter.station in checking the stations' 
    // contents as well

    // ooo this is a really clever way to check if any of the stations
    // include the scooter. well done!
    const station = Object.keys(this.stations).find(station =>
      this.stations[station].includes(scooter)
    );
    if (!station) {
      throw new Error("Scooter not found at any station");
    // we can also say that a scooter is rented if the scooter.station is null
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
    // for further user experience, consider more text in the console
    // to explain what is being printed
    console.log(this.registeredUsers)
    console.log(this.stations)
}
}


module.exports = ScooterApp
