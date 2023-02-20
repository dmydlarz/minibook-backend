import { Injectable, NestInterceptor, ExecutionContext, CallHandler, NotFoundException } from "@nestjs/common";
import { Observable, catchError } from "rxjs";

export class EntityNotFoundError extends Error {}

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle()
            .pipe(catchError(error => {
                if (error instanceof EntityNotFoundError) {
                    throw new NotFoundException(error.message);
                } else {
                    throw error;
                }
            }));
    }
}