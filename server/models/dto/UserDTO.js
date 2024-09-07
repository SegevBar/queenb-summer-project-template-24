class UserDTO {
  constructor(user) {
    this.id = user._id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.username = user.username;
    this.email = user.email;
    this.saved = user.saved || [];
    this.created = user.created || [];
  }

  static fromUser(user) {
    return new UserDTO(user);
  }

  static fromUsers(users) {
    return users.map(user => UserDTO.fromUser(user));
  }
}

module.exports = UserDTO;
