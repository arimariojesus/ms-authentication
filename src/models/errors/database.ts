class DatabaseError extends Error {

  constructor(
    public message: string,
    public error?: Error | unknown,
  ) {
    super(message);
  }

}

export default DatabaseError;
