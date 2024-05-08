import { Observable } from 'rxjs';

import { HttpResponse } from '@angular/common/http';


export type HttpResponse$<T>      = Observable<HttpResponse<T>>;
export type PaginationRequestType = PaginationRequestModel | undefined;

export interface SearchResponseModel<T> {
  total_count: number;
  incomplete_results: boolean;
  items: T[];
}

export interface ParamRequestModel extends Partial<PaginationParamRequestModel> {
  q: string;
}

export interface PaginationParamRequestModel {
  page: string;
  per_page: string;
  sort: string;
  order?: string;
}

export interface PaginationRequestModel {
  next: string;
  last: string;
  prev?: string;
  first?: string;
}
