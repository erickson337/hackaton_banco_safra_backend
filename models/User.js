class User {
  constructor(userId, name, email, username, password) {
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.password = password;
    this.username = username;
  }

  toDTO() {
    return {
      userId: this.userId,
      name: this.name,
      email: this.email,
      username: this.username
    }
  }
}

module.exports = {
  User
}