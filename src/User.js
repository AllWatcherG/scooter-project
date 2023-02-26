class User {
  // User code here
  constructor(username, password, age){
    this.username = username;
    this.password = password;
    this.age = age;
    this.loggedIn = false;
  }

  login(password){
    if(this.password === password){
      this.loggedIn = true;
      console.log('user logged in')
    }
    else{
      throw new Error("Password Incorrect")
    }
  }

  logout(){
    this.loggedIn = false;
    console.log("user loged out")
  }
}

module.exports = User
