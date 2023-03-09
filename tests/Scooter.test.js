const Scooter = require('../src/Scooter')
const User = require('../src/User')

// these tests are really clean!
//typeof scooter === object
describe('scooter object', () => {
  test('Initializes properties correctly', () => {
    const scooter1 = new Scooter('Hueys Station')
    const scooter2 = new Scooter('Benji Station')
    expect(scooter1.station).toBe('Hueys Station')
    expect(scooter1.user).toBe(null)
    expect(scooter1.serial).toBe(1)
    expect(scooter2.serial).toBe(2)
    expect(scooter1.charge).toBe(100)
    expect(scooter1.isBroken).toBe(false)
  }
)
})

//Method tests
describe('scooter methods', () => {

  // as part of the rent method (and other methods),
  // make sure to not only test the 'happy path' use cases,
  // but also the scenarios where errors are being thrown
  //rent method
  test("Rent a charged and non broken scooter", () => {
    const scooter1 = new Scooter("Station A");
    // the user who is renting a scooter should be a User object 
    // for this test, to represent how the rent method is used
    const myUser = 'Ben Solo';
    scooter1.charge = 100;
    scooter1.isBroken = false;
    
    scooter1.rent(myUser);
    
    expect(scooter1.user).toBe(myUser);
    expect(scooter1.station).toBeNull();
  });

  //dock method
  test("Docking updates station and user", () => {
    const scooter1 = new Scooter("Station A");
    const myUser = 'Ben Solo';
    scooter1.user = myUser;
    
    scooter1.dock("Hueys Station");
    
    expect(scooter1.station).toBe("Hueys Station");
    expect(scooter1.user).toBeNull();
  });

  //requestRepair method
  test("Requests and recieves repair after 5 seconds", ()=> {
    const scooter1 = new Scooter("Empire Station");
    scooter1.isBroken = true;
    scooter1.requestRepair()
    expect(scooter1.isBroken).toBe(false);
  })

  //charge method
  test("charge", async () => {
    const scooter1 = new Scooter("Rebellion Station");
    scooter1.charge = 20;
    scooter1.recharge()
    // await scooter.charge(); // we need to wait for the charge!
    expect(scooter1.charge).toBe(100);
  });

  // consider adding a test to verify the incrementing of the serial

})
