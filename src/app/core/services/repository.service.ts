import { map, Observable } from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RepositoryContentModel, RepositoryResponseType } from '@models/repository.model';
import { HttpResponse$ } from '@models/response.model';

import { GithubEndpoints, PER_PAGE_DEFAULT, prepareGithubEndpoint } from '../utils/endpoints.util';


@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(private readonly httpClient: HttpClient) { }

  searchRepository(query: string, pagination?: boolean): HttpResponse$<RepositoryResponseType> {
    let params: HttpParams = new HttpParams();

    if (!pagination) {
      params = params.append('q', query);
      params = params.append('per_page', PER_PAGE_DEFAULT);
    }

    return this.httpClient.get<RepositoryResponseType>(
      !pagination ? prepareGithubEndpoint(GithubEndpoints.RepositorySearch) : query,
      {
        params,
        observe: 'response',
      }
    );
  }

  mapSearchRepository(observable$: Observable<RepositoryResponseType>): Observable<RepositoryContentModel[]> {
    return observable$.pipe(
      map(response => {
        return response.items.map<RepositoryContentModel>(repository => ({
          description: repository.description,
          link: repository.html_url,
          name: repository.name,
          ownerLogin: repository.owner.login,
          tech: repository.language,
        }));
      }),
    );
  }
}
