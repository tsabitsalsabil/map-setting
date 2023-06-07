import ClientError from './ClientError';

class InvariantError extends ClientError {
  constructor(message) {
    super(message, 400);
  }
}

export default InvariantError;
