import { BadRequestException } from '@nestjs/common';

export function handleError<T extends new (...args: any[]) => Error>(
  error: unknown,
  ExceptionType: T = BadRequestException as unknown as T,
): never {
  if (error instanceof Error) {
    throw new ExceptionType(error.message);
  }

  throw new ExceptionType('Unknown error occurred');
}