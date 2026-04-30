import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';

import { BadRequestError } from '@/application/shared/errors/bad-request.error';
import { NotFoundError } from '@/application/shared/errors/not-found.error';
import { UnauthorizedError } from '@/application/shared/errors/unauthorized.error';

@Catch(NotFoundError, UnauthorizedError, BadRequestError)
export class ApplicationErrorFilter implements ExceptionFilter {
  catch(exception: NotFoundError | UnauthorizedError | BadRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    if (exception instanceof UnauthorizedError) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: exception.message,
        error: exception.name,
      });
      return;
    }

    if (exception instanceof BadRequestError) {
      res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: exception.message,
        error: exception.name,
      });
      return;
    }

    res.status(HttpStatus.NOT_FOUND).json({
      statusCode: HttpStatus.NOT_FOUND,
      message: exception.message,
      error: exception.name,
    });
  }
}

