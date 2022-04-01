class AppError extends Error {
  constructor(status, message) {
    super();
    this.statusCode = status;
    this.message = message;
  }
}

class ValidationError extends Error {
  constructor(email, password) {
    super();
    this.email = email;
    this.password = password;
  }
}

module.exports = { AppError, ValidationError };
