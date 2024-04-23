class NotFoundError extends Error {
  constructor(message = 'Not Found') {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

class NotPermittedError extends Error {
  constructor(message = 'Not Permitted') {
    super(message);
    this.name = 'NotPermittedError';
    this.statusCode = 403;
  }
}

class NotAuthenticatedError extends Error {
  constructor(message = 'Not Authenticated') {
    super(message);
    this.name = 'NotAuthenticatedError';
    this.statusCode = 401;
  }
}

class ValidationError extends Error {
  constructor(message = 'Validation Error') {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}
class LoginError extends Error {
  constructor(message = 'Login Error') {
    super(message);
    this.name = 'LoginError';
    this.statusCode = 400;
  }
}
class TokenError extends Error {
  constructor(message = 'Token Error') {
    super(message);
    this.name = 'TokenError';
    this.statusCode = 401;
  }

}
module.exports = {
  NotFoundError,
  NotPermittedError,
  NotAuthenticatedError,
  ValidationError,
  LoginError,
  TokenError
}