const Scooter = require('../src/Scooter')
const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')
 

// when writing out tests, make sure to not only include testing the happy path, 
// but also each of the error scenarios for a more thorough test suite
describe('ScooterApp', () => {
  let app;
  
  // love this beforeEach!
  beforeEach(() => {
    app = new ScooterApp();
  });

  describe('registerUser', () => {
    it('should register a new user', () => {
      // rip lil peep :(
      const user = app.registerUser('LilPeep', 'starSh0pping', 25);
      expect(user.username).toBe('LilPeep');
      expect(user.age).toBe(25);
      expect(user.password).toBe('starSh0pping');
      expect(app.registeredUsers['LilPeep']).toBe(user);
    });
  })

  describe("loginUser", () => {
    // beforeEach is great for when you have multiple tests in a describe
    // that need the same starting conditions. for this (and below describes),
    // I'm not sure if we need the beforeEach - it may be better to put the
    // registerUser in the test until there are multiple tests in the describe
    beforeEach(() => {
      app.registerUser("Yeat", "shmoney", 25);
    });

    test("logging in works as intended", () => {
      const user = app.loginUser("Yeat", "shmoney");
      expect(user.username).toBe("Yeat");
      expect(user.loggedIn).toBe(true);
    });
  })

  describe('logout User', () => {
    beforeEach(() => {
      app.registerUser("Yeat", "shmoney", 25);
    });
    test('check if user can be logged out', () => {
      app.loginUser('Yeat', "shmoney")
      app.logoutUser("Yeat")
      expect(app.registeredUsers["Yeat"].loggedIn).toEqual(false)
    })
  })

  describe('createScooter', () => {
    test('should create a new scooter in a given station', () => {
      const station = 'Yeat Station';
      app.stations[station] = [];

      const scooter = app.createScooter(station);

      expect(scooter).toBeInstanceOf(Scooter);
      expect(app.stations[station].length).toBe(1);
      expect(app.stations[station][0]).toBe(scooter);
    })
  })

  describe("dockScooter", () => {
    test("docks scooter to station", () => {
      const scooter = new Scooter("Los Santos Station");
      app.dockScooter(scooter, "Los Santos Station");
      expect(app.stations["Los Santos Station"]).toContain(scooter);
    })
  })

  describe("rentScooter", () => {
    beforeEach(() => {
      app.registerUser("Yeat", "shmoney", 25);
    });
    test('rents scooter', () => {
      let scooter = new Scooter()
      app.dockScooter(scooter, 'Los Santos Station')
      app.rentScooter(scooter, 'Yeat')
      console.log(scooter.user)
      expect(app.registeredUsers["Yeat"].username).toBe(scooter.user)
      // additional expectation statements could be added here to verify
      // the scooter.station value and if it is null,
      // as well as the contents of this.stations['los santos station']
    })
  })
})

  