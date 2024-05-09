import { forkJoin, map, mergeMap, Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CommitModel, CommitQueryParamModel, CommitSearchResponseType,
} from '@models/commits.model';
import { PaginationParamRequestModel, ParamRequestModel } from '@models/response.model';

import { GithubEndpoints, prepareGithubEndpoint } from '../utils/endpoints.util';


@Injectable()
export class CommitsService {

  readonly maxVisibleCommits = 6;

  query: string;
  firstCommitYear: string;
  totalCommits: number;


  constructor(private readonly httpClient: HttpClient) { }

  getCommits(query: CommitQueryParamModel, pagination?: PaginationParamRequestModel): Observable<CommitModel[]> {
    const isoDate = new Date(`${query.year}-${query.month}-01`).toISOString();
    this.query = `author:${query.author} committer-date:>=${isoDate} sort:committer-date-desc`;

    const params: ParamRequestModel = {
      q: this.query,
    };

    return this.httpClient.get<CommitSearchResponseType>(prepareGithubEndpoint(GithubEndpoints.Commits), { params: { ...params } }).pipe(
      mergeMap(response => {
        const response$ = of(response);

        return !this.firstCommitYear
          ? forkJoin([response$, this.getFirstCommit(query.author)])
          : forkJoin([response$]);
      }),
      map(([response, firstCommitYear]) => {
        if(firstCommitYear) {
          this.firstCommitYear = firstCommitYear;
        }

        this.totalCommits = response.total_count;

        return response.items.map<CommitModel>(commit => ({
          authorUsername: commit.author.login,
          link: commit.html_url,
          message: commit.commit.message,
          repository: {
            link: commit.repository.html_url,
            name: commit.repository.name,
            owner: {
              link: commit.repository.owner.html_url,
              username: commit.repository.owner.login,
            }
          },
          totalCommits: response.total_count,
        }));
      })
    );
  }

  getFirstCommit(username: string): Observable<string> {
    const param = { q: `author:${username} sort:committer-date-asc` };

    return this.httpClient.get<CommitSearchResponseType>(prepareGithubEndpoint(GithubEndpoints.Commits), { params: { ...param } }).pipe(
      map(response => {
        return new Date(response.items[0].commit.author.date).getFullYear().toString();
      })
    );
  }
}
