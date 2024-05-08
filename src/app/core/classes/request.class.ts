import { catchError, finalize, Observable, of, Subscription } from 'rxjs';

import { PaginationRequestModel } from '@models/response.model';

import { doOnSubscribe } from '../utils/operators.rxjs';


export class RequestClass<O, R = O> {
  response: R;
  observable$: Observable<O>

  loading = false;
  error = false;
  successful = false;

  pagination?: PaginationRequestModel;


  constructor(request?: Observable<O>) {
    if (request) {
      this.observable$ = request.pipe(
        doOnSubscribe(() => {
          this.loading = true;
          this.error = false;
          this.successful = false;
        }),
        catchError(error => {
          this.error = true;

          return of(error);
        })
      );
    }
  }

  subscribe(): Subscription {
    return this.observable$.pipe(
      finalize(() => {
        this.loading = false;

        this.successful = !this.error;
      }),
    ).subscribe();
  }
}
