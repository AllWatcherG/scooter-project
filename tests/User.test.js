const User = require('../src/User')

// make sure that your indentation sizes in this file are the same 
// as the class files
describe('User object', () => {
    
    test('Initializes properties correctly', () => {
    // test username
    // test password
    // test age
    
      const user1 = new User('kingTimmy', 'TimmyRulez', 20)
      const user2 = new User('LeoBands', 'M0money21', 21)
      expect(user1.username).toBe('kingTimmy')
      expect(user1.password).toBe('TimmyRulez')
      expect(user1.age).toBe(20)
      expect(user2.age).toBe(21)
    }
  )
  })

describe('User mehtods', () => {
    // test login
    test('Logs in when password is correct', () =>{
        const user1 = new User('kingTimmy', 'TimmyRulez', 20)
        user1.login('TimmyRulez')
        expect(user1.loggedIn).toBe(true)
    })

    test('Throws error if passwrod is incorect', () =>{
        const user1 = new User('kingTimmy', 'TimmyRulez', 20)
        expect(() => user1.login('TimmyRulez99')).toThrow("Password Incorrect");
        expect(user1.loggedIn).toBe(false)
    })
    // test logout

    test('Logs out', ()=>{
        const user1 = new User('kingTimmy', 'TimmyRulez', 20)
        user1.login()
        user1.logout()
        expect(user1.loggedIn).toBe(false)
    })
})



