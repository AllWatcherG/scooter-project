const Scooter = require('../src/Scooter')
const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')

// ScooterApp tests here

  
describe('ScooterApp', () => {
    let app;
  
    beforeEach(() => {
      app = new ScooterApp();
    });
  
    describe('registerUser', () => {
      it('should register a new user', () => {
        const user = app.registerUser('JohnDoe', '12345', 25);
        expect(user.username).toBe('JohnDoe');
        expect(user.age).toBe(25);
        expect(user.password).toBe('12345');
        expect(app.registeredUsers['JohnDoe']).toBe(user.username);
      });
  
      it('should throw an error if user is already registered', () => {
        app.registerUser('JohnDoe', '12345', 25);
        expect(() => {
          app.registerUser('JohnDoe', '67890', 30);
        }).toThrow('already registered');
      });
  
      it('should throw an error if user is too young', () => {
        expect(() => {
          app.registerUser('JohnDoe', '12345', 17);
        }).toThrow('too young to register');
      });
    })
    describe('loginUser', () => {
        it('should log in an existing user', () => {
          app.registerUser('JohnDoe', '12345', 25);
          expect(() => {
            app.loginUser('JohnDoe', '12345');
          }).not.toThrow();
          expect(app.loggedInUser).toBe(app.registeredUsers['JohnDoe']);
        });
    });
})

// register user

// log in

// log out

// rent scooter

// dock scooter
