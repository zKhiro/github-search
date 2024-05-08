import { defer, map, Observable } from 'rxjs';

import { HttpResponse } from '@angular/common/http';
import { PaginationRequestType } from '@models/response.model';


export function doOnSubscribe<T>(onSubscribe: () => void): (source: Observable<T>) =>  Observable<T> {
  return function inner(source: Observable<T>): Observable<T> {
      return defer(() => {
        onSubscribe();
        return source;
      });
  };
}

export function pagination<T>(callback: (pagination: PaginationRequestType) => void): (source: Observable<HttpResponse<T>>) => Observable<T> {
  return map(response => {
    const linkHeader = response.headers?.get('Link');
    let pagination: Partial<PaginationRequestType>;

    if(linkHeader) {
      linkHeader.split(',').forEach(link => {
        const rel = link.split('rel="')[1].replace('"', '');
        link = link.match(/(?<=\<)(.*?)(?=\>)/g,)![0]

        pagination = {
          ...pagination,
          [rel]: link,
        };
      });
    }

    callback(pagination as PaginationRequestType);

    return response.body!;
  })
}