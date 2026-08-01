export class RateLimitError extends Error {
  public readonly remaining?: number;
  public readonly reset?: number;

  constructor(
    message = "Too many requests.",
    remaining?: number,
    reset?: number
  ) {
    super(message);
    this.name = "RateLimitError";
    this.remaining = remaining;
    this.reset = reset;
  }
}
