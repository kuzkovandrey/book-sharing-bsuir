export class NotFountError extends Error {
  constructor(entity: string) {
    super(`${entity} not found!`);
  }
}

export class UserAlredyExistsError extends Error {
  constructor() {
    super('User alredy exists');
  }
}

export class UserNotFoundError extends Error {
  constructor() {
    super('User alredy exists');
  }
}

export class IncorrectDataError extends Error {
  constructor(entity: string) {
    super(`Incorrect data for ${entity}.`);
  }
}

export class IncorrectUserAuthError extends Error {
  constructor() {
    super('Incorrect login or password');
  }
}

export class HealthServiceError extends Error {
  constructor() {
    super('Service is not working');
  }
}

export class AccessDeniedError extends Error {
  constructor() {
    super('Access denied');
  }
}
