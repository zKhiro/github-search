import { forkJoin, from, map, mergeMap, Observable, of, tap, toArray } from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObjectModel } from '@models/generic.model';
import { RepositoryContentModel, RepositoryResponseModel } from '@models/repository.model';
import { HttpResponse$ } from '@models/response.model';
import {
  TechModel, UserDetailModel, UserResponseModel, UserResultCardModel, UserSearchResponseType,
} from '@models/user.model';

import { GithubEndpoints, PER_PAGE_DEFAULT, prepareGithubEndpoint } from '../utils/endpoints.util';


@Injectable({
  providedIn: 'root',
})
export class UserService {

  readonly maxVisibleRepositories = 3;

  userRepositoriesCache: ObjectModel<RepositoryResponseModel[]> = {};


  constructor(private readonly httpClient: HttpClient) { }

  searchUser(query: string, pagination?: boolean): HttpResponse$<UserSearchResponseType> {
    let params = new HttpParams();

    if(!pagination) {
      params = params.append('q', query);
      params = params.append('per_page', PER_PAGE_DEFAULT);
    }

    return this.httpClient.get<UserSearchResponseType>(
      !pagination ? prepareGithubEndpoint(GithubEndpoints.UserSearch) : query,
      {
        params,
        observe: 'response',
      }
    );
  }

  searchUserRepositories(userLogin: string): Observable<RepositoryResponseModel[]> {
    if(this.userRepositoriesCache[userLogin]) {
      return of(this.userRepositoriesCache[userLogin]);
    }

    const endpoint = prepareGithubEndpoint(GithubEndpoints.UserRepositories, {
      user: userLogin,
    });

    return this.httpClient.get<RepositoryResponseModel[]>(endpoint).pipe(
      tap(response => {
        this.userRepositoriesCache[userLogin] = response;
      }),
    );
  }

  getUserTechs(userLogin: string): Observable<string[]> {
    return this.searchUserRepositories(userLogin).pipe(
      map(response => {
        return response
          .filter(repository => repository.language)
          .map(repository => repository.language)
      }),
    );
  }

  getUserDetails(userLogin: string): Observable<UserDetailModel> {
    const endpoint = prepareGithubEndpoint(GithubEndpoints.User, {
      user: userLogin,
    });

    return this.httpClient.get<UserResponseModel>(endpoint).pipe(
      map(response => {
        return {
          bio: response.bio,
          link: response.html_url,
          name: response.name,
          followers: response.followers,
          following: response.following,
        }
      }),
    );
  }

  mapUserSearch(observable$: Observable<UserSearchResponseType>): Observable<UserResultCardModel[]> {
    return observable$.pipe(
      mergeMap(response => from(response.items)),
      mergeMap(user => {
        return forkJoin([of(user), this.getUserTechs(user.login)]);
      }),
      map(([user, languages]) => {
        return {
          profilePicture: user.avatar_url,
          techs: this.mapAndOrderTechs(languages),
          username: user.login,
        };
      }),
      toArray(),
    );
  }

  mapUserRepositories(username: string): RepositoryContentModel[] {;
    return this.userRepositoriesCache[username].map(repository => ({
      description: repository.description,
      link: repository.html_url,
      name: repository.name,
      ownerLogin: username,
      tech: repository.language,
    }));
  }

  private mapAndOrderTechs(languages: string[]): TechModel[] {
    const techs = new Map<string, number>();

    languages.forEach(language => {
      techs.set(language, techs.get(language)! + 1 || 1);
    });

    techs.forEach((v, k) => {
      techs.set(k, v / languages.length);
    });

    return Array.from(techs, (v, k) => ({ name: v[0], percentage: v[1] }))
            .sort((a, b) => b.percentage - a.percentage);
  }
}
