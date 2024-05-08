import { HttpResponse$ } from '@models/response.model';

import { pagination } from '../utils/operators.rxjs';
import { RequestClass } from './request.class';


export class RequestPaginationClass<I, O, R = O> extends RequestClass<I | O, R> {

  constructor(request?: HttpResponse$<I>) {
    if (request) {
      super(request.pipe(
        pagination(pagination => this.pagination = pagination),
      ));
    }
  }
}
